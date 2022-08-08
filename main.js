const cards = document.querySelectorAll(".memory-card");

let hasFlipCard = false;
let boardLocked = false;
let firstCard, secondCard;

const flipCard = (e) => {
  if (boardLocked) return;
  const target = e.target.parentElement;
  if (target === firstCard) return;
  target.classList.add("flip");

  if (!hasFlipCard) {
    hasFlipCard = true;
    firstCard = target;
  } else {
    hasFlipCard = false;
    secondCard = target;
    checkForMatch();
  }
};

cards.forEach((card) => {
  card.addEventListener("click", flipCard);
  const rendomIndex = Math.floor(Math.random() * cards.length);
  card.style.order = rendomIndex;
});

const checkForMatch = () => {
  const isTrue = firstCard.dataset.action === secondCard.dataset.action;
  isTrue ? disableCards() : unFlipCards();
};

const disableCards = () => {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
};

const unFlipCards = () => {
  boardLocked = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBord();
  }, 500);
};

const resetBord = () => {
  hasFlipCard = boardLocked = false;
  firstCard = secondCard = null;
};

