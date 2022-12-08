var buttons = ["up", "down", "left", "right"];
var gamePattern = [];
var userPattern = [];
var level = 0;

//sets the high score to 0 if one isn't found
if (localStorage.getItem("highScore") === null) {
    localStorage.setItem("highScore", 0);
}

$(".current-score").text(level);
$(".high-score").text(localStorage.getItem("highScore"));

//used to check keyboard input
$(document).keydown(function(e) {
    var key = e.which;
    var validKeys = [87, 38, 65, 37, 83, 40, 68, 39];

    //starts game if one isn't in progress, otherwise checks for valid input (WASD and arrow keys)
    if (gamePattern.length === 0) {
        level = 1;
        $(".current-score").text(level-1);
        nextSequence();
    } else if (validKeys.includes(key) && gamePattern.length !== 0 && userPattern.length !== gamePattern.length){
        switch (e.which) {
            case 87:
            case 38:
                var userChosenButton = "up";
                break;
            case 65:
            case 37:
                var userChosenButton = "left";
                break;
            case 83:
            case 40:
                var userChosenButton = "down";
                break;
            case 68:
            case 39:
                var userChosenButton = "right";
                break;
        }

        userPattern.push(userChosenButton);

        checkAnswer(userChosenButton);
    }    
});

//starts the game if one isn't in progress, checks that the clicked on-screen button is correct
$(".arrow").click(function() {
    if (gamePattern.length === 0) {
        level = 1;
        $(".current-score").text(level-1);
        nextSequence();
    } else if (gamePattern.length !== 0 && userPattern.length !== gamePattern.length) {
        var userChosenButton = this.id;
        userPattern.push(userChosenButton);

        checkAnswer(userChosenButton);
    }
});

//sets next sequence in pattern, animates and plays a sound for the next sequence, and increases the current game level
function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenButton = buttons[randomNumber];

    $("#" + randomChosenButton).fadeOut().fadeIn();
    playSound(randomChosenButton);

    gamePattern.push(randomChosenButton);

    $("h2").html("Level <span class='number'>" + level + "</span>");
    level += 1;
}

//checks that the user input is correct
function checkAnswer(userChosenButton) {
    var check = userPattern.length - 1;

    if (userPattern[check] === gamePattern[check]) {
        animateButton(userChosenButton);
        playSound(userChosenButton);

        if (userPattern.length === gamePattern.length) {

            setTimeout (function() {
                $(".current-score").text(level-1);
                userPattern = [];
                nextSequence();
            }, 750);
        } 
    } else {
        playSound("game-over");

        $("h2").text("Game over, press any key to restart");

        if (level > localStorage.getItem("highScore")) {
            localStorage.setItem("highScore", (level - 1));
            $(".high-score").text(localStorage.getItem("highScore"));
        }

        setTimeout(() => {gamePattern = []}, 1000);
        setTimeout(() => {userPattern = []}, 1000);
    }
}

//plays audio based on current button
function playSound(name) {
    var buttonAudio = new Audio("sounds/" + name + ".wav");

    buttonAudio.play();
}

//animates current button
function animateButton(currentButton) {
    $("#" + currentButton).removeClass("bi-arrow-" + currentButton + "-circle-fill");
    $("#" + currentButton).addClass("bi-arrow-" + currentButton + "-circle");

    setTimeout(function() {
        $("#" + currentButton).removeClass("bi-arrow-" + currentButton + "-circle");
        $("#" + currentButton).addClass("bi-arrow-" + currentButton + "-circle-fill");
    }, 150);
}