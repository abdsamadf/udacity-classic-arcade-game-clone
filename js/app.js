/**
 * list player characters
 */
let playerCharacters = [
    'images/char-boy.png',
    'images/char-cat-girl.png',
    'images/char-horn-girl.png',
    'images/char-pink-girl.png',
    'images/char-princess-girl.png'
];
let characterCounter = 0;
let stopGame = false; // stop the game
const canvasWidth = 505;
const canvasHeight = 606;
const xMovement = 101;
const yMovement = 83;
const moveFactor = 20; // for enemies more accurate position

// Enemies our player must avoid
class Enemy {
    constructor(x, y, speed) {
        // The image/sprite for our enemies
        this.sprite = 'images/enemy-bug.png';
        this.x = x * xMovement;
        this.y = y * yMovement - moveFactor;
        this.speed = speed;
        this.width = 90;
        this.height = 70;
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        if (this.x > canvasWidth) {
            this.x = getRandomInt(-4, 0) * xMovement;
            this.y = getRandomInt(1, 4) * yMovement - moveFactor;
            this.speed = getRandomInt(1, 6);
        }
        this.x += this.speed * xMovement * dt;
    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // check for another object is collide with enemy
    // uses the bounding box algorithm
    // found from mdn 2d collision detection https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
    collides(obj2) {
        if (this.x < obj2.x + obj2.width &&
            this.x + this.width > obj2.x &&
            this.y < obj2.y + obj2.height &&
            this.y + this.height > obj2.y) return true;
    }
}

class Player {
    constructor () {
        // The image/sprite for our player
        this.sprite = playerCharacters[0];
        this.x = 2 * xMovement;
        this.y = 5 * yMovement - moveFactor;
        this.width = 60;
        this.height = 80;
    }

    // Update the player position
    update() {

    }

    // Draw the player on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    // change the player character
    changeCharacter() {
        this.sprite = playerCharacters[characterCounter % playerCharacters.length];
    }

    handleInput(allowedKeys) {
        if (stopGame) return;
        this.handlePlayerMovement(allowedKeys);
        this.handleChangeCharacter(allowedKeys);
        gameWon();
    }


    /**
     * Handle change player character by pressing 'c' to select different character
     * @param  {e} allowedKeys
     */
    handleChangeCharacter(allowedKeys) {
        if (allowedKeys == 'c') {
            characterCounter += 1;
            this.changeCharacter();
            this.reset();
        }
    }

    /**
     * Player movement and handle player cannot move off the screen
     * @param  {e} allowedKeys
     */
    handlePlayerMovement(allowedKeys) {
        if (allowedKeys == 'up' && this.y - yMovement + moveFactor >= 0) {
            this.y -= yMovement;
        }
        if (allowedKeys == 'left' && this.x - xMovement >= 0) {
            this.x -= xMovement;
        }
        if (allowedKeys == 'right' && this.x + xMovement < canvasWidth) {
            this.x += xMovement;
        }
        if (allowedKeys == 'down' && this.y + 3 * yMovement <= canvasHeight) {
            this.y += yMovement;
        }
    }

    // reset the player position
    reset() {
        this.x = 2 * xMovement;
        this.y = 5 * yMovement - moveFactor;
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

// get the html elements
const playAgainBtn = document.querySelector('.close-animatedModal.btn-slice');

// all enemy objects in an array called allEnemies
// the player object in a variable called player
let enemy1 = new Enemy(-1, 1, 1);
let enemy2 = new Enemy(2, 1, 3);
let enemy3 = new Enemy(-4, 2, 2);
let enemy4 = new Enemy(3, 3, 1);
let enemy5 = new Enemy(-3, 3, 3);
let enemy6 = new Enemy(-2, 3, 5);

let allEnemies;

/**
 * initialize game
 */
function initGame() {
     allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];
}

initGame();

let player = new Player();

/**
 * player won when he reaches the water
 */
function gameWon() {
    if (player.y < 0) {
        stopGame = true;
        player.reset();
        allEnemies = [];
        showModal();
    }
}

/**
 * restart the game
 */
function restartGame() {
    stopGame = false;
    initGame();
}

// click on play again button to play again
playAgainBtn.addEventListener('click', () => {
    restartGame();
});

/**
 * show the modal
 */
function showModal() {
    modal.style.display = 'block';
    const $ = window.$;
    $('#open-modal').animatedModal(); // initialize animatedModal
    $('#open-modal').click(); // triggers opening of Modal.
}

/**
 * collision detection when player collide with enemy
 */
function checkCollisions() {
    allEnemies.forEach((enemy) => {
        if (enemy.collides(player)) {
            player.reset();
        }
    });
}

// When content is loaded then mobiles users to play game by swiping and change character by touch
document.addEventListener('DOMContentLoaded', () => {
    let hammer = new Hammer.Manager(document.body);
    let swipe = new Hammer.Swipe();
    hammer.add(swipe);
    hammer.on('swipeup', () => {
        player.handleInput('up');
    });
    hammer.on('swipeleft', () => {
        player.handleInput('left');
    });
    hammer.on('swiperight', () => {
        player.handleInput('right');
    });
    hammer.on('swipedown', () => {
        player.handleInput('down');
    });

    let singleTap = new Hammer.Tap({ event: 'singletap' });
    hammer.add(singleTap);
    hammer.on('singletap', () => {
        player.handleInput('c');
    });
});

// This listens for key presses and sends the keys to
// Player.handleInput() method.
document.addEventListener('keyup', e => {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        67: 'c'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
