var buttonColours = ['red', 'blue', 'green', 'yellow'];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function() {
    if (!started) {
        $('#level-title').text('Level ' + level);
        nextSequence();
        started = true;
    }
});

$('.btn').click(function() {
    var userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            nextSequence();
        }
    } else {
        playSound('wrong');
        $('body').addClass('game-over');
        $('#level-title').text('Game Over, Press Any Key to Restart');

        setTimeout(function() {
            $('body').removeClass('game-over');
        }, 200);

        restart();
    }
}

function playSequence(element) {
    $('#' + element)
        .fadeIn(100)
        .fadeOut(100)
        .fadeIn(100);
    playSound(element);
}

async function asyncPlaySequence(gamePattern) {
    for (var index = 0; index < gamePattern.length; index += 1) {
        await new Promise(function(resolve, _reject) {
            setTimeout(function() {
                resolve(playSequence(gamePattern[index]));
            }, 1000);
        });
    }
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $('#level-title').text('Level ' + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    asyncPlaySequence(gamePattern);
}

function playSound(name) {
    var audio = new Audio('sounds/' + name + '.mp3');
    audio.play();
}

function animatePress(currentColor) {
    $('#' + currentColor).addClass('pressed');
    setTimeout(function() {
        $('#' + currentColor).removeClass('pressed');
    }, 100);
}

function restart() {
    level = 0;
    gamePattern = [];
    started = false;
}
