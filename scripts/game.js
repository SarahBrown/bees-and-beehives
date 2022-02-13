// round time limit
let TIME_LIMIT = 60;

// quotes, https://honeybeenet.gsfc.nasa.gov/Honeybees/Basics.htm
let quotes1 = [
    "Bees have 2 pairs of wings",
    "Bees have 5 eyes",
    "Bees fly about 20 mph",
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

let curLevel = $(".cur-level").text();
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
let started = false;
let urlStr = ''
inputArea.val('');

function updateQuote() {
    quoteText.text(null);

    // switches between quotes array depending on level
    switch(curLevel){
        case "1": curQuote = quotes1[quoteNum]; break;
        case "2": curQuote = quotes2[quoteNum]; break;
        case "3": curQuote = quotes3[quoteNum]; break;
        case "4": curQuote = quotes4[quoteNum]; break;
        case "5": curQuote = quotes5[quoteNum]; break;
        case "6": curQuote = quotes6[quoteNum]; break;
    }

    // splits string into span of chars
    curQuote.split('').forEach(char => {
        const span = document.createElement('span');        
        span.innerText = char;
        quoteText.append(span);
    })

    // increments quote num or cycles to start
    if (quoteNum < numQuotes-1) {
        quoteNum++;
    }
    else {
        quoteNum = 0;
    }
}

function processCurrentText() {
    // grabs current text from textbox and splits it for comparision
    curInput = inputArea.val();
    curInputArr = curInput.split('');

    // updates variables after each char typed
    charTyped++;
    errors = 0;

    // stuffs quote span into an array
    quoteSpanArr = quoteText.children().toArray();

    // compares arrays to each other
    quoteSpanArr.forEach((char, index) => {
        let typeChar = curInputArr[index];

        if (typeChar == null) {
            char.classList.remove("correct");
            char.classList.remove("incorrect");
        }

        else if (typeChar === char.innerText) {
            char.classList.add("correct");
            char.classList.remove("incorrect");
        }

        else {
            char.classList.add("incorrect");
            char.classList.remove("correct");
            errors++;
        }
    });

    // update num of errors
    errorText.text(numErrors+errors);

    // update accuracy
    let correctChar = (charTyped - (numErrors+errors));
    let accur = ((correctChar/charTyped)*100);
    accuracy = Math.round(accur);
    accuracyText.text(accuracy);

    // check to see if need to update quote
    if (curInput.length == curQuote.length) {
        updateQuote();
        numErrors += errors;
        inputArea.val('');
    }
}

function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--; // decreases current time
        timePassed++; // increases time elapsed
        timerText.text(timeLeft);
    }

    else {
        finishGame(); // finishes game once 60 seconds are up
    }
}

function startGame() {
    updateQuote();
    timer = setInterval(updateTimer, 1000); // sets interval to seconds
    switch(curLevel){
        case "1": urlStr='../pages/level2.html'; break;
        case "2": urlStr='../pages/level3.html'; break;
        case "3": urlStr='../pages/level4.html'; break;
        case "4": urlStr='../pages/level5.html'; break;
        case "5": urlStr='../pages/level6.html'; break;
        case "6": urlStr='../pages/beehive.html'; break;
    }
}

function resetValues() {
    timeLeft = TIME_LIMIT;
    timePassed = 0;
    errors = 0;
    numErrors = 0;
    accuracy = 0;
    charTyped = 0;
    quoteNum = 0;
    inputArea.val('');
    inputArea.prop("disabled", false);  // re enables typing
    wpmGroup.hide();
    started = false;

    quoteText.text("Click on the area below to start up the game.");
    accuracyText.text("100");
    errorText.text("0");
    restartbtn.style.display="none";
    nextlvlbtn.style.display="none";
}

function finishGame() {
    clearInterval(timer); // stops the timer
    inputArea.prop("disabled", true);  // disables typing

    if (accuracy >= 70) {
        quoteText.text("You rescued a bee! Click on Next Level to move on.");
        nextlvlbtn.style.display = "block";
    }

    else {
        quoteText.text("Aim for above 70% to rescue this bee, press Restart to try again!");
        restartbtn.style.display = "block";
    }

    wpm = Math.round((((charTyped / 5) / timePassed) * 60));
    wpmText.text(wpm);

    wpmGroup.show();
}

$("#input-area").focus(function(){
    if (!started) {
        started = true;
        startGame();
    }
 })

$("#input-area").on("input", function(){
    processCurrentText();
 })

$("#nextlvlbtn").click(function(){
    //window.location.href='pages/bee-select.html';
    window.location.href=urlStr;
	
 })

 $("#restartbtn").click(function(){
	resetValues();
 })
