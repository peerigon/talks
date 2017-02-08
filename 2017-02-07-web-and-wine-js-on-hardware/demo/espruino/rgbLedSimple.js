//css names to rgb
const colors = {
  midnightblue: [25, 25, 112],
  lawngreen: [124, 252, 0],
  kaki: [240, 230, 140],
  tomato: [255, 99, 71],
  powderblue: [176, 244, 230],
  hotpink: [255, 105, 180]
};

//connect to led using SPI
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