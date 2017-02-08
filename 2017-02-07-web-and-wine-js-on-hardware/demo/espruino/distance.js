const sensor = require("HC-SR04").connect(A6, A5, function(dist) {
  console.log(dist + " cm away");

  dist = parseInt(dist);
  digitalWrite(LED1, 0);
  digitalWrite(LED2, 0);
  
  if(dist <= 25) {
    digitalWrite(LED1, 1);
  }
  
  if(dist <= 10) {
    digitalWrite(LED2, 1);
  }
  
});

setInterval(() => sensor.trigger(), 1000); //send pulse