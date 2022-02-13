// round time limit
let TIME_LIMIT = 60;

// quotes
//https://honeybeenet.gsfc.nasa.gov/Honeybees/Basics.htm
//https://www.wwf.org.uk/learn/fascinating-facts/bees
//https://www.beepods.com/101-fun-bee-facts-about-bees-and-beekeeping/
let quotes1 = [
    "Bees have 2 pairs of wings",
    "Bees have 5 eyes",
    "Bees fly about 20 mph",
    "Male bees in the hive are called drones",
    "Foragers must collect nectar from about 2 million flowers to make 1 pound of honey"
]

let quotes2 = [
    "Bees are insects, so they have 6 legs",
    "Bees have been here about 30 million years!",
    "An average beehive can hold around 50,000 bees",
    "Average per capita honey consumption in the US is 1.3 pounds",
    "Bees carry pollen on their hind legs in a pollen basket or corbicula"
]

let quotes3 = [
    "The practice of beekeeping dates back at least 4,500 years",
    "Honeybees have a dance move called the 'waggle dance'. It's not actually a dance move at all, rather a clever way of communicating between themselves",
    "Honey bees are not born knowing how to make honey. Instead, they are taught in the hive by older bees. Much like how we all learn!",
    "Bees are important because they pollinate approximately 130 agricultural crops in the US including fruit, fiber, nut, and vegetable crops",
    "Almost 90% of wild plants and 75% of leading global crops depend on animal pollination."
]

let quotes4 = [
    "Female bees in the hive (except the queen) are called worker bees",
    "Humans sometimes use the Greater Honeyguide to find bee hives in the wild.",
    "Mead, which is made from fermented honey, is the world's oldest fermented beverage",
    "Many people notice that dictionaries list 'honeybee' as one word. However, entomologists use the two-word naming convention 'honey bee.' Both are correct!",
    "Bees can be found living in so many locations. Marshes, shingle, sand dunes, soft cliffs, heathlands, wetlands, chalk grasslands"
]

let quotes5 = [
    "Every species of bee performs their communication dances differently",
    "A hive will collect approximately 66 pounds of pollen per year",
    "The name ‘Melissa’ is derived from the Greek word for honey bee",
    "The word 'honeymoon' is derived from the ancient tradition of supplying a newlywed couple with a month's supply of mead in order to ensure happiness and fertility",
    "Honey bees beat their wings 200 times per second, creating their trademark 'buzz'"
]

let quotes6 = [
    "The honey bee is the official insect of Maine",
    "Honey is 25% sweeter than table sugar",
    "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
    "In Greek mythology, Apollo is credited as being the first beekeeper",
    "Stone Age cave paintings have been found of ancient beekeepers"
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
