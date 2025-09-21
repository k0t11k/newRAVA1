use candid::{CandidType, Deserialize};
use ic_cdk_macros::*;
use ic_stable_structures::{
    memory_manager::MemoryId,
    storable::{Bound, Storable},
    BTreeMap,
};
use serde::Serialize;
use std::borrow::Cow;
use std::cell::RefCell;

use ic_cdk::api::msg_caller;

use super::{Memory, MEMORY_MANAGER};

#[derive(CandidType, Serialize, Deserialize, Clone)]
pub struct Event {
    pub id: String,
    pub title: String,
    pub date: String,
    pub time: String,
    pub city: String,
    pub category: String,
    pub price_range: String,
    pub image: String,
    pub url: String,
    pub venue: String,
    pub description: String,
}

impl Storable for Event {
    fn to_bytes(&self) -> Cow<'_, [u8]> {
        Cow::Owned(candid::encode_one(self).unwrap())
    }

    fn from_bytes(bytes: Cow<'_, [u8]>) -> Self {
        candid::decode_one(&bytes).unwrap()
    }

    fn into_bytes(self) -> Vec<u8> {
        self.to_bytes().into_owned()
    }

    const BOUND: Bound = Bound::Unbounded;
}

thread_local! {
    static EVENTS: RefCell<BTreeMap<String, Event, Memory>> = RefCell::new(
        BTreeMap::init(
            MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(1)))
        )
    );
}

#[update]
pub fn create_event(event: Event) {
    let principal = msg_caller();
    if !super::users::is_admin(principal) {
        ic_cdk::trap("Not authorized");
    }
    EVENTS.with(|events| events.borrow_mut().insert(event.id.clone(), event));
}

#[query]
pub fn get_events() -> Vec<Event> {
    EVENTS.with(|events| events.borrow().values().collect())
}

#[query]
pub fn get_event(id: String) -> Option<Event> {
    EVENTS.with(|events| events.borrow().get(&id).map(|e| e.clone()))
}