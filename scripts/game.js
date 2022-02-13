// round time limit
let TIME_LIMIT = 60;

// quotes, https://honeybeenet.gsfc.nasa.gov/Honeybees/Basics.htm
let quotes1 = [
    "Bees have 5 eyes",
    "Male bees in the hive are called drones",
    "An average beehive can hold around 50,000 bees",
    "Average per capita honey consumption in the US is 1.3 pounds",
    "Bees carry pollen on their hind legs in a pollen basket or corbicula"
]

let quotes2 = [
    "Bees have 5 eyes",
    "Male bees in the hive are called drones",
    "An average beehive can hold around 50,000 bees",
    "Average per capita honey consumption in the US is 1.3 pounds",
    "Bees carry pollen on their hind legs in a pollen basket or corbicula"
]

let quotes3 = [
    "Bees have 5 eyes",
    "Male bees in the hive are called drones",
    "An average beehive can hold around 50,000 bees",
    "Average per capita honey consumption in the US is 1.3 pounds",
    "Bees carry pollen on their hind legs in a pollen basket or corbicula"
]

let quotes4 = [
    "Bees have 5 eyes",
    "Male bees in the hive are called drones",
    "An average beehive can hold around 50,000 bees",
    "Average per capita honey consumption in the US is 1.3 pounds",
    "Bees carry pollen on their hind legs in a pollen basket or corbicula"
]

let quotes5 = [
    "Bees have 5 eyes",
    "Male bees in the hive are called drones",
    "An average beehive can hold around 50,000 bees",
    "Average per capita honey consumption in the US is 1.3 pounds",
    "Bees carry pollen on their hind legs in a pollen basket or corbicula"
]

let quotes6 = [
    "Bees have 5 eyes",
    "Male bees in the hive are called drones",
    "An average beehive can hold around 50,000 bees",
    "Average per capita honey consumption in the US is 1.3 pounds",
    "Bees carry pollen on their hind legs in a pollen basket or corbicula"
]

let numQuotes = 5;

let timerText = $(".cur-time");
let accuracyText = $(".cur-accuracy");
let errorText = $(".cur-errors");
let wpmText = $(".cur-wpm");
let quoteText = $(".quote");
let inputArea = $(".input-area");
let nextlvl = $(".nextlvlbtn");
let levelGroup = $(".level");
let wpmGroup = $(".wpm");
let errorGroup = $(".errors");
let accuracyGroup = $(".accuracy");

let timeLeft = TIME_LIMIT;
let timePassed = 0;
let numErrors = 0;
let accuracy = 0;
let charTyped = 0;
let curQuote = "";
let quoteNum = 0;
let timer = null;

function updateQuote() {
    quoteText.textContent = null;
    switch(levelGroup){
        case 1: curQuote = quotes1[quoteNum]; break;
        case 2: curQuote = quotes2[quoteNum]; break;
        case 3: curQuote = quotes3[quoteNum]; break;
        case 4: curQuote = quotes4[quoteNum]; break;
        case 5: curQuote = quotes5[quoteNum]; break;
        case 6: curQuote = quotes6[quoteNum]; break;
    }

    quoteText.textContent = curQuote;

    if (quoteNum < numQuotes.length-1) {
        quoteNum++;
    }
    else {
        quoteNum = 0;
    }
}

function processCurrentText() {

}

function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--; // decreases current time
        timePassed++; // increases time elapsed
        timerText.textContent = timeLeft;
    }

    else {
        finishGame(); // finishes game once 60 seconds are up
    }
}

function startGame() {
    updateQuote();
    timer = setInterval(updateTimer, 1000); // sets interval to seconds
}

function finishGame() {
    clearInterval(timer); // stops the timer
    inputArea.disabled = true; // disables typing
    quoteText.textContent = "You rescued a bee! Click on Next Level to move on."

    nextlvlbtn.style.display = "block";

    wpm = Math.round((((characterTyped / 5) / timePassed) * 60));
    wpmText.textContent = wpm;

    wpmGroup.style.display = "block";
}

$("#input-area").click(function(){
    startGame();
 })

$("#nextlvlbtn").click(function(){
    //window.location.href='pages/bee-select.html';
	window.location.href='pages/level2.html';
 })
