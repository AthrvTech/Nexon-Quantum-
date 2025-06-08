const canvas = document.getElementById("waterCanvas");
const ctx = canvas.getContext("2d");

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

let drops = [];
let waves = [];

class Drop {
  constructor(x, y) {
    this.x = x;
    this.y = 0;
    this.targetY = y;
    this.radius = 5;
    this.speed = 5;
    this.hit = false;
  }

  update() {
    if (this.y < this.targetY) {
      this.y += this.speed;
    } else if (!this.hit) {
      this.hit = true;
      waves.push(new Wave(this.x, this.y));
    }
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#C4DFE6";
    ctx.fill();
  }
}

class Wave {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 0;
    this.maxRadius = 80;
    this.alpha = 1;
  }

  update() {
    this.radius += 2;
    this.alpha -= 0.01;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(102, 165, 173, ${this.alpha})`;
    ctx.lineWidth = 3;
    ctx.stroke();
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drops.forEach((drop, i) => {
    drop.update();
    drop.draw();
    if (drop.hit) drops.splice(i, 1);
  });

  waves.forEach((wave, i) => {
    wave.update();
    wave.draw();
    if (wave.alpha <= 0) waves.splice(i, 1);
  });

  requestAnimationFrame(animate);
}

function spawnDrop() {
  const x = Math.random() * canvas.width;
  const y = canvas.height * 0.8;
  drops.push(new Drop(x, y));
}

animate();
setInterval(spawnDrop, 2000);

window.addEventListener("resize", () => {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
});
