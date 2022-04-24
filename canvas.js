const canvas = document.querySelector('canvas');
canvas.width = document.body.clientWidth;
canvas.height = window.innerHeight;
window.addEventListener('resize', () => {
    canvas.width = document.body.clientWidth;
    canvas.height = window.innerHeight;
    init();
});

const mouse = {
    x: undefined,
    y: undefined
};
window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

// c = context
let c = canvas.getContext('2d');

class Bubble {
    constructor(baseRadius, hoverRadius, x, y, dx, dy, color) {
        this.radius = {
            base: baseRadius,
            hover: hoverRadius,
            current: baseRadius
        };
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
        c.fillStyle = this.color;
        c.arc(
            this.x, 
            this.y, 
            this.radius.current, 
            this.angles.start, 
            this.angles.end, 
            false
        );
        c.fill();
    }
    hover() {
        if (
            Math.abs(this.x - mouse.x) < this.radius.hover &&
            Math.abs(this.y - mouse.y) < this.radius.hover
        ) {
            if (this.radius.current < this.radius.hover) this.radius.current += 1;
        } else if (this.radius.current > this.radius.base) this.radius.current -= 1;
    }
    move() {
        if (
            this.x + this.radius.current > innerWidth ||
            this.x - this.radius.current < 0
        ) {
            this.dx = -this.dx;
        }
        this.x += this.dx;
        if (
            this.y + this.radius.current > innerHeight ||
            this.y - this.radius.current < 0
        ) {
            this.dy = -this.dy;
        }
        this.y += this.dy;
        this.hover();
        this.draw();
    }
}

const colors = [
    '#BF4226',
    '#F2913D',
    '#F2CD5C',
    '#251E40',
    '#8C1B2F'
];
function randomColor() {
    return colors[Math.floor(Math.random()*4)];
}

let bubblesCollection = [];

function init() {
    bubblesCollection = [];
    const qty = window.innerWidth / 2;

    for (let index = 0; index < qty; index++) {
        const baseRadius = (Math.random() * 4) + 1;
        const hoverRadius = 100;
        const x = (Math.random() * (innerWidth - baseRadius * 2)) + baseRadius;
        const y = (Math.random() * (innerHeight - baseRadius * 2)) + baseRadius;
        const dx = 2 * Math.pow(-1, Math.floor(Math.random() * 2));
        const dy = 2 * Math.pow(-1, Math.floor(Math.random() * 2));
        const color = randomColor();
        bubblesCollection.push(new Bubble(baseRadius,hoverRadius,x,y,dx,dy,color));
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    for (let index = 0; index < bubblesCollection.length; index++) {
        bubblesCollection[index].move();
    }
}

init();
animate();