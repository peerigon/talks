//remember LED state
let on = false;

//

function toggle() {
    digitalWrite(LED1, on = !on);
}

const blinky = setInterval(toggle, 500);

clearInterval(blinky);

setWatch(e => toggle(), BTN, { repeat: true });

setWatch(e => {
  if(e.state) {
    toggle();
  }
}, BTN, { repeat: true });

