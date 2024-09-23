function setup() {
  createCanvas(400, 400);
  rectMode(CENTER);
  textFont(font);
  textAlign(CENTER, CENTER);
  imageMode(CENTER);
}

var font, back;
function preload() {
  font = loadFont("fixedsys.ttf");
  back = loadImage("Circuit.png");
}

var keys = [];
keyPressed = function () {
  keys[keyCode] = true;
};

keyReleased = function () {
  keys[keyCode] = false;
};

var transl = [200, 200];
var destr = []; //Enemy
var finalDestr = [];
//var pos = [200, 200];
var bits = []; //Droplets
var finalBits = [];
var drop = 10;
var dead = false;
var keys = [];
var time = 0;
var speed = 3;
var level = 0;
var scene = "menu";
//var drop = [300, 200];

function Player(x, y, w, h) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
}

Player.prototype.draw = function () {
  stroke(0, 255, 0);
  fill(255, 255, 0);
  rect(this.x, this.y, this.w, this.h);
  noStroke();
  //   if (keyIsPressed && scene === "game") {
  //     if (keys[37] || keys[65]) {
  //       if (transl[0] < 800) {
  //         if (pos[0] >= 200 + drop) {
  //           pos[0] -= speed;
  //         } else {
  //           transl[0] += speed;
  //         }
  //       } else {
  //         transl[0] += 0;
  //         pos[0] -= speed;
  //       }
  //     }
  //     if (keys[38] || keys[87]) {
  //       if (transl[1] < 800) {
  //         if (pos[1] >= 200 + drop) {
  //           pos[1] -= speed;
  //         } else {
  //           transl[1] += speed;
  //         }
  //       } else {
  //         transl[1] += 0;
  //         pos[1] -= speed;
  //       }
  //     }
  //     if (keys[39] || keys[68]) {
  //       if (transl[0] > -400) {
  //         if (pos[0] <= 200 - drop) {
  //           pos[0] += speed;
  //         } else {
  //           transl[0] -= speed;
  //         }
  //       } else {
  //         transl[0] -= 0;
  //         pos[0] += speed;
  //       }
  //     }
  //     if (keys[40] || keys[83]) {
  //       if (transl[1] > -400) {
  //         if (pos[1] <= 200 - drop) {
  //           pos[1] += speed;
  //         } else {
  //           transl[1] -= speed;
  //         }
  //       } else {
  //         transl[1] -= 0;
  //         pos[0] += speed;
  //       }
  //     }

  //     for (var i = 0; i < bits.length; i += 1) {
  //       if (keys[37]) {
  //         if (pos[0] < 200 - drop) {
  //           bits[i][0] += 0;
  //         } else {
  //           bits[i][0] += speed;
  //         }
  //       }
  //       if (keys[38]) {
  //         if (pos[1] < 200 - drop) {
  //           bits[i][1] += 0;
  //         } else {
  //           bits[i][1] += speed;
  //         }
  //       }
  //       if (keys[39]) {
  //         if (pos[0] < 200 + drop) {
  //           bits[i][0] += 0;
  //         } else {
  //           bits[i][0] -= speed;
  //         }
  //       }
  //       if (keys[40]) {
  //         if (pos[1] > 200 + drop) {
  //           bits[i][1] -= 0;
  //         } else {
  //           bits[i][1] -= speed;
  //         }
  //       }
  //     }
  //     for (i = 0; i < destr.length; i += 1) {
  //       if (keys[37]) {
  //         destr[i][0] += speed;
  //       } else if (keys[38]) {
  //         destr[i][1] += speed;
  //       } else if (keys[39]) {
  //         destr[i][0] -= speed;
  //       } else if (keys[40]) {
  //         destr[i][1] -= speed;
  //       }
  //     }
  //   }
  if (keyIsPressed && scene == "game") {
    if (keys[37] || keys[65]) {
      transl[0] += speed;
    }
    if (keys[38] || keys[87]) {
      transl[1] += speed;
    }
    if (keys[39] || keys[68]) {
      transl[0] -= speed;
    }
    if (keys[40] || keys[83]) {
      transl[1] -= speed;
    }
  }
};

function droplets(x, y, img) {
  this.x = x;
  this.y = y;
  this.img = img;
}

droplets.prototype.draw = function (p) {
  fill(255, 255, 0);
  rect(this.x, this.y, 10, 10);
  //image(img, x, y);
};

droplets.prototype.kill = function (p) {
  if (dist(this.x, this.y, p.x, p.y) < 13 + drop) {
    return true;
  }
};

function Enemy(x, y, w, h) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
}

Enemy.prototype.draw = function (p) {
  //for (var i = 0; i < destr.length - 1; i += 2) {
  fill(255, 0, 0);
  rect(this.x, this.y, this.w, this.h);
  //}
};

