// Modules
use chrono::prelude::*;
use std::{thread, time};

pub fn wait(millis: u64) {
    // Variables immutable per default
    let duration = time::Duration::from_millis(millis);

    thread::sleep(duration);
}

// Functions
pub fn is_at_web_and_wine() -> bool {
    let local: DateTime<Local> = Local::now();

    // Pattern Matching
    match (
        local.day(),
        local.month(),
        local.year()
    ) {
        (15, 10, 2019) => true,
        _ => false,
    }
}

// Structs
struct GreeterBot {
    face_emoji: String,
    greeting: String,
}

// Methods
impl GreeterBot {
    // static methods
    pub fn new(face_emoji: &str, greeting: &str) -> Self {
        // implicit return
        GreeterBot {
            face_emoji: face_emoji.to_owned(),
            greeting: greeting.to_owned()
        }
    }

    fn speak(&self, message: &str) {
        println!("{} : {}", self.face_emoji, message);
    }

    pub fn ask_purpose(&self) {
        self.speak("What is my purpose?");
    }

    pub fn cannot_compute(&self) {
        self.speak("Cannot greet those who are not here. Critical failure...oh no...");
    }

    pub fn greet(&self) {
        println!("
         __________________________________________
        /                                          \\
        | {} |
        \\__  ______________________________________/
           \\/
           {}‍
          /||\\
           /\\
        ", self.greeting, self.face_emoji);
    }
}

pub fn make_greeting(addressee: &str) -> String {
    let local: DateTime<Local> = Local::now();
    let time_log = format!(
        "{:02}-{:02}-{:02} {:02}:{:02}:{:02}",
        local.day(),
        local.month(),
        local.year(),
        local.hour(),
        local.minute(),
        local.second()
    );

    // implicit return
    format!("Hello, {}! {}", addressee, time_log)
}

pub fn log_countdown() {
    [3, 2, 1].iter()
        .map(|step| match step {
            3 => "3️⃣",
            2 => "2️⃣",
            1 => "1️⃣",
            _ => ""
        })
        .for_each(|step| {
            println!("{}", step);
            wait(1000);
        });
}

pub fn main() {
    let kauderwelsch = vec!['e', 'n', 'i', 'W', '-', 'd', 'n', 'a', '-', 'b', 'e', 'W'];
    // Iterators
    let adressee = kauderwelsch.iter().rev().collect::<String>();

    // Borrwing and Ownership
    let greeter_bot = GreeterBot::new("🤖", &make_greeting(&adressee));

    greeter_bot.ask_purpose();

    wait(1000);

    println!("👨‍ : You greet!");


    // Normal boring flow control
    if is_at_web_and_wine() {
        wait(1000);

        greeter_bot.speak("Ok, here it comes...");

        wait(1000);

        log_countdown();

        greeter_bot.greet();

        wait(1000);

        println!("👨‍ : Good bot!");
    } else {
        wait(1000);

        greeter_bot.cannot_compute();

        wait(1000);

        log_countdown();

        greeter_bot.speak("Bumm 💥 🔥");
    }
}
