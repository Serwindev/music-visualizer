let sound, amplitude, fft;
const notes = {C4: 0, E4: 0, G4: 0, A4: 0, C5: 0}
const btn = document.getElementById("startBtn");

btn.addEventListener("click", btnClicked);

function preload() {
  sound = loadSound("./assets/beat.mp3");
}

function setup() {
  createCanvas(400, 400);
  amplitude = new p5.Amplitude();
  fft = new p5.FFT();
}

function draw() {
  let level = amplitude.getLevel();
  fft.analyze();
  if (fft.getEnergy(60,250) >= 200){
    background("#FF7F00");
  }
  else if (fft.getEnergy(250,500) >= 100) {
    background("#FFFF00");
  }
  else if (fft.getEnergy(500,1000)) {
    background("#00FF00");
  }
  else {
    background("cyan");
  }
  
  let dia = map(level, 0, 1, 80, 200);


  circle(200,200,dia);
}

function btnClicked() {
  if (sound.isPlaying()) {
    sound.pause();
    btn.textContent = "Play";
  } else {
    sound.loop();
    amplitude = new p5.Amplitude();
    amplitude.setInput(sound);
    fft.setInput(sound);
    btn.textContent = "Pause";
  }
}