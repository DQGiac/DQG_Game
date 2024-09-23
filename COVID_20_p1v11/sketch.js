disableFriendlyErrors = true;
var score = 0;
var bestscore = 0;

var delag = false;
var mob = false;

function setup() {
  createCanvas(400, 400);
  for (var i = 0; i <= 8; i++) covics[i] = new movingCovic();

  skin = [
    color(214, 171, 138),
    color(255, 224, 189),
    color(235, 185, 152),
    color(141, 85, 36),
  ];
  mask = [color(255), color(122, 222, 255), color(0)];
  textFont("Consolas");
  textAlign(CENTER, CENTER);
  imageMode(CENTER);
  rectMode(CORNER);
}

var life = 1;
var score = 0;
var win = false;

var x = 190;
var y = -900;

var scene = "menu"; // Include "menu", game", "tuto", "story"
var pSpeed = 1.8; //Default is 1.8

var stopgame = false;
var herp = 0;
var setting = false;
var cur = [0, 0, 0];
var hat = [
  [
    function (X, Y, w, h) {
      stroke(0);
      fill(0);
      rect(X, Y - w / 10, w, h / 4, 6, 5, 0, 0);
      strokeWeight(w / 10);
      line(X - w / 2, Y + h / 10, X, Y + h / 10);
      strokeWeight(1);
      noStroke();
    },
  ],
  [
    function (X, Y, w, h) {
      fill(80);
      arc(X + w / 2, Y * (227 / 225), w, h * 1.3, PI, TWO_PI);
      arc(X + w / 2, Y * (227 / 225), w * 0.8, h * 1.3, PI, TWO_PI);
      arc(X + w / 2, Y * (227 / 225), w * 0.6, h * 1.3, PI, TWO_PI);
      arc(X + w / 2, Y * (227 / 225), w * 0.4, h * 1.3, PI, TWO_PI);
      arc(X + w / 2, Y * (227 / 225), w * 0.2, h * 1.3, PI, TWO_PI);
      line(X + w / 2, Y * (227 / 225), X + w / 2, Y - h / 2);
      noStroke();
    },
  ],
  [(X, Y, w, h) => image(headPhones, X + w / 2, Y + 5, w * 1.6, h * 1.4)],
  [
    function (X, Y, w, h) {
      noFill();
      strokeWeight(0.5);
      stroke(0);
      ellipse(X + w * (22 / 90), Y + 6, w * (23 / 90), h * (23 / 90));
      ellipse(X + w * (67 / 90), Y + 6, w * (23 / 90), h * (23 / 90));
      arc(X + w / 2, Y + h * (16 / 45), 7, 5, (PI * 9) / 8, (PI * 15) / 8);
      strokeWeight(1);
      noStroke();
    },
  ],
];
var skin, mask;
var des = [
  ["Neutral", "White", "Yellow", "Black"],
  ["White", "Blue", "Black"],
  ["Baseball Cap", "Beanie", "CC's Headphone", "Glasses"],
];
var frames, sec, fps;

var covics = [];
var movingCovic = function () {
  this.x = random(9, 381);
  let ran = random(1);
  if (round(ran) == 0) this.speed = -2;
  else if (round(ran) == 1) this.speed = 2;
};

var nostrokeBtn = function (x, y, w, txt, func, txtSze) {
  textAlign(CENTER, CENTER);
  textSize(txtSze);
  if (
    mouseX > x - w / 2 &&
    mouseX < x + w / 2 &&
    mouseY > y - 25 &&
    mouseY < y + 25
  ) {
    cursor(HAND);
    textSize(txtSze * 1.3);
    if (mouseIsPressed) func();
  }
  fill(255);
  text(txt, x, y);
  // textAlign(LEFT, BASELINE);
}; //Button (like the startscreen's buttons)

