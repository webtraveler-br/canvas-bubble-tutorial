const canvas = document.querySelector('canvas');
canvas.width = document.body.clientWidth;
canvas.height = window.innerHeight;

// c = context
let c = canvas.getContext('2d');

class Bubble {
    constructor(radius, x, y, dx, dy, color) {
        this.radius = radius
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.color = color;
        this.angles = {
            start: 0,
            end: Math.PI * 2
        };
    }
    draw() {
        c.beginPath();
        c.strokeStyle = this.color;
        c.arc(
            this.x, 
            this.y, 
            this.radius, 
            this.angles.start, 
            this.angles.end, 
            false
        );
        c.stroke();
    }
    move() {
        if(this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        this.x += this.dx;
        if(this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.y += this.dy;
        this.draw();
    }
}

function randomColor() {
    return '#'+Math.floor(Math.random()*16777215).toString(16);
}

const bubblesCollection = [];

for (let index = 0; index < 100; index++) {
    const radius = 50;
    const x = (Math.random() * (innerWidth - radius * 2)) + radius;
    const y = (Math.random() * (innerHeight - radius * 2)) + radius;
    const dx = 2 * Math.pow(-1, Math.floor(Math.random() * 2));
    const dy = 2 * Math.pow(-1, Math.floor(Math.random() * 2));
    const color = randomColor();
    bubblesCollection.push(new Bubble(radius,x,y,dx,dy,color));
}

console.log(bubblesCollection);

function animate() {
    console.log('teste');
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    for (let index = 0; index < bubblesCollection.length; index++) {
        bubblesCollection[index].move();
    }
}

animate();