// Represents the 4 buttons
const buttonColors = ["red", "blue", "green", "yellow"];

// An empty array which will be added to each level (in nextSequence) with randomChosenColor
var gamePattern = [];

// An empty array to remember the user clicks pattern during the game.
var userClickedPattern = [];

// Game starts at level 0.
var level = 0;

var started = false;

// Detect when keyboard is pressed. First time starts game.

$(document).keypress(function() {
    if (!started) {
        $("#level-title").text(`Level ${level}`);
        nextSequence();
        started = true;
    }
});

// Detect when any buttons are clicked. When clicked, trigger handler function.
$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    
    animatePress(userChosenColor);
    playSound(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
});


// Animates the button when user clicks by adding then removing .pressed class in styles.css
function animatePress(currentColor) {
    $(`.${currentColor}`).addClass("pressed");

    setTimeout(function() {
        $(`.${currentColor}`).removeClass("pressed");
    }, 100);
}

function nextSequence() {
    
    // reset userClickPattern every time nextSequence is called
    userClickedPattern = [];

    // Increase level and change title text to show current level
    level++;
    $("#level-title").text(`Level ${level}`);

    var randomNumber = Math.round(Math.random() * 3);
    var randomChosenColor = buttonColors[randomNumber];

    // A new button is added to the gamepattern sequence after every level.
    gamePattern.push(randomChosenColor);

    // Get button with same id as randomChosenColor
    var chosenButton = $(`#${randomChosenColor}`);
    // Animate chosen button to flash and play button sound
    chosenButton.fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function playSound(name) {
    // Play sound for selected button.
    var audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

function checkAnswer(currentLevel) {

    // Check if most recent user click is the same as the gamePattern.
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        // console.log("success");
        // If the final click was correct, make sure the user has finished their sequence (arrays will be the same length)
        if (gamePattern.length === userClickedPattern.length) {
            // Call nextSequence after 1s
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        // console.log("wrong");
        // If user clicks incorrectly, play the wrong.mp3 sound, change the h1 to GAME OVER, and flash .game-over class in css
        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("GAME OVER. Press any key to Restart")
    }
}
