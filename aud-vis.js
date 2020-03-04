const playButton = document.getElementById('button-play');

const canvas = document.getElementById('canvas');
// canvas.width = document.getElementById('container').style.width;
const ctx = canvas.getContext('2d');

// let isPlaying = false;

let analyser;
let frequencyArray;

const cornerRadius = Math.floor(Math.hypot(canvas.width, canvas.height));
console.log(cornerRadius);

// audio.addEventListener('ended', () => {
//   this.currentTime = 0;
//   this.play();
// }, false);



// audio.src = 'public/bird-whistling-a.wav';

function startAudio() {
  const audio = new Audio();
  audio.src = 'public/bensound-dubstep.mp3';
  // audio.src = '/public/bird-whistling-a.wav';
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  analyser = audioContext.createAnalyser();

  const source = audioContext.createMediaElementSource(audio);
  source.connect(analyser);
  analyser.connect(audioContext.destination);
  frequencyArray = new Uint8Array(analyser.frequencyBinCount);

  audio.play();
  render();
};

playButton.addEventListener('click', (e) => {
  startAudio();
  // if (!isPlaying) {
  //   startAudio();
  // } else {
  //   audio.pause();
  // }
  // isPlaying = !isPlaying;
});

function render() {
  // ctx.clearRect(0, 0, 800, 800);
  ctx.beginPath();
  ctx.rect(0, 0, 800, 800);
  ctx.fillStyle = "black";
  ctx.fill();
  analyser.getByteFrequencyData(frequencyArray);

  // ctx.beginPath();
  // const freq = Math.floor(cornerRadius);
  // ctx.arc(400, 400, 100, 1.5 * Math.PI, 0);
  // // ctx.arc(100, 75, 50, 0, 2 * Math.PI);

  // ctx.stroke();

  frequencyArray.forEach((f, i) => {
    ctx.beginPath();
    ctx.strokeStyle = `hsla(${Math.floor((i / 1024) * 360)}, 100%, 50%, 0.5)`;
    // ctx.strokeStyle = "white";

    // Lines in the center
    // const xPos = Math.floor((i / 1024) * 800);
    // const amp = Math.floor((f / 255) * 400);
    // ctx.lineWidth = 7;
    // ctx.moveTo(xPos, 400 + amp);
    // ctx.lineTo(xPos, 400 - amp);

    // Arc from corner
    ctx.lineWidth = 7;
    ctx.arc(0, canvas.height, (f / 255) * 1100, 0, 1.5 * Math.PI, true);


    ctx.stroke();

  });

  requestAnimationFrame(render);
  // if (isPlaying) {
  //   requestAnimationFrame(render);
  // }
};