"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var xMovement = 101;
var yMovement = 83; // Enemies our player must avoid

var Enemy =
/*#__PURE__*/
function () {
  function Enemy() {
    _classCallCheck(this, Enemy);

    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y = 0;
    this.speed = 1;
  } // Update the enemy's position, required method for game
  // Parameter: dt, a time delta between ticks


  _createClass(Enemy, [{
    key: "update",
    value: function update(dt) {} // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    // Draw the enemy on the screen, required method for game

  }, {
    key: "render",
    value: function render() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
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
    this.y = 5 * yMovement;
  } // Update the player position
  // Parameter: dt, a time delta between ticks


  _createClass(Player, [{
    key: "update",
    value: function update() {// You should multiply any movement by the dt parameter
      // which will ensure the game runs at the same speed for
      // all computers.
    }
  }, {
    key: "render",
    value: function render() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
  }, {
    key: "handleInput",
    value: function handleInput(allowedKeys) {}
  }]);

  return Player;
}(); // Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player


var enemy1 = new Enemy();
var enemy2 = new Enemy();
var enemy3 = new Enemy();
var enemy4 = new Enemy();
var enemy5 = new Enemy();
var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5];
var player = new Player(); // This listens for key presses and sends the keys to your
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