Enemy.prototype.killPlayer = function (p, j) {
  for (var i = 0; i < destr.length; i += 1) {
    if (dist(finalDestr[i][0], finalDestr[i][1], p.x, p.y) <= 150 && !dead) {
      if (finalDestr[i][0] > p.x) {
        destr[i][0] -= 1;
      }
      if (finalDestr[i][0] < p.x) {
        destr[i][0] += 1;
      }
      if (finalDestr[i][1] > p.y) {
        destr[i][1] -= 1;
      }
      if (finalDestr[i][1] < p.y) {
        destr[i][1] += 1;
      }
    }
  }

  if (
    p.y + p.h / 2 > this.y - this.w / 2 &&
    p.y - p.h / 2 < this.y + this.h / 2 &&
    p.x + p.w / 2 > this.x - this.w / 2 &&
    p.x + p.w < this.x + this.w
  ) {
    drop -= 0.1;
    //text("Touching1", 20, 20);
  }
  if (
    p.y + p.h / 2 > this.y - this.w / 2 &&
    p.y - p.h / 2 < this.y + this.h / 2 &&
    p.x - p.w / 2 < this.x + this.w / 2 &&
    p.x > this.x
  ) {
    drop -= 0.1;
    //text("Touching2", 20, 20);
  }

  if (
    p.x + p.w / 2 > this.x - this.w / 2 &&
    p.x - p.w / 2 < this.x + this.w / 2 &&
    p.y + p.h / 2 > this.y - this.w / 2 &&
    p.y + p.h < this.y + this.h
  ) {
    drop -= 0.1;
    //text("Touching3", 20, 20);
  }
  if (
    p.x + p.w / 2 > this.x - this.w / 2 &&
    p.x - p.w / 2 < this.x + this.w / 2 &&
    p.y - p.h / 2 < this.y + this.h / 2 &&
    p.y + p.h > this.y
  ) {
    drop -= 0.1;
    //text("Touching4", 20, 20);
  }
  if (drop <= 0) {
    dead = true;
    drop = 0;
  }
};

var ran, ran1, ran2, ran3;
var gener8 = function (p, e, d) {
  push();
  if (time % 100 === 10) {
    ran = random(-height, height);
    ran1 = random(-height, height);
    bits.push([ran, ran1]);
    finalBits.push([]);
  }
  if (time % 500 === 200) {
    ran2 = random(-height / 3, height / 3);
    ran3 = random(-height / 3, height / 3);

    if (transl[0] - ran2 < 800 && ran2 - transl[0] < 800) {
      if (transl[1] - ran3 < 800 && ran3 - transl[1] < 800) {
        destr.push([ran2, ran3]);
        finalDestr.push([]);
      }
    }
  }
  if (round(time / 100) == 7 || round(time / 100) == 2) {
    text("Enemy spawning...", 220, 380);
  }
  pop();
};

function hp() {
  fill(255);
  rect(350, 10, 100, 20);
  fill(0);
  textSize(20);
  textAlign(LEFT);
  text("Bits:" + ceil(drop), 305, 8);
}

function game() {
  var p = new Player(200, 200, 20 + drop, 20 + drop);
  background(50);
  push();
  transl[0] = constrain(transl[0], -600 + p.w / 2, 1000 - p.w / 2);
  transl[1] = constrain(transl[1], -600 + p.h / 2, 1000 - p.h / 2);
  //pos[0] = constrain(pos[0], 10 + drop / 2, 390 - drop);
  //pos[1] = constrain(pos[1], 10 + drop / 2, 390 - drop);
  // for (var j = 0; j < bits.length; j++) {
  //   bits[j][0] = constrain(bits[j][0] , -600 + p.w / 2, 1000 - p.w / 2);
  //   bits[j][1] = constrain(bits[j][1], -600 + p.h / 2, 1000 - p.h / 2);
  // }
  // for (var k = 0; k < destr.length; k++) {
  //   destr[k][0] = constrain(destr[k][0], -600 + p.w / 2, 1000 - p.w / 2);
  //   destr[k][1] = constrain(destr[k][1], -600 + p.h / 2, 1000 - p.h / 2);
  // }
  translate(transl[0], transl[1]);
  image(back, 0, 0, 1600, 1600);
  pop();
  for (let i in bits) {
    finalBits[i][0] = bits[i][0] + transl[0];
    finalBits[i][1] = bits[i][1] + transl[1];

    var d = new droplets(finalBits[i][0], finalBits[i][1]);
    var re = d.kill(p);
    if (!re) {
      d.draw(p);
    } else {
      drop++;
      bits.splice(i, 1)
    }
  }
  var enem = new Enemy();
  for (let j in destr) {
    finalDestr[j][0] = destr[j][0] + transl[0];
    finalDestr[j][1] = destr[j][1] + transl[1];

    enem = new Enemy(finalDestr[j][0], finalDestr[j][1], 30, 30);
    enem.draw();
    enem.killPlayer(p, j);
  }
  if (dead) {
    textAlign(CENTER);
    fill(0, 120);
    rect(200, 200, width, height);
    fill(255);
    textSize(40);
    text("You're dead", 200, 150);
    textSize(30);
    text("Press R to restart", 200, 190);
    if (keyIsPressed && keyCode === 82) {
      dead = false;
      destr = [];
      bits = [];
      time = 0;
      drop = 10;
      transl = [200, 200];
      pos = [200, 200];
    }
    button(
      width / 2,
      height * (255 / 400),
      width * (15 / 50),
      height * (2 / 20),
      "MENU",
      function () {
        scene = "menu";
        done = false;
      },
      (width + height) * (2 / 40),
      color(255, 0, 0)
    );
  } else {
    p.draw();
  }
  time += 0.5;
  if (time > 1000) {
    time = 0;
  }
  if (!dead) {
    gener8(p, enem);
  }
  hp();
}

