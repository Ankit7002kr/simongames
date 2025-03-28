console.log($("h1"));

const buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickedPattern=[];

let start = false;
let level = 0;


$(document).keypress(() => {
    if (!start) {
        $("h1").html("Level " + level)
        nextSequence()
        start = true;
    }
})

$(".btn").click(function () {
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1)
})


function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(() => {
                nextSequence()
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").html("game over press any key for restart");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 500);

        startOver();
    }
}

function nextSequence() {
     userClickedPattern = [];
    level++;
    $("h1").html("Level " + level)
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);


}

function startOver() {
    level = 0;
    gamePattern = [];
    start = false;
}





function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed").delay(100).removeClass("pressed");
}