var strokeBtn = function (x, y, wNh, beOrNot, txt, txtSze, func, doF) {
  noFill();
  stroke(0);
  textAlign(CENTER, CENTER);
  rectMode(CENTER);
  rect(x, y, wNh, wNh, wNh / 10);
  if (beOrNot == "txt") {
    fill(0);
    textSize(txtSze);
    text(txt, x, y);
  }
  if (beOrNot == "f") {
    doF();
  }

  if (
    mouseX > x - wNh / 2 &&
    mouseX < x + wNh / 2 &&
    mouseY > y - wNh / 2 &&
    mouseY < y + wNh / 2
  ) {
    cursor(HAND);
    if (mouseIsPressed) func();
  }
  noStroke();
  rectMode(CORNER);
};

var House = function (X, Y) {
  //X = 140, Y = y - 2600
  fill(255, 102, 102);
  triangle(X, Y, X + 120, Y, X + 60, Y - 25);
  fill(255);
  stroke(0);
  rect(X + 10, Y, 100, 100);
}; //Draw the house

var human = function (X, Y, w, h) {
  //X, 291, 20, 20
  //The skin
  fill(skin[cur[0]]);
  noStroke();
  rect(X, Y, w, h, 5);
  fill(0);
  //The eyes
  ellipse(X + w / 4, Y + h * (6 / 20), w / 10, h / 10);
  ellipse(X + w * (3 / 4), Y + h * (6 / 20), w / 10, h / 10);
  //The nose
  stroke(0);
  line(X + w / 2, Y + h * (9 / 20), X + w * (11 / 20), Y + h * (6 / 20));
  //The mask
  noStroke();
  fill(mask[cur[1]]);
  rect(X + w / 5, Y + h * (9 / 20), w * (12 / 20), h * (9 / 20));
  rect(X, Y + h / 2, w / 5, h / 10);
  rect(X, Y + h * (16 / 20), w / 5, h / 10);
  rect(X + w * (16 / 20), Y + h / 2, w / 5, h / 10);
  rect(X + w * (16 / 20), Y + h * (16 / 20), w / 5, h / 10);

  // fill(0);
  // rect(X, Y - w / 10, w, h / 4, 6, 5, 0, 0);
  // strokeWeight(w / 10);
  // line(X - w / 2, Y + h / 10, X, Y + h / 10);
  // strokeWeight(1);
  hat[cur[2]][0](X, Y, w, h);

  //The mask
}; //Draw the player

