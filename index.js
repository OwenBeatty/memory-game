var buttons = ["up", "down", "left", "right"];
var gamePattern = [];
var userPattern = [];
var level = 0;

$(document).keydown(function() {
    if (gamePattern.length === 0) {
        nextSequence();
    }
});

$(".arrow").click(function() {
    if (gamePattern.length !== 0 && userPattern.length !== gamePattern.length) {
        var userChosenButton = this.id;
        userPattern.push(userChosenButton);

        animateButton(userChosenButton);
        playSound(userChosenButton);

        checkAnswer();
    }
});

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenButton = buttons[randomNumber];

    $("#" + randomChosenButton).fadeOut().fadeIn();
    playSound(randomChosenButton);

    gamePattern.push(randomChosenButton);

    $("h2").text("Level " + level);
    level += 1;
}

function checkAnswer() {
    var check = userPattern.length - 1;

    if (userPattern[check] === gamePattern[check]) {
        console.log("correct");

        if (userPattern.length === gamePattern.length) {

            setTimeout (function() {
                userPattern = [];
                nextSequence();
            }, 750);
        } 
        
    } else {
        playSound("gameover");

        $("h2").text("Game Over, Press Any Key to Restart");

        // $("body").addClass("game-over");

        // setTimeout(function() {
        //     $("body").removeClass("game-over");
        // }, 200);

        gamePattern = [];
        userPattern = [];
        level = 0;
    }
}

function playSound(name) {
    var buttonAudio = new Audio("sounds/" + name + ".wav");

    buttonAudio.play();
}

function animateButton(currentButton) {
    console.log("test")
    $("#" + currentButton).removeClass("bi-arrow-" + currentButton + "-circle-fill");
    $("#" + currentButton).addClass("bi-arrow-" + currentButton + "-circle");

    setTimeout(function() {
        $("#" + currentButton).removeClass("bi-arrow-" + currentButton + "-circle");
        $("#" + currentButton).addClass("bi-arrow-" + currentButton + "-circle-fill");
    }, 150);
}