function button(x, y, w, h, txt, f, txtSze, col) {
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  strokeWeight(1);
  stroke(0);
  noFill();
  if (
    mouseX > x - w / 2 &&
    mouseX < x + w / 2 &&
    mouseY > y - h / 2 &&
    mouseY < y + h / 2
  ) {
    w = w * 1.3; //Make it HUGE
    if (mouseIsPressed) {
      f();
    }
  }
  rect(x, y, w, h, 3);
  noStroke();
  fill(col);
  textSize(txtSze - 5);
  text(txt, x, y - h / 10);
} //Draws the buttons

var done = true; //Checks if Transit() is done
var tArr = [0, 0];
function transit() {
  rectMode(CORNER);
  noStroke();
  if (done === false) {
    tArr[0] = lerp(tArr[0], width + 25, 0.05);
    tArr[1] = lerp(tArr[1], -width - 25, 0.05);
    fill(255, 0, 0);
    for (var i = 0; i < height; i += 100) {
      rect(tArr[0], i, width, 50);
      rect(tArr[1], i + 50, width, 50);
    }
  }
  if (tArr[0] > width) {
    done = true; //Reset
    tArr = [0, 0]; //Reset
  }
  rectMode(CENTER);
}

var l = 1;
function menu() {
  background(220);
  button(
    width / 2,
    width * (3/5),
    width * (2 / 5),
    height * (3 / 20),
    "PLAY",
    function () {
      scene = "game";
      done = false;
    },
    (width + height) * (3 / 40),
    color(255, 0, 0)
  );
  button(
    width / 2,
    width * (4/5),
    width * (3 / 10),
    height / 8,
    "HOW",
    function () {
      scene = "how";
      done = false;
    },
    (width + height) * (21 / 400),
    color(255, 0, 0)
  );
  textSize(25);
  l = lerp(l, 0, 0.04);
  push();
  translate(width / 2, height * (120 / 400));
  scale(1 - l);
  fill(0);
  text("by DQG", 0, 0);
  pop();
  textSize(60);
  fill(0);
  text("Bitsy Bits", width * (199 / 400), height * (62 / 400)); //Shadow
  fill(255, 0, 0);
  text("Bitsy Bits", width / 2, height * (60 / 400));
}

function how() {
  textAlign(LEFT);
  background(220);
  var p = new Player(30, 60, 20, 20);
  p.draw();
  var e = new Enemy(30, 185, 20, 20);
  e.draw();
  var bit = new droplets(30, 102);
  bit.draw();
  fill(0);
  textSize(30);
  text("HOW", 175, 20);
  textSize(17);
  text(
    "    <- This is you, a lonely bit,\n\n    <- and this is your bit friends.\nYou can connect with them by going through\nthem.\n\n    <- And this is your enemy, the 'bit_\ndestroyer_1000'. It can kill you!",
    10,
    130
  );
  text(
    "There is a bar showing your hp on the top\nright. You die when it hits 0.\nArrow keys/WASD to move.\n\nMade for GMTK Game Jam 2021!\nPlaced 1378/5828 :)",
    10,
    290
  );
  button(
    350,
    height * (91 / 100),
    width * (1 / 5),
    height * (2 / 20),
    "BACK",
    function () {
      scene = "menu";
      done = false;
    },
    (width + height) * (2 / 40),
    color(255, 0, 0)
  );
}

function draw() {
  if (scene === "game") {
    game();
    transit();
  } else if (scene === "menu") {
    menu();
    transit();
  } else if (scene === "how") {
    how();
    transit();
  } else {
    background(0);
    fill(255);
    text(
      ":(  ERROR: Can't load scene\nPlease report to DQG in the comments",
      200,
      200
    );
  }
}
