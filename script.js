
const cards = document.querySelectorAll('.memory-card'); //выбираем элементы из html кода

let hasFlippedCard = false, //отвечают за состояние переворота
    lockBoard = false, //отвечает за блокировку поля после клика по второй карте. Когда нажимаем на вторую карточку, lockBoard = true, а условие if (lockBoard) return; 
    win = 0,
    time = 0,
    click = false,
    postElt = document.querySelector("#post"),
    finalElt = document.querySelector("#final"),
    againElt = document.querySelector("#again"),
    timeElt = document.querySelector("#time"),
    firstCard, secondCard;

cards.forEach(card => card.addEventListener('click', flipCard)); // при каждом нажатии на карту будет вызываться функция flipCard()

function firstClick() {
    timer = setInterval(function() {
      timeElt.innerHTML = time;
      time++;
      click = true;
  }, 1000);
}

function flipCard() {  
  
  if (click == false) {
    firstClick();
  }
  //вызываем переворот карточки: получаем доступ к списку классов элемента и активируем класс flip
  if (lockBoard == true) return; //предотвратит переворот других карточек до того, как эти две будут спрятаны или совпадут
  if (this === firstCard) return;  // проверка равняется ли нажатая карточка переменной firstCard, и вёрнемся из функции, если это так
  
  this.classList.add('flip'); //добавляем класс для карточки после нажатия, this отвечает за нажатую карточку

  if (hasFlippedCard == false) { //если ни одна карточка не перевёрнута, hasFlippedCard = true,  а нажатой карточке присваивается flippedCard
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() { //проверяем совпадают ли карточки
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework; //задаем переменную которая проверяет совпадают ли изображения с помощью свойства dataset
  isMatch ? disableCards() : unflipCards(); //тернарный оператор: сократили написание цикла if
}

function disableCards() { //вызывается в случае совпадения
  win += 2;
  console.log (win);
  firstCard.removeEventListener('click', flipCard); //открепляются обработчики событий от обеих карточек
  secondCard.removeEventListener('click', flipCard);

  if (win === 12) {
    click = false;
    finalElt.innerHTML = "Вы открыли " + win + " карточек за " + time + " секунд";
    postElt.classList.remove("hidden");
    timeElt.classList.add("hidden");
    
    }

  resetBoard(); // обнуляем переменные после каждого раунда
}


function unflipCards() { //если карточки не совпали
  lockBoard = true;

  setTimeout(() => { // переворачиваем обе карточки рубашками вверх через 1000 мс
    firstCard.classList.remove('flip'); // удаляем из класса flip
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1000);
}



function resetBoard() { // функция обнуления переменных 
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

againElt.addEventListener('click', resetGame);

function resetGame() {
click = false;
postElt.classList.add("hidden");
window.location.reload();
}

(function shuffle() { // функция IIFE перемешивание карт в рандомном порядке , вызвается сразу после того, как она была определена
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12); // генерируем случайное число от 0 до 12 и присваиваем его свойству order:
    card.style.order = randomPos; //у контейнера .memory-game eсть свойство display: flex, его элементы упорядочиваются сначала по номеру группы, каждая группа определяется свойством order, которое содержит положительное или отрицательное целое число. По умолчанию свойство order каждого flex-элемента имеет значение 0. Если групп больше одной, элементы сначала упорядочиваются по возрастанию порядка группы.
  });
})();

