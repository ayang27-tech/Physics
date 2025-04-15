let colorlist = ['#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080', '#ffffff', '#000000'];  

let bouncers = [];  
let G = 0.1; // gravity  
let wind = 0; // initial wind force  

function setup() {  
  createCanvas(400, 400);  

  // Create multiple Bouncer instances  
  for (let i = 0; i < 10; i++) {  
    bouncers.push(new Bouncer(random(width), random(height), 10, random(colorlist), random(-2, 2), random(-2, 2)));  
  }  

  ellipseMode(RADIUS);  
}  

function draw() {  
  background(220);  

  // Update and display each bouncer  
  for (let b of bouncers) {  
    b.applyForce(createVector(wind, G)); // Apply wind and gravity  
    b.update();  
    b.display();  
  }  

  // Check for collisions  
  for (let i = 0; i < bouncers.length; i++) {  
    for (let j = i + 1; j < bouncers.length; j++) {  
      bouncers[i].checkCollision(bouncers[j]);  
    }  
  }  
}  

function keyPressed() {  
  if (key === ' ') {  
    // Toggle wind force when spacebar is pressed  
    wind = (wind === 0) ? random(-1, 1) : 0;   
  }  
}  

// Class representing a circle that bounces around  

class Bouncer {
  constructor(x, y, r, color, vx, vy) {
    this.position = createVector(x, y);
    this.radius = r;
    this.color = color;
    this.velocity = createVector(vx, vy);
    this.acceleration = createVector(0, 0); // Initialize acceleration
  }

  applyForce(force) {
    this.acceleration.add(force); // Update acceleration with the applied force
  }

  update() {
    // Update velocity with acceleration
    this.velocity.add(this.acceleration);
    this.acceleration.set(0, 0); // Reset acceleration after updating velocity

    // Update position with velocity
    this.position.add(this.velocity);

    // Constrain the bouncer within canvas bounds
    if (this.position.x > width - this.radius) {
      this.position.x = width - this.radius;
      this.velocity.x *= -1; // Bounce back
    }
    if (this.position.x < this.radius) {
      this.position.x = this.radius;
      this.velocity.x *= -1; // Bounce back
    }

    if (this.position.y > height - this.radius) {
      this.position.y = height - this.radius;
      this.velocity.y *= -1; // Bounce back
    }
    if (this.position.y < this.radius) {
      this.position.y = this.radius;
      this.velocity.y *= -1; // Bounce back
    }
  }

  display() {
    fill(this.color);
    ellipse(this.position.x, this.position.y, this.radius);
  }
}
= -1; // Bounce back  
    }  
  }  

  display() {  
    fill(this.color);  
    noStroke();  
    ellipse(this.position.x, this.position.y, this.radius);  
  }  

  checkCollision(other) {  
    let distance = p5.Vector.dist(this.position, other.position);  
    if (distance < this.radius + other.radius) {  
      // Simple collision response  
      let temp = this.velocity.copy();  
      this.velocity = other.velocity.copy();  
      other.velocity = temp;  
    }  
  }  
}  