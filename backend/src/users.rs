use candid::Principal;
use ic_cdk_macros::*;
use std::cell::RefCell;
use std::collections::HashSet;

use ic_cdk::api::msg_caller;  // Добавлен импорт

thread_local! {
    static ADMINS: RefCell<HashSet<Principal>> = RefCell::new(HashSet::new());
}

#[update]
pub fn add_admin(principal: Principal) {
    let caller = msg_caller();
    if !is_admin(caller) {
        ic_cdk::trap("Not authorized");
    }
    ADMINS.with(|admins| admins.borrow_mut().insert(principal));
}

pub fn is_admin(principal: Principal) -> bool {
    ADMINS.with(|admins| admins.borrow().contains(&principal))
}

#[query]
pub fn get_user_principal() -> Principal {
    msg_caller()
}