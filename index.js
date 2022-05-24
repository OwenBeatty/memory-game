var buttons = ["up", "down", "left", "right"];
var gamePattern = [];
var userPattern = [];
var level = 0;

if (sessionStorage.getItem("highScore") === null) {
    sessionStorage.setItem("highScore", 0);
}

$(".high-score").text(sessionStorage.getItem("highScore"));

$(document).keydown(function(e) {
    var key = e.which;
    var validKeys = [87, 38, 65, 37, 83, 40, 68, 39];

    if (gamePattern.length === 0) {
        nextSequence();
    } else if (validKeys.includes(key)){
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
    
        animateButton(userChosenButton);
        playSound(userChosenButton);

        checkAnswer();
    }    
});

$(".arrow").click(function() {
    if (gamePattern.length === 0) {
        nextSequence();
    } else if (gamePattern.length !== 0 && userPattern.length !== gamePattern.length) {
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

    $("h2").html("Level <span class='number'>" + level + "</span>");
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
        playSound("game-over");

        $("h2").text("Game Over, Press Any Key to Restart");

        // $("body").addClass("game-over");

        // setTimeout(function() {
        //     $("body").removeClass("game-over");
        // }, 200);

        if (level > sessionStorage.getItem("highScore")) {
            sessionStorage.setItem("highScore", level);
            $(".high-score").text(sessionStorage.getItem("highScore"));
        }

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