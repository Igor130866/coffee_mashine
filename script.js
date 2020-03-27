"use strict"

let balance = document.querySelector('.balance');
let displayText = document.querySelector(".display-text");
let progressBar = document.querySelector(".progress-bar");
let coffeeCup = document.querySelector(".coffee-cup img");

let coffeeStatus = "waiting";

coffeeCup.onclick = takeCoffee;

function buyCoffee(name, cost, elem) {
  if (coffeeStatus != "waiting") {
    return;
  }
  let afterBuyValue = +balance.value - cost;
  if ( (balance.value - cost) < 0 || Number.isNaN(afterBuyValue)) {
    balance.style.border = "2px solid red";
    balance.style.backgroundColor = "pink";
    changeDisplayText("Недостаточно средств");
    return;
  }
  balance.style.border = "none";
  balance.style.backgroundColor = "white";
  balance.value = (+balance.value - cost).toFixed(2);
  
  cookCoffee(name, elem);
}

function cookCoffee(name, elem) {
  coffeeStatus = "cooking";
  changeDisplayText('Ваш ' + name + ' готовится');
  
  let cupImg = elem.querySelector('img');
  let cupSrc = cupImg.getAttribute("src");
  coffeeCup.setAttribute("src", cupSrc);
  
  coffeeCup.style.opacity = '0%';
  coffeeCup.classList.remove("d-none");
  
  let readyPercent = 0;
  let cookingInterval = setInterval(() => {
    readyPercent++
    progressBar.style.width = readyPercent + "%";
    coffeeCup.style.opacity = readyPercent + '%';
    if (readyPercent == 100) {
      coffeeStatus = "ready";
      changeDisplayText('Ваш ' + name + ' готов');
      coffeeCup.style.cursor = 'pointer';
      clearInterval(cookingInterval);
    }
  }, 100);
}

function changeDisplayText(text) {
  displayText.innerHTML = "<span>"+text+"</span>";
}

function takeCoffee() {
  if (coffeeStatus != "ready") {
    return;
  }
  coffeeStatus = "waiting";
  coffeeCup.classList.add("d-none");
  coffeeCup.style.cursor = 'auto';
  progressBar.style.width = "0%";
  changeDisplayText('Выберите кофе');
}