//var on = false;
var tTime = 0;
draw = function () {
  cursor(AUTO);
  if (millis() > 0) {
    fps = (frameCount / millis()) * 1000;
  }

  // textAlign(LEFT, BASELINE);

  //Draw the virus and other stuffs
  {
    var Virus = function (X, Y) {
      this.X = X;
      this.Y = Y;
    };

    var virus = new Virus();

    Virus.prototype.drawEach = function (xx, yy, s, yes_or_no) {
      fill(0);
      rect(this.X - s, this.Y, s, s);
      rect(this.X + s, this.Y, s, s);
      rect(this.X, this.Y - s, s, s);
      rect(this.X, this.Y + s, s, s);
      fill(27, 189, 27);
      rect(this.X, this.Y, s, s);
      if (!delag) {
        fill(27, 189, 27, 155);
        ellipse(this.X + s / 2, this.Y + s / 2, s * (11 / 3), s * (11 / 3));
      }

      if (x + s + 12 >= this.X - s && x <= this.X + s * 2) {
        if (this.Y + s * 2 >= 291 && this.Y - s <= 311) life--;
      }
      if (sec > 100) {
        fill(27, 189, 27, 155);
        ellipse(this.X + s / 2, this.Y + s / 2, s * (11 / 3), s * (11 / 3));
      }

      if (
        (x < this.X || x > this.X + s * 2) &&
        this.Y + s * 2 >= 291 &&
        this.Y - s <= 311
      ) {
        if (yes_or_no == "mid") score += pSpeed / 420;
        else if (yes_or_no == "BIG") score += pSpeed / 1000;
        else if (yes_or_no == true) score += pSpeed / 40;
      }
    };

    Virus.prototype.drawLine = function (x, addon, y) {
      for (var loop = x; loop < x + addon; loop += 37.6) {
        virus = new Virus(loop, y);
        virus.drawEach(loop, y, 8, "mid");
      }
    };

    Virus.prototype.draw = function (
      xPlus,
      yPlus,
      loopTrans,
      loopTransY,
      loop,
      loopY,
      space
    ) {
      var drawVirus;
      for (var loop1 = loop; loop1 < loopTrans; loop1 += 24) {
        drawVirus = new Virus(loop1, y + yPlus);
        drawVirus.drawEach(loop1, y + yPlus, 8, "BIG");
        drawVirus = new Virus(loop1, y + yPlus - 80);
        drawVirus.drawEach(loop1, y + yPlus - 80, 8, "BIG");
      }

      for (var loop2 = loopY; loop2 < loopTransY; loop2 += 24) {
        drawVirus = new Virus(xPlus, loop2 + 36);
        drawVirus.drawEach(xPlus, loop2 + 36, 8, "BIG");
        drawVirus = new Virus(xPlus + space, loop2 + 36);
        drawVirus.drawEach(xPlus, loop2 + 36, 8, "BIG");
      }
    };
  } //Draw the virus and other stuffs

  var level1 = function () {
    virus.draw(8, 760, 187, y + 700, 8, y + 672, 168);
    virus.draw(360, 760, 394, y + 700, 360, y + 672, 325);
    virus.draw(8, 627, 273, y + 575, 8, y + 539, 264);
    virus.draw(215, 424, 400, y + 368, 216, y + 336, 168);
    virus.draw(169, 307, 394, y + 260, 169, y + 219, 218);
    virus.draw(8, 137, 176, y + 87, 8, y + 48, 144);
    virus.draw(360, 137, 394, y + 87, 360, y + 48, 325);
    virus.draw(240, -8, 393, y - 58, 240, y - 96, 315);
    virus.draw(8, -8, 99, y - 58, 8, y - 96, 72);
  }; //This is level 1
  var level2 = function () {
    for (var i = 0; i < covics.length; i++) {
      virus = new Virus(covics[i].x, y - 200 - 80 * i);
      virus.drawEach(covics[i].x, y - 200 - 80 * i, 8, true);
      if (covics[i].x > 382) {
        covics[i].speed = -2;
        covics[i].x = 381;
      }
      if (covics[i].x < 8) {
        covics[i].speed = 2;
        // covics[i].x = 9;
      }
      covics[i].x += covics[i].speed;
    }
  }; //This is level 2
  var level3 = function () {
    virus.drawLine(8, 164, y - 890); // line 1
    virus.drawLine(271, 164, y - 890); // line 1

    virus.drawLine(8, 200, y - 950); // line 2
    virus.drawLine(309, 200, y - 950); // line 2

    virus.drawLine(8, 120, y - 1020); // line 3
    virus.drawLine(234, 164, y - 1020); // line 3

    virus.drawLine(8, 100, y - 1080); // line 4
    virus.drawLine(196, 230, y - 1080); // line 4

    virus.drawLine(8, 140, y - 1140); // line 5
    virus.drawLine(234, 230, y - 1140); // line 5

    virus.drawLine(8, 194, y - 1210); // line 6
    virus.drawLine(272, 164, y - 1210); // line 6

    virus.drawLine(8, 234, y - 1275); // line 7
    virus.drawLine(309, 164, y - 1275); // line 7

    virus.drawLine(8, 194, y - 1340); // line 8
    virus.drawLine(272, 164, y - 1340); // line 8
  }; //This is level 3

  function movTxt(word, x, y, size) {
    fill(250, 0, 0);
    textAlign(CENTER, CENTER);
    textSize(sin(frameCount / 5) * 3 + size);
    text(word, 200, 60);
  }

  function start() {
    background(0, 176, 15);
    textSize(50);
    fill(255, 0, 0);
    if (delag) text("Covid-20", 200, 60);
    else movTxt("Covid-20", 200, 60, 50);
    noStroke();
    var drawTheVirus;
    drawTheVirus = new Virus(87, 175);
    drawTheVirus.drawEach(132, 71, 19);
    drawTheVirus = new Virus(50, 283);
    drawTheVirus.drawEach(132, 71, 19);
    drawTheVirus = new Virus(306, 134);
    drawTheVirus.drawEach(132, 71, 19);
    drawTheVirus = new Virus(316, 307);
    drawTheVirus.drawEach(132, 71, 19);

    textSize(20);
    textSize(25);
    fill(0);
    text("by DQG", 200, 97);

    if (!setting) {
      nostrokeBtn(200, 165, 100, "Play", () => (scene = "game"), 50);

      nostrokeBtn(200, 225, 120, "Story", () => (scene = "story"), 50);

      nostrokeBtn(200, 285, 100, "How", () => (scene = "tuto"), 50);
    }
    nostrokeBtn(70, 380, 90, "Settings", () => (setting = true), 20);
  }

  function howto() {
    background(250, 175, 175);
    textSize(24);
    fill(255, 0, 0);
    text("How to play Covid-20? Well…", 200, 20);
    human(40, 60, 20, 20);
    let v = new Virus(40, 140, 8);
    v.drawEach(0, 0, 8, false);
    House(20, 240);
    textSize(20);
    fill(0);
    noStroke();
    textAlign(CENTER);
    text(
      "< This is you, a survivor of\nthe Covid-20 pandemic\n\n< And this is the Covics,\nyour enemy. Your job is to\nsneak to your goals,\n\n\n< which is\nthis house",
      225,
      180
    );
    textSize(18);
    fill(255, 0, 0);
    text("Move with arrow keys/WASD", 145, 380);
  }

  function settings() {
    textAlign(CENTER, CENTER);
    function tags(x, y, f, m) {
      rectMode(CENTER);
      fill(0);
      if (mouseX > x && mouseX < x + 16 && mouseY > y - 12 && mouseY < y + 12) {
        fill(255, 0, 0);
        // mouseClicked = function () {
        if (mouseIsPressed) {
          f();
          mouseIsPressed = false;
        }
        // };
      }
      if (m == 0) triangle(x + 16, y - 12, x, y, x + 16, y + 12);
      else triangle(x, y - 12, x + 16, y, x, y + 12);

      rectMode(CORNER);
    }

    fill(220);
    rect(20, 20, 360, 360, 5);
    fill(0);
    textSize(30);
    text("About you:", 200, 50);
    text("Customize:", 200, 130);
    textSize(20);
    text("> Score:" + floor(score) + " | Best:" + bestscore + " <", 200, 83);
    textLeading(20);
    text("Skin:\n\nMask:\n\nHeadwear:    \n\nSpeed: ", 130, 230);
    text(
      des[0][cur[0]] +
        "\n\n" +
        des[1][cur[1]] +
        "\n\n" +
        des[2][cur[2]] +
        "\n\n" +
        pSpeed.toFixed(1),
      260,
      230
    );
    textLeading(25);

    stroke(0);
    noFill();
    rect(40, 155, 50, 50, 6);
    human(55, 175, 20, 20);

    tags(
      165,
      250,
      () => {
        if (cur[2] > 0) cur[2]--;
        else cur[2] = hat.length - 1;
      },
      0
    );

    tags(
      340,
      250,
      () => {
        if (cur[2] < hat.length - 1) cur[2]++;
        else cur[2] = 0;
      },
      1
    );

    tags(
      180,
      170,
      () => {
        if (cur[0] > 0) cur[0]--;
        else cur[0] = skin.length - 1;
      },
      0
    );

    tags(
      320,
      170,
      () => {
        if (cur[0] < skin.length - 1) cur[0]++;
        else cur[0] = 0;
      },
      1
    );

    tags(
      180,
      210,
      () => {
        if (cur[1] > 0) cur[1]--;
        else cur[1] = mask.length - 1;
      },
      0
    );

    tags(
      320,
      210,
      () => {
        if (cur[1] < mask.length - 1) cur[1]++;
        else cur[1] = 0;
      },
      1
    );

    tags(
      210,
      290,
      () => {
        if (pSpeed > 1.4) pSpeed -= 0.1;
      },
      0
    );

    tags(
      290,
      290,
      () => {
        if (pSpeed < 2.2) pSpeed += 0.1;
      },
      1
    );

    fill(0);
    text("Delag:     | Mobile:", 170, 330);
    strokeBtn(150, 330, 40, "txt", delag ? "on" : "off", 20, () => {
      frameRate(10);
      delag = !delag;
      mouseIsPressed = false;
    });
    strokeBtn(305, 330, 40, "txt", mob ? "on" : "off", 20, () => {
      frameRate(10);
      mob = !mob;
      mouseIsPressed = false;
    });

    for (var i = 1; i < cur.length; i++) {
      fill(255, 0, 0);
      if (cur[i] == 0) text("*", 160, 165 + i * 40);
      if (pSpeed.toFixed(1) == 1.8) text("*", 160, 285);
    }

    textSize(16);
    text("*: default           (CC:Charles Calvin)", 200, 370);
    strokeBtn(365, 35, 15, "txt", "×", 20, () => (setting = false));
  }

  function storyline() {
    textAlign(CENTER, CENTER);
    background(250, 175, 175);
    textSize(30);
    fill(255, 0, 0);
    movTxt("STORY", 200, 50, 30);
    if (delag) tTime = 270;
    else {
      if (
        tTime <= 25 ||
        (tTime >= 26 && tTime <= 82) ||
        (tTime >= 83 && tTime <= 106) ||
        (tTime >= 107 && tTime <= 157) ||
        (tTime >= 158 && tTime <= 198) ||
        (tTime >= 199 && tTime <= 253) ||
        (tTime >= 254 && tTime <= 269)
      ) {
        tTime += 0.3;
      } else if (tTime <= 270) {
        tTime += 0.04;
      }
      nostrokeBtn(50, 370, 80, "Skip", () => (tTime = 270), 30);
    }
    textSize(20);
    fill(0);
    text(
      "In an alternate universe, the\nCoronavirus started IN 2020 and it\nis MUCH STRONGER. It has killed\nMILLIONS. The infected (covics) are\ncontrolled by the virus. They walk\naround, infecting more people. There\nis a house that doesn't seem to\nhave any covics. Get there now!!".substring(
        tTime,
        0
      ),
      200,
      200
    );
  }

  function advance() {
    textAlign(CENTER, CENTER);
    background(250, 175, 175);
    textSize(24);
    fill(255, 0, 0);
    text("Your advancements:", 200, 20);
    // textAlign(LEFT, BASELINE);
    // textSize(19);
    // fill(255);

    textAlign(CENTER, CENTER);
    textSize(27);
    fill(220, 0, 0);
    text("(More advancements coming…)", 200, 260);
  }

  function game() {
    background(186, 186, 186);
    if (y < 2150 && life > 0 && stopgame != true) y += pSpeed;
    else {
      if (life > 0 && y >= 2100) {
        win = true;
        if (x > 190) x -= 3.5;
        if (x < 190) x += 3.5;

        textSize(24);
        fill(255, 0, 0);
        textAlign(CENTER);
        text("YOU ESCAPED FROM THE COVIC!!!", 200, 64);
        textSize(20);
        text(
          "You can't catch me covics :P\n" +
            "Score:" +
            floor(score) +
            " | Best:" +
            bestscore,
          200,
          130
        );
        textSize(15);

        nostrokeBtn(
          200,
          200,
          50 * 4,
          "Try again?",
          () => {
            scene = "game";
            life = 1;
            x = 200;
            y = -900;
            score = 0;
            win = false;
          },
          30
        );
      }
    }

    level1();
    level2();
    level3();

    // if (fps < 55) {
    //   noStroke();
    //   fill(255, 0, 0);
    //   textSize(15);
    //   text("Fps is a bit low!", 200, 20);
    // }

    strokeBtn(
      355,
      15,
      30,
      "f",
      "none",
      12,
      () => (stopgame = true),
      () => {
        fill(220, 0, 0);
        noStroke();
        rect(355 - 5, 14, 5, 20);
        rect(355 + 5, 14, 5, 20);
      }
    );

    strokeBtn(385, 15, 30, "txt", "ME\nNU", 12, () => {
      scene = "menu";
      x = 200;
      y = -900;
      score = 0;
      stopgame = false;
    });

    textAlign(CENTER);
    fill(255, 0, 0);
    rect(0, 383, 72, 17);
    textSize(15);
    fill(255);
    text("Score:" + floor(score), 36, 393);

    //The text messages
    fill(255, 0, 0);
    textSize(23);
    text("LEVEL 1: EASY PEASY", 200, y + 802);
    text("LEVEL 2: NAH, IT'S STILL EASY", 200, y - 132);
    text("LEVEL 3: CAN YOU EVEN\nBEAT THIS LEVEL?", 200, y - 833);
    if ((y >= 450 && y <= 455) || (y >= 1100 && y <= 1105)) {
      score = floor(score);
    }
    fill(255, 0, 0);
    if (y > -1020 && y < -650) {
      textSize(45);
      text("Get ready!", 200, 150);
    }

    //The house
    House(140, y - 1900);

    //Player
    rectMode(CORNER);
    human(x, 291, 20, 20);

    // These make the player moves
    if (stopgame != true && !mob) {
      if ((keys[37] || keys[65]) && x >= 20) x -= pSpeed * 1.6;
      if ((keys[39] || keys[68]) && x <= 380) x += pSpeed * 1.6;
    }

    // For DYING!!!
    if (life <= 0) {
      noStroke();
      textSize(30);
      y = 1800;
      background(27, 189, 27);
      fill(255, 0, 0);
      text("You got the virus!", 200, 105);
      textSize(20);
      text("You've been cough (caught)\nby the covics XD", 200, 150);
      textSize(15);
      fill(0);
      text("You got: " + floor(score) + " | Best: " + bestscore, 200, 200);
      nostrokeBtn(
        200,
        275,
        200,
        "Try again?",
        () => {
          scene = "game";
          life = 1;
          x = 200;
          y = -900;
          score = 0;
        },
        30
      );

      nostrokeBtn(
        200,
        335,
        100,
        "Menu",
        () => {
          scene = "menu";
          life = 1;
          x = 200;
          y = -900;
          score = 0;
        },
        30
      );
    }

    if ((win || life <= 0) && bestscore < floor(score))
      bestscore = floor(score);

    textAlign(CENTER, CENTER);
    textSize(20);
    fill(0);

    if (mob && life > 0 && stopgame == false) {
      fill(0, 50);
      if (mouseIsPressed) {
        if (mouseX > 25 && mouseX < 75 && mouseY > 325 && mouseY < 375) {
          fill(0, 100);
          x -= pSpeed * 1.6;
        }
      }
      ellipse(50, 350, 50, 50);

      fill(0, 50);
      if (mouseIsPressed) {
        if (mouseX > 325 && mouseX < 375 && mouseY > 325 && mouseY < 375) {
          fill(0, 100);
          x += pSpeed * 1.6;
        }
      }
      ellipse(350, 350, 50, 50);
      textSize(39);
      fill(0);
      text("<             >", 200, 350);
    }

    if (stopgame && win != true) {
      fill(0, 180);
      rect(0, 0, 400, 400);
      fill(255, 0, 0);
      textSize(60);
      text("PAUSED", 200, 130);
      nostrokeBtn(200, 300, 25 * 4, "GO!!", () => (stopgame = false), 50);
    }
  }

  frameRate(100);
  if (scene == "menu") start();
  else if (scene == "game") game();
  else if (scene == "tuto" || scene == "story") {
    if (scene == "tuto") howto();
    if (scene == "story") storyline();

    nostrokeBtn(
      330,
      371,
      100,
      "Back",
      () => {
        scene = "menu";
        tTime = 0;
      },
      30
    );
  } else {
    background(220);
    textAlign(CENTER, CENTER);
    fill(0);
    textSize(30);
    text("SOMETHING WENT WRONG.\nPLZ REPORT TO DQG.", 200, 200);
  }

  //text(mouseX + ", " + mouseY, 20, 20);
  // if (
  //   mouseIsPressed &&
  //   mouseX > 200 &&
  //   mouseX < 240 &&
  //   mouseY > 85 &&
  //   mouseY < 105
  // ) {
  //   setting = true;
  // }

  if (setting) settings();

  noStroke();
  fill(0);
  textSize(16);

  text("FPS:" + fps.toFixed(1), 360, 390);
};

var keys = [];
keyPressed = () => (keys[keyCode] = true);
keyReleased = () => (keys[keyCode] = false);
