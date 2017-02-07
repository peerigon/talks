let colorIndex = 0;

const colors = {
  midnightblue: [25, 25, 112],
  lawngreen: [124, 252, 0],
  kaki: [240, 230, 140],
  tomato: [255, 99, 71],
  powderblue: [176, 244, 230],
  hotpink: [255, 105, 180]
};

const colorNames = Object.keys(colors);

SPI2.setup({ 
  baud: 1000000,
  mosi: B15, 
  sck: B13 
});

function changeColor(r, g, b) {
  SPI2.send([r, g, b]);
}

function setCSSColor(name) {
  const color = colors[name];
  changeColor(color[0], color[1], color[2]);
}

function nextColor() {
  if(++colorIndex === colorNames.length) {
    colorIndex = 0;
  }
  
  const nextColorName = colorNames[colorIndex] ;
  console.log("next color:", nextColorName);

  setCSSColor(nextColorName);
}

function init() {
  setWatch(function(e) {
    if(e.state){
      nextColor();
    }

    digitalWrite(LED1, e.state);
  }, BTN, { repeat: true });
}

E.on("init", init);

init();

