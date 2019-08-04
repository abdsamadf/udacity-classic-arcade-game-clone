"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * list player characters
 */
var playerCharacters = ['images/char-boy.png', 'images/char-cat-girl.png', 'images/char-horn-girl.png', 'images/char-pink-girl.png', 'images/char-princess-girl.png'];
var characterCounter = 0;
var stopGame = false; // stop the game

var canvasWidth = 505;
var canvasHeight = 606;
var xMovement = 101;
var yMovement = 83;
var moveFactor = 20; // for enemies more accurate position
// Enemies our player must avoid

var Enemy =
/*#__PURE__*/
function () {
  function Enemy(x, y, speed) {
    _classCallCheck(this, Enemy);

    // The image/sprite for our enemies
    this.sprite = 'images/enemy-bug.png';
    this.x = x * xMovement;
    this.y = y * yMovement - moveFactor;
    this.speed = speed;
    this.width = 90;
    this.height = 70;
  } // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks


  _createClass(Enemy, [{
    key: "update",
    value: function update(dt) {
      // multiply any movement by the dt parameter
      // which will ensure the game runs at the same speed for
      // all computers.
      if (this.x > canvasWidth) {
        this.x = getRandomInt(-4, 0) * xMovement;
        this.y = getRandomInt(1, 4) * yMovement - moveFactor;
        this.speed = getRandomInt(1, 6);
      }

      this.x += this.speed * xMovement * dt;
    } // Draw the enemy on the screen, required method for game

  }, {
    key: "render",
    value: function render() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    } // check for another object is collide with enemy
    // uses the bounding box algorithm
    // found from mdn 2d collision detection https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection

  }, {
    key: "collides",
    value: function collides(obj2) {
      if (this.x < obj2.x + obj2.width && this.x + this.width > obj2.x && this.y < obj2.y + obj2.height && this.y + this.height > obj2.y) return true;
    }
  }]);

  return Enemy;
}();

var Player =
/*#__PURE__*/
function () {
  function Player() {
    _classCallCheck(this, Player);

    // The image/sprite for our player
    this.sprite = playerCharacters[0];
    this.x = 2 * xMovement;
    this.y = 5 * yMovement - moveFactor;
    this.width = 60;
    this.height = 80;
  } // Update the player position


  _createClass(Player, [{
    key: "update",
    value: function update() {} // Draw the player on the screen, required method for game

  }, {
    key: "render",
    value: function render() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    } // change the player character

  }, {
    key: "changeCharacter",
    value: function changeCharacter() {
      this.sprite = playerCharacters[characterCounter % playerCharacters.length];
    }
  }, {
    key: "handleInput",
    value: function handleInput(allowedKeys) {
      if (stopGame) return;
      this.handlePlayerMovement(allowedKeys);
      this.handleChangeCharacter(allowedKeys);
      gameWon();
    }
    /**
     * Handle change player character by pressing 'c' to select different character
     * @param  {e} allowedKeys
     */

  }, {
    key: "handleChangeCharacter",
    value: function handleChangeCharacter(allowedKeys) {
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

  }, {
    key: "handlePlayerMovement",
    value: function handlePlayerMovement(allowedKeys) {
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
    } // reset the player position

  }, {
    key: "reset",
    value: function reset() {
      this.x = 2 * xMovement;
      this.y = 5 * yMovement - moveFactor;
    }
  }]);

  return Player;
}();

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
} // get the html elements


var playAgainBtn = document.querySelector('.close-animatedModal.btn-slice'); // all enemy objects in an array called allEnemies
// the player object in a variable called player

var enemy1 = new Enemy(-1, 1, 1);
var enemy2 = new Enemy(2, 1, 3);
var enemy3 = new Enemy(-4, 2, 2);
var enemy4 = new Enemy(3, 3, 1);
var enemy5 = new Enemy(-3, 3, 3);
var enemy6 = new Enemy(-2, 3, 5);
var allEnemies;
/**
 * initialize game
 */

function initGame() {
  allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];
}

initGame();
var player = new Player();
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
} // click on play again button to play again


playAgainBtn.addEventListener('click', function () {
  restartGame();
});
/**
 * show the modal
 */

function showModal() {
  modal.style.display = 'block';
  var $ = window.$;
  $('#open-modal').animatedModal(); // initialize animatedModal

  $('#open-modal').click(); // triggers opening of Modal.
}
/**
 * collision detection when player collide with enemy
 */


function checkCollisions() {
  allEnemies.forEach(function (enemy) {
    if (enemy.collides(player)) {
      player.reset();
    }
  });
} // This listens for key presses and sends the keys to
// Player.handleInput() method.


document.addEventListener('keyup', function (e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down',
    67: 'c'
  };
  player.handleInput(allowedKeys[e.keyCode]);
});