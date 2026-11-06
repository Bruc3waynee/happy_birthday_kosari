const leavesRoot = document.getElementById('leaves');
const leafSymbols = ['🍂', '🍁', '✦'];
for (let i = 0; leavesRoot && i < 19; i++) {
  const leaf = document.createElement('span');
  leaf.className = 'leaf';
  leaf.textContent = leafSymbols[i % leafSymbols.length];
  leaf.style.left = `${Math.random() * 100}%`;
  leaf.style.animationDuration = `${11 + Math.random() * 15}s`;
  leaf.style.animationDelay = `${-Math.random() * 22}s`;
  leaf.style.fontSize = `${11 + Math.random() * 13}px`;
  leaf.style.setProperty('--drift', `${-70 + Math.random() * 140}px`);
  leavesRoot.appendChild(leaf);
}

const openLetter = document.getElementById('openLetter');
const letter = document.getElementById('letter');
openLetter.addEventListener('click', () => {
  const isOpen = letter.classList.toggle('is-open');
  openLetter.classList.toggle('is-open', isOpen);
  openLetter.setAttribute('aria-expanded', String(isOpen));
  letter.setAttribute('aria-hidden', String(!isOpen));
  openLetter.querySelector('.open-hint').textContent = isOpen ? 'نامه‌ات باز شد ❤️' : 'برای باز کردن نامه لمس کن';
  if (isOpen) setTimeout(() => letter.scrollIntoView({ behavior: 'smooth', block: 'center' }), 180);
});

// A tiny original ambient melody made with Web Audio; it starts only after a tap.
let audioContext = null;
let musicTimer = null;
let musicOn = false;
let noteIndex = 0;
const melody = [261.63, 329.63, 392.00, 329.63, 293.66, 349.23, 440.00, 349.23];
const soundToggle = document.getElementById('soundToggle');
const soundLabel = document.getElementById('soundLabel');
function playNote() {
  if (!audioContext || !musicOn) return;
  const now = audioContext.currentTime;
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  osc.type = 'sine';
  osc.frequency.value = melody[noteIndex % melody.length];
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.035, now + 0.08);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.05);
  osc.connect(gain); gain.connect(audioContext.destination);
  osc.start(now); osc.stop(now + 1.1);
  noteIndex++;
}
soundToggle.addEventListener('click', async () => {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) {
    soundLabel.textContent = 'موسیقی پشتیبانی نمی‌شود';
    return;
  }
  if (!audioContext) audioContext = new AudioContextClass();
  if (audioContext.state === 'suspended') await audioContext.resume();
  musicOn = !musicOn;
  if (musicOn) {
    playNote();
    musicTimer = setInterval(playNote, 850);
    soundLabel.textContent = 'خاموش کردن';
    soundToggle.classList.add('playing');
  } else {
    clearInterval(musicTimer);
    soundLabel.textContent = 'موسیقی';
    soundToggle.classList.remove('playing');
  }
});

document.getElementById('wishButton').addEventListener('click', () => {
  const response = document.getElementById('wishResponse');
  response.textContent = 'پس از ته دل امیدوارم قشنگ‌ترین اتفاق‌ها منتظرت باشن. ✨';
  for (let i = 0; i < 22; i++) {
    const spark = document.createElement('span');
    spark.textContent = ['✦', '✨', '♥'][i % 3];
    spark.style.cssText = `position:fixed;z-index:20;left:${10 + Math.random() * 80}%;top:${25 + Math.random() * 55}%;pointer-events:none;color:#e8b77f;font-size:${12 + Math.random() * 16}px;animation:sparkle 1.8s ease-out forwards`;
    document.body.appendChild(spark);
    setTimeout(() => spark.remove(), 1900);
  }
});
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = '@keyframes sparkle{0%{opacity:0;transform:translateY(12px) scale(.5)}25%{opacity:1}100%{opacity:0;transform:translateY(-55px) scale(1.4)}}';
document.head.appendChild(sparkleStyle);
