const dateText = "13 January";

const dateElement = document.querySelector(".date__of__birth span");
const mailButton = document.querySelector("#btn__letter");
const mailBox = document.querySelector(".boxMail");
const closeButton = document.querySelector(".close-letter");
const birthdayMusic = document.getElementById("birthdayMusic");

const birthdayCard = document.querySelector(".birthday-card");
const cardCover = document.querySelector(".cover");
const openCardButton = document.querySelector(".open-card");


/* ================================
   TYPE TEXT
================================ */

function typeText(element, text, speed = 70) {

  if (!element) return;

  element.textContent = "";

  let index = 0;

  const interval = setInterval(() => {

    if (index >= text.length) {
      clearInterval(interval);
      return;
    }

    element.textContent += text[index];
    index++;

  }, speed);

  return interval;
}


/* ================================
   DATE
================================ */

setTimeout(() => {

  typeText(
    dateElement,
    dateText,
    100
  );

}, 4300);


/* ================================
   OPEN POPUP
================================ */

function openMail() {

  if (!mailBox) return;

  birthdayCard?.classList.remove("open");

  mailBox.classList.add("active");

  document.body.style.overflow = "hidden";
}


/* ================================
   OPEN ACTUAL LETTER
================================ */

function openLetter() {

  if (!birthdayCard) return;

  birthdayCard.classList.add("open");

}


/* ================================
   CLOSE POPUP
================================ */

function closeMail() {

  if (!mailBox) return;

  birthdayCard?.classList.remove("open");

  mailBox.classList.remove("active");

  document.body.style.overflow = "";
}


/* ================================
   MAIN BUTTON
================================ */

mailButton?.addEventListener("click", async () => {

    openMail();

    if (!birthdayMusic) {
      console.error("❌ birthdayMusic element not found!");
      return;
    }

    try {
      birthdayMusic.volume = 1;
      birthdayMusic.currentTime = 0;

      await birthdayMusic.play();

      console.log("🎵 Birthday music is playing!");

    } catch (error) {
      console.error("❌ Audio failed to play:", error);
    }

  }
);


/* ================================
   UNLOCK AUDIO FOR iOS
   (plays + instantly pauses on the
   very first tap anywhere, so the
   later real play() call works
   reliably on iOS Safari)
================================ */

let audioUnlocked = false;

function unlockAudio() {
  if (audioUnlocked || !birthdayMusic) return;

  birthdayMusic.play().then(() => {
    birthdayMusic.pause();
    birthdayMusic.currentTime = 0;
    audioUnlocked = true;
  }).catch(() => {});
}

document.addEventListener("touchstart", unlockAudio, { once: true });
document.addEventListener("click", unlockAudio, { once: true });


/* ================================
   OPEN CARD
================================ */

openCardButton?.addEventListener(
  "click",
  (event) => {

    event.stopPropagation();

    openLetter();

  }
);


/* Clicking the cover also opens it */

cardCover?.addEventListener("click", () => {

  openLetter();

});


/* ================================
   CLOSE
================================ */

closeButton?.addEventListener(
  "click",
  closeMail
);


/* ================================
   CLICK OUTSIDE
================================ */

mailBox?.addEventListener(
  "click",
  (event) => {

    if (event.target === mailBox ||
        event.target.classList.contains("letter-backdrop")) {

      closeMail();

    }

  }
);


/* ================================
   ESC
================================ */

document.addEventListener(
  "keydown",
  (event) => {

    if (event.key === "Escape") {
      closeMail();
    }

  }
);