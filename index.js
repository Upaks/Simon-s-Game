var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var gamePlay = false;
var level = 0;

function gameRules(){
    alert("Simon Game Rules:\n1. Watch the color sequence carefully.\n2. Repeat the sequence by clicking the buttons in the same order.\n3. The sequence gets longer with each level.\n4. One mistake ends the game. Try to get as far as you can!")
}

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("level " + level)
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut(100).fadeIn(100, function(){
        playSound(randomChosenColour);
    });
}


$(".btn").click(function(){
   var userChosenColour = this.id;
   userClickedPattern.push(userChosenColour);
   playSound(userChosenColour);
   animatePress(userChosenColour);
   checkAnswer(userClickedPattern.length - 1);
});

function playSound(name){
    var audio = new Audio("sounds/" +name+ ".mp3")
    audio.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed")
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed")
    }, 100)

}


function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log("correct")
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence()
            }, 1000)
        }
    }else{
        var wrong = new Audio("sounds/wrong.mp3")
        wrong.play();
        $("body").addClass("game-over")
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200);
        console.log("wrong")
        startOver();
    }
}

function startOver(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    gamePlay = false;
    $("#level-title").text("Press Any Key to Start")
}

$(document).keypress(function(event){
    if (!gamePlay) {
        gameRules();
        setTimeout(function() {
            nextSequence();
        }, 1000);    
        gamePlay = true;
    }
})
