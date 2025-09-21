use ic_cdk_macros::*;
use ic_stable_structures::{
    memory_manager::{MemoryManager, VirtualMemory},
    DefaultMemoryImpl,
};
use std::cell::RefCell;

pub mod events;
pub mod users;
pub mod tickets;

use candid::Principal;
use crate::events::Event;
use crate::tickets::Ticket;

type Memory = VirtualMemory<DefaultMemoryImpl>;

thread_local! {
    static MEMORY_MANAGER: RefCell<MemoryManager<DefaultMemoryImpl>> =
        RefCell::new(MemoryManager::init(DefaultMemoryImpl::default()));
}

#[init]
fn init() {
    let test_events = vec![
        events::Event {
            id: "1".to_string(),
            title: "N Crypto Awards 2025".to_string(),
            date: "2025-10-12".to_string(),
            time: "12:00".to_string(),
            city: "Kyiv".to_string(),
            category: "Comedy".to_string(),
            price_range: "1800-15000 UAH".to_string(),
            image: "https://d2q8nf5aywi2aj.cloudfront.net/uploads/resize/shows/logo/630x891_1751027556.webp".to_string(),
            url: "/#/event/1".to_string(),
            venue: "Parkova road, 16a, Kiev, 03150".to_string(),
            description: "N Crypto Awards 2025 is the main final event of the year in the world of cryptocurrency and Web3 in Ukraine!".to_string(),
        },
        events::Event {
            id: "2".to_string(),
            title: "E-Commerce Conference 2025".to_string(),
            date: "2025-10-13".to_string(),
            time: "12:00".to_string(),
            city: "Kyiv".to_string(),
            category: "Theater".to_string(),
            price_range: "1500-5500 UAH".to_string(),
            image: "https://d2q8nf5aywi2aj.cloudfront.net/uploads/resize/shows/logo/630x891_1755874606.webp".to_string(),
            url: "/#/event/2".to_string(),
            venue: "Parkova road, 16a, Kiev, 03150".to_string(),
            description: "E-commerce Conference 2025 is the largest professional event in Ukraine dedicated to all areas of e-commerce.".to_string(),
        },
        events::Event {
            id: "3".to_string(),
            title: "MUSIC BOX FEST".to_string(),
            date: "2025-06-21".to_string(),
            time: "12:00".to_string(),
            city: "Kyiv".to_string(),
            category: "Concert".to_string(),
            price_range: "400 UAH".to_string(),
            image: "https://images.karabas.com/external/018e50bb-71e5-7428-9b44-4f503fcfd169/events/01968fb9-7033-7bda-b177-10c68a8492b0/2565465959_ImageBig638853480874554690_700_1000.webp?v=1".to_string(),
            url: "/#/event/3".to_string(),
            venue: "st. Glushkova, 9".to_string(),
            description: "The largest music festival in the capital will bring together 20 stars of the Ukrainian scene - from legends to new wave.".to_string(),
        },
    ];
    for event in test_events {
        events::create_event(event);
    }
}

#[pre_upgrade]
fn pre_upgrade() {}

#[post_upgrade]
fn post_upgrade() {}

ic_cdk::export_candid!();