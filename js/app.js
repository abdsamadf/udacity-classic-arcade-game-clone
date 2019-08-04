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
const canvasWidth = 505;
const canvasHeight = 606;
const xMovement = 101;
const yMovement = 83;
const moveFactor = 20; // for enemies more accurate position

// Enemies our player must avoid
class Enemy {
    constructor(x, y, speed) {
        // Variables applied to each of our instances go here,
        // we've provided one for you to get started

        // The image/sprite for our enemies, this uses
        // a helper we've provided to easily load images

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
        // You should multiply any movement by the dt parameter
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

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor () {
        this.sprite = playerCharacters[0];
        this.x = 2 * xMovement;
        this.y = 5 * yMovement - moveFactor;
        this.width = 60;
        this.height = 80;
    }

    // Update the player position
    // Parameter: dt, a time delta between ticks
    update() {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
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
        // player movement
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

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
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
        player.reset();
        allEnemies = [];
        showModal();
    }
}

/**
 * restart the game
 */
function restartGame() {
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

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
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
