"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
  } // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks


  _createClass(Enemy, [{
    key: "update",
    value: function update(dt) {
      // You should multiply any movement by the dt parameter
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
}(); // Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


var Player =
/*#__PURE__*/
function () {
  function Player() {
    _classCallCheck(this, Player);

    this.sprite = "images/char-boy.png";
    this.x = 2 * xMovement;
    this.y = 5 * yMovement - moveFactor;
    this.width = 60;
    this.height = 80;
  } // Update the player position
  // Parameter: dt, a time delta between ticks


  _createClass(Player, [{
    key: "update",
    value: function update() {} // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // Draw the player on the screen, required method for game

  }, {
    key: "render",
    value: function render() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
  }, {
    key: "handleInput",
    value: function handleInput(allowedKeys) {
      // player movement
      this.handlePlayerMovement(allowedKeys);
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
} // Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player


var enemy1 = new Enemy(-1, 1, 1);
var enemy2 = new Enemy(2, 1, 3);
var enemy3 = new Enemy(-4, 2, 2);
var enemy4 = new Enemy(3, 3, 1);
var enemy5 = new Enemy(-3, 3, 3);
var enemy6 = new Enemy(-2, 3, 5);
var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];
var player = new Player();
/**
 * collision detection when player collide with enemy
 */

function checkCollisions() {
  allEnemies.forEach(function (enemy) {
    if (enemy.collides(player)) {
      player.reset();
    }
  });
} // This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.


document.addEventListener('keyup', function (e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
  player.handleInput(allowedKeys[e.keyCode]);
});