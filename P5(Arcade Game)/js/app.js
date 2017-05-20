var score = 0;
var MAX = 450;
var MIN = 150;
var Enemy = function(a, b){
    this.sprite = 'images/enemy-bug.png';
    this.a = a;
    this.b = b;
    this.speed = this.getSpeed();
};

Enemy.prototype.getSpeed = function(){
    var sp = Math.floor(Math.random()*(MAX-MIN+1)+MIN);
    return sp;
}

Enemy.prototype.update = function(dt){
    if(this.a < 500)
         this.a = this.a + this.speed * dt;
    else {
         this.a = -100;
        this.speed = this.getSpeed();
    }
};

Enemy.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.a, this.b);
};

var Player = function(a, b){
    this.sprite = 'images/char-boy.png';
    this.a = a;
    this.b = b;
};
document.addEventListener('keyup', function(e){
    var usedKeys ={
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',
        65: 'left',
    };
    player.handleInput(usedKeys[e.keyCode]);
});



Player.prototype.update = function(){
    var i;
    for(i = 0; i < allEnemies.length; i++){
             if((this.b == allEnemies[i].b) && (this.a < allEnemies[i].a + 101) && (this.a + 101 > allEnemies[i].a))
                this.reset();
         
            }
};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.a, this.b);
}

Player.prototype.reset = function(){
    this.a = 200;
    this.b = 400;
};

Player.prototype.handleInput = function(key){
	       // Key inputs, on detection of key this function moves the player according to the key pressed.
    if(key == 'left'){
        if(this.a > 0) this.a -= 100;
    }
        else if(key == 'right'){
            if(this.a  < 400)
                this.a = this.a + 100;
        }
    else if(key == 'up'){
        if(this.b > 40){
            this.b = this.b - 90;
        }
        else{
            score = score + 1;
            $('#score').text(score);
            this.reset();
        }
    } else if(key == 'down'){
        if(this.b < 400){
            this.b = this.b + 90;
        }
    }
};

var allEnemies = [
new Enemy(0, 40),
new Enemy(0, 130),
new Enemy(0, 220),
];

var player = new Player(200, 400);
