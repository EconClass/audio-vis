const playButton = document.getElementById('button-play');

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let analyser;
let frequencyArray;

const centerX = 400;
const centerY = 400;
const radius = 100 / 5;

function startAudio() {
  const audio = new Audio();
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();

  audio.src = 'public/bensound-dubstep.mp3';

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
});

function render() {
  ctx.clearRect(0, 0, 800, 800);
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
  ctx.strokeStyle = 'red';
  ctx.stroke();


  const bars = 255;
  const step = Math.PI * 2 / bars;

  analyser.getByteFrequencyData(frequencyArray);
  // console.log(frequencyArray);
  console.log(frequencyArray[0]);

  frequencyArray.forEach((f, i) => {
    const barLength = frequencyArray[i] / 256 * 300;
    const x1 = (Math.cos(step * i) * radius) + centerX;
    const y1 = (Math.sin(step * i) * radius) + centerY;
    const x2 = (Math.cos(step * i) * (radius + barLength)) + centerX;
    const y2 = (Math.sin(step * i) * (radius + barLength)) + centerY;

    const hue = (f / 255) * 360;

    ctx.strokeStyle = "red";
    // ctx.width = 100;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
  });

  ctx.stroke();

  requestAnimationFrame(render);
};
;
