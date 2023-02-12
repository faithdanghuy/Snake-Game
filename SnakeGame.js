let snake;
let food;
let scl = 15;
let t = 27;
let live = 3;
let score = 0;
let gameOver = 'GAME OVER!';
let restartText = 'Press F5 to restart';
let w;
let h;


class Snake {
    constructor() {
        this.body = [];
        this.body[0] = createVector(floor(w / 2), floor(h / 2));
        this.xdir = 0;
        this.ydir = 0;
    }

    update() {
        let head = this.body[this.body.length - 1].copy();
        this.body.shift();
        head.x += this.xdir;
        head.y += this.ydir;
        this.body.push(head);

        textSize(1);
        fill(50);
        text('Score: ', t, 1);
        text(score, t + 3, 1);
        text('Live: ', t, 2);
        text(live, t + 3, 2);
    }

    show() {
        textSize(1);
        fill(50);
        text('Score: ', t, 1);
        text(score, t + 3, 1);
        text('Live: ', t, 2);
        text(live, t + 3, 2);

        for (let i = 0; i < this.body.length; i++) {
            fill(50);
            noStroke();
            rect(this.body[i].x, this.body[i].y, 1, 1);
        }
    }

    dir(x, y) {
        this.xdir = x;
        this.ydir = y;
    }

    damage() {
        let x = this.body[this.body.length - 1].x;
        let y = this.body[this.body.length - 1].y;
        if (x > w - 1 || x < 0 || y > h - 1 || y < 0) {
            return true;
        }
        for (let i = 0; i < this.body.length - 2; i++) {
            let part = this.body[i];
            if (part.x == x && part.y == y) {
                return true;
            } 
        }
        return false;
    }

    eat(pos) {
        let x = this.body[this.body.length - 1].x;
        let y = this.body[this.body.length - 1].y;
        if(x === pos.x && y === pos.y) {
            this.grow();
            score++;
            return true;
        }
        else {
            return false;
        }
    }

    grow() {
        let head = this.body[this.body.length - 1].copy();
        this.body.push(head);
    }
}

function keyPressed() {
    if(keyCode == UP_ARROW || keyCode == 87) {
        snake.dir(0, -1);
    } else if(keyCode == DOWN_ARROW || keyCode == 83) {
        snake.dir(0, 1);
    } else if(keyCode == LEFT_ARROW || keyCode == 65) {
        snake.dir(-1, 0);
    } else if(keyCode == RIGHT_ARROW || keyCode == 68) {
        snake.dir(1, 0);
    }
}

function setup() {
    createCanvas(500, 500);
    w = floor(width / scl);
    h = floor(height / scl);
    frameRate(10);
    snake = new Snake();
    foodLocation();
}

function foodLocation() {
    let x = floor(random(w));
    let y = floor(random(h));
    food = createVector(x, y);
    noStroke();
    fill('red');
    rect(food.x, food.y, 1, 1);
}

function draw() {
    scale(scl);
    background(230);
    snake.update();
    snake.show();

    if (snake.eat(food)) {
        foodLocation();
    }

    if (snake.damage()) {
        live--;
    }

    noStroke();
    fill('red');
    rect(food.x, food.y, 1, 1);

    if (live < 1) {
        background(50);
        textFont('Arial');
        textSize(3);
        fill(255);
        text(gameOver, 7, 17);
        textSize(1);
        text(restartText, 12, 19);
        noLoop();
    }
}