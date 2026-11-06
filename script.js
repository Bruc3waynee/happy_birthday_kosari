/* ==========================================
   AUTUMN LEAVES ANIMATION
========================================== */

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

  leaf.style.setProperty(
    '--drift',
    `${-70 + Math.random() * 140}px`
  );

  leavesRoot.appendChild(leaf);
}


/* ==========================================
   OPEN AND CLOSE BIRTHDAY LETTER
========================================== */

const openLetter = document.getElementById('openLetter');
const letter = document.getElementById('letter');

openLetter.addEventListener('click', () => {

  const isOpen = letter.classList.toggle('is-open');

  openLetter.classList.toggle('is-open', isOpen);

  openLetter.setAttribute(
    'aria-expanded',
    String(isOpen)
  );

  letter.setAttribute(
    'aria-hidden',
    String(!isOpen)
  );

  openLetter.querySelector('.open-hint').textContent =
    isOpen
      ? 'نامه‌ات باز شد ❤️'
      : 'برای باز کردن نامه لمس کن';

  if (isOpen) {
    setTimeout(() => {
      letter.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }, 180);
  }
});


/* ==========================================
   CUSTOM BIRTHDAY MUSIC (MP3)
========================================== */

// Audio file is located in the repository root:
// ./autumn-song.mp3

const birthdayAudio = document.getElementById('birthdayAudio');

const soundToggle = document.getElementById('soundToggle');
const soundLabel = document.getElementById('soundLabel');

let musicOn = false;

// Volume: 75%
birthdayAudio.volume = 0.75;


// Play / Pause button

soundToggle.addEventListener('click', async () => {

  if (!musicOn) {

    try {

      await birthdayAudio.play();

      musicOn = true;

      soundLabel.textContent = 'خاموش کردن';

      soundToggle.classList.add('playing');

    } catch (error) {

      console.error('Music playback failed:', error);

      soundLabel.textContent = 'دوباره تلاش کن';

    }

  } else {

    birthdayAudio.pause();

    musicOn = false;

    soundLabel.textContent = 'موسیقی';

    soundToggle.classList.remove('playing');

  }

});


// Synchronize button when audio ends

birthdayAudio.addEventListener('ended', () => {

  musicOn = false;

  soundLabel.textContent = 'موسیقی';

  soundToggle.classList.remove('playing');

});


/* ==========================================
   BIRTHDAY WISH BUTTON & SPARKLES
========================================== */

document.getElementById('wishButton').addEventListener('click', () => {

  const response = document.getElementById('wishResponse');

  response.textContent =
    'پس از ته دل امیدوارم قشنگ‌ترین اتفاق‌ها منتظرت باشن. ✨';

  for (let i = 0; i < 22; i++) {

    const spark = document.createElement('span');

    spark.textContent = ['✦', '✨', '♥️'][i % 3];

    spark.style.cssText = `
      position: fixed;
      z-index: 20;
      left: ${10 + Math.random() * 80}%;
      top: ${25 + Math.random() * 55}%;
      pointer-events: none;
      color: #e8b77f;
      font-size: ${12 + Math.random() * 16}px;
      animation: sparkle 1.8s ease-out forwards;
    `;

    document.body.appendChild(spark);

    setTimeout(() => spark.remove(), 1900);

  }

});


/* ==========================================
   SPARKLE ANIMATION
========================================== */

const sparkleStyle = document.createElement('style');

sparkleStyle.textContent = `
@keyframes sparkle {
  0% {
    opacity: 0;
    transform: translateY(12px) scale(.5);
  }

  25% {
    opacity: 1;
  }

  100% {
    opacity: 0;
    transform: translateY(-55px) scale(1.4);
  }
}
`;

document.head.appendChild(sparkleStyle);
