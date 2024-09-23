function setup() {
  createCanvas(400, 400);
  a = random(1, 400);
  b = random(1, 400);
  c = random(1, 400);
  d = random(1, 400);
  e = random(1, 400);
  f = random(1, 400);
  g = random(1, 400);
  h = random(1, 400);
}

//All of the coding
{
  var life = 1;
  var score = 0;
  var bestscore = 0;
  var fst_time = true;
  var win = false;
  var bonustime = 0;
  var x = 190;
  var y = -900;
  var a, b, c, d, e, f, g, h;
  // var movingCovic = [a, b, c, d, e, f, g, h];
  var speedA = 2;
  var speedB = -2;
  var speedC = 2;
  var speedD = -2;
  var speedE = 2;
  var speedF = -2;
  var speedG = 2;
  var speedH = -2;
  // var speed = [speedA, speedB, speedC, speedD, speedE, speedF, speedG, speedH];
  var stopgame = false;
  var herp = 0;
  var startgame = true;
  var gameplay = false;
  var tuto = false;
  var story = false;
  var advs = false;
  var playerspeed = 1.8; //Default speed is 1.8

  var frames, sec, fps;

  var nostrokeButton = function(x, y, w, txt, func, txtSze) {
    textFont("Consolas");
    textAlign(CENTER, CENTER);
    textSize(txtSze);
    if (mouseX > x - w / 2 && mouseX < x + w / 2 && mouseY > y - 25 && mouseY < y + 25) {
      textSize(txtSze * 1.3);
      if (mouseIsPressed) {
        func();
      }
    }
    fill(255, 255, 255);
    text(txt, x, y);
    textAlign(LEFT, BASELINE);
  }; //Button (like the startscreen's buttons)

  var strokeButton = function(x, y, wNh, beOrNot, txt, txtSze, img, func, doF) {
    noFill();
    stroke(0);
    rect(x, y, wNh, wNh, wNh / 10);
    if (beOrNot === "txt") {
      fill(0);
      textSize(txtSze);
      text(txt, x + 2, y + wNh / 2 - 3);
    }
    if (beOrNot === "img") {
      fill(0);
      imageMode(CENTER);
      image(img, x + wNh / 2, y + wNh / 2, wNh - wNh / 10, wNh - wNh / 10);
      imageMode(CORNER);
    }
    if (beOrNot === "f") {
      doF();
    }

    if (mouseX > x && mouseX < x + wNh && mouseY > y && mouseY < y + wNh) {
      cursor(HAND);
      if (mouseIsPressed) {
        func();
      }
    } else {
      cursor(AUTO);
    }
    noStroke();
  };

  var House = function(X, Y) { //X = 140, Y = y - 2600
    fill(255, 102, 102);
    triangle(X, Y, 260, Y, 200, Y - 25);
    fill(255, 255, 255);
    stroke(0, 0, 0);
    rect(X + 10, Y, 100, 100);
  }; //Draw the house

  var human = function(X) {
    //The face
    fill(224, 224, 119);
    noStroke();
    rect(X, 291, 20, 20, 5);
    fill(0, 0, 0);
    ellipse(X + 5, 297, 2, 2);
    ellipse(X + 15, 297, 2, 2);
    stroke(0, 0, 0);
    line(X + 10, 300, X + 11, 297);
    fill(0);
    rect(X, 289, 20, 5, 6, 5, 0, 0);
    strokeWeight(2);
    line(X - 10, 293, X, 293);
    strokeWeight(1);

    //The mask
    noStroke();
    fill(255, 255, 255);
    rect(X + 4, 300, 12, 9);
    rect(X, 301, 4, 2);
    rect(X, 307, 4, 2);
    rect(X + 16, 301, 4, 2);
    rect(X + 16, 307, 4, 2);
  }; //Draw the player

  var txtSze = 20;
  draw = function() {
    var frames = frameCount;
    var sec = millis();
    if (sec > 0) {
      fps = (frames / sec) * 1000;
    }

    textAlign(LEFT, BASELINE);

    //Draw the virus and other stuffs
    {
      var Virus = function(X, Y) {
        this.X = X;
        this.Y = Y;
      };

      var virus = new Virus();

      Virus.prototype.drawEach = function(xx, yy, size, yes_or_no) {
        fill(0);
        rect(this.X - size, this.Y, size, size);
        rect(this.X + size, this.Y, size, size);
        rect(this.X, this.Y - size, size, size);
        rect(this.X, this.Y + size, size, size);
        fill(27, 189, 27);
        rect(this.X, this.Y, size, size);
        if (x + size + 12 >= this.X - size && x <= this.X + size * 2) {
          if (this.Y + size * 2 >= 291 && this.Y - size <= 311) {
            life--;
          }
        }
        if (sec > 100) {
          fill(27, 189, 27, 155);
          ellipse(this.X + size / 2, this.Y + size / 2, size * (4 - 1 / 3), size * (4 - 1 / 3));
        }
        if (yes_or_no === true) {
          if ((x < this.X || x > this.X + size * 2) && this.Y + size * 2 >= 291 && this.Y - size <= 311) {
            score += (playerspeed * 3 / 2) / 60;
          }
        } else if (yes_or_no === "mid") {
          if ((x < this.X || x > this.X + size * 2) && this.Y + size * 2 >= 291 && this.Y - size <= 311) {
            score += playerspeed / 430;
          }
        } else if (yes_or_no === "BIG") {
          if ((x < this.X || x > this.X + size * 2) && this.Y + size * 2 >= 291 && this.Y - size <= 311) {
            score += playerspeed / 1000;
          }
        }
      };

      Virus.prototype.drawLine = function(x, addon, y) {
        for (var loop = x; loop < x + addon; loop += 37.6) {
          virus = new Virus(loop, y);
          virus.drawEach(loop, y, 8, "mid");
        }
      };

      Virus.prototype.draw = function(xPlus, yPlus, loopTrans, loopTransY, loop, loopY, space) {
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

    var level1 = function() {
      virus.draw(8, 760, 187, y + 700, 8, y + 672, 168);
      virus.draw(8, 627, 273, y + 575, 8, y + 539, 264);
      virus.draw(215, 424, 400, y + 368, 216, y + 336, 169);
      virus.draw(169, 307, 394, y + 260, 169, y + 219, 218);
      virus.draw(8, 137, 176, y + 87, 8, y + 48, 144);
      virus.draw(360, 137, 394, y + 87, 360, y + 49, 325);
      virus.draw(240, -8, 393, y + -58, 240, y + -96, 315);
      virus.draw(8, -8, 99, y + -58, 8, y + -96, 72);
    }; //This is level 1
    var level2 = function() {
      virus = new Virus(a, y - 200);
      virus.drawEach(a, y - 200, 8, true);

      virus = new Virus(b, y - 280);
      virus.drawEach(b, y - 280, 8, true);

      virus = new Virus(c, y - 360);
      virus.drawEach(c, y - 360, 8, true);

      virus = new Virus(d, y - 440);
      virus.drawEach(d, y - 440, 8, true);

      virus = new Virus(e, y - 520);
      virus.drawEach(e, y - 520, 8, true);

      virus = new Virus(f, y - 600);
      virus.drawEach(f, y - 600, 8, true);

      virus = new Virus(g, y - 680);
      virus.drawEach(g, y - 680, 8, true);

      virus = new Virus(h, y - 760);
      virus.drawEach(h, y - 760, 8, true);
    }; //This is level 2
    var level3 = function() {
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

    function start() {
      background(0, 176, 15);
      fill(0, 0, 0);
      textSize(62);
      textFont("Consolas");
      textAlign(CENTER);
      var word = "Covid-20";
      fill(0);
      herp += 1;
      textAlign(CENTER, CENTER);
      textSize((sin(herp / 5) * 3 + 40) + 20 / 2);
      text(word, 200, 60);
      noStroke();
      textSize(20);
      var drawTheVirus;
      drawTheVirus = new Virus(87, 175);
      drawTheVirus.drawEach(132, 71, 19);
      drawTheVirus = new Virus(50, 283);
      drawTheVirus.drawEach(132, 71, 19);
      drawTheVirus = new Virus(306, 134);
      drawTheVirus.drawEach(132, 71, 19);
      drawTheVirus = new Virus(316, 307);
      drawTheVirus.drawEach(132, 71, 19);

      textSize(25);
      fill(0);
      text("by DQG", 200, 97);

      nostrokeButton(200, 165, 25 * 4, "Play", function() {
        gameplay = true;
        startgame = false;
      }, 50);

      nostrokeButton(200, 225, 25 * 4, "Story", function() {
        story = true;
        startgame = false;
      }, 50);

      nostrokeButton(200, 285, 25 * 4, "How", function() {
        tuto = true;
        startgame = false;
      }, 50);

      nostrokeButton(75, 390, 30 * 4, "Advancements…", function() {
        advs = true;
        startgame = false;
      }, 15);
    }

    function howto() {
      textAlign(LEFT, BASELINE);
      background(250, 175, 175);
      textSize(24);
      fill(255, 0, 0);
      text("How to play Covid-20? Well…", 12, 20);
      textSize(20);
      fill(255, 255, 255);
      text("  1.Use your left and right arrows\n(on the keyboard of course :P)\n  2.Dodge those covid-infected\npeople(aka covics)\n  3.Reach the house safely (after\ncompleting all levels)\n  4.Wear a mask… no really, wear\nit if you go outside!", 5, 61);
      text("Be safe both in game & out game!! :)", 5, 329);
      textAlign(CENTER, CENTER);
    }

    function storyline() {
      textAlign(CENTER, CENTER);
      background(250, 175, 175);
      textSize(24);
      fill(255, 0, 0);
      text("The story about Covid-20", 200, 20);
      textSize(18);
      fill(255, 255, 255);
      text("In an alternative universe, the\nCoronavirus started in 2020 and it is\nMUCH STRONGER. It killed millions and\nmillions of people. Everyone who is\ninfected - including dead or alive - is\ncontrolled by the virus. We call them\ncovics (covid victims) :). The covics\nwalk around to find people to infect\nothers. You know that there is a\nsafe house that doesn't seem to have\nany covics. Get there now!! ", 200, 190);
    }

    function advance() {
      textAlign(CENTER, CENTER);
      background(250, 175, 175);
      textSize(24);
      fill(255, 0, 0);
      text("Your advancements:", 200, 20);
      textAlign(LEFT, BASELINE);
      textSize(19);
      fill(255, 255, 255);
      text("  Score:" + floor(score) + "\n  Bestscore:" + bestscore, 5, 60);
      text("Best level:", 15, 120);
      if (bestscore >= 0 && bestscore <= 6) {
        text("1", 130, 120);
        text("Can you reach level 2??? :D", 15, 149);
      }
      if (bestscore > 6 && bestscore <= 14) {
        text("2", 130, 120);
        text("Can you reach level 3??? :D", 15, 149);
      }
      if (bestscore > 14 && bestscore <= 22) {
        text("3", 130, 120);
        text("Great job… but have you finished the\ngame?? There will be more to achieve\nwhen I update this game!!", 5, 149);
      }
      if (bestscore >= 24) {
        text("Wait, that's illegal...", 15, 120);
        text("Nice!! Youve finished the game!! There\nwill be more to achieve when I update\nthis game!! Thanks for playing!", 15, 149);
      }

      textAlign(CENTER, CENTER);
      textSize(27);
      fill(220, 0, 0);
      text("(More advancements coming…)", 200, 260);
    }

    function game() {
      background(186, 186, 186);
      if (y < 2150 && life > 0 && stopgame != true) {
        y += playerspeed;
      } else {
        y += 0;
        if (life > 0 && y >= 2100) {
          win = true;
          if (x > 190) {
            x -= 3.5;
          }
          if (x < 190) {
            x += 3.5;
          }
          textSize(25);
          fill(255, 0, 0);
          textAlign(CENTER);
          text("YOU ESCAPED FROM THE COVIC!!!", 200, 64);
          textSize(20);
          text("You can't catch me covics :P\n" + "Your total score:" + floor(score) + "\nYour bestscore:" + bestscore, 200, 84);
          textSize(15);
          text("Bonuses(for completing the game):+2", 200, 154);
          bonustime += 1;
          if (bonustime <= 1) {
            score += 2;
          }

          nostrokeButton(200, 200, 50 * 4, "Try again?", function() {
            gameplay = true;
            life = 1;
            x = 200;
            y = -900;
            score = 0;
            win = false;
            bonustime = 0;
          }, 30);
        }
      }

      // //Level 1
      level1();

      // // Level 2
      {
        level2();

        //Da Running virus #1 :)
        if (a > 382) {
          speedA = -2;
        }
        if (a < 8) {
          speedA = 2;
        }
        a = a + speedA;

        //Da Running virus #2
        if (b > 382) {
          speedB = -2;
        }
        if (b < 8) {
          speedB = 2;
        }
        b = b + speedB;

        //Da Running virus #3
        if (c > 382) {
          speedC = -2;
        }
        if (c < 8) {
          speedC = 2;
        }
        c = c + speedC;

        //Da Running virus #4
        if (d > 382) {
          speedD = -2;
        }
        if (d < 8) {
          speedD = 2;
        }
        d = d + speedD;

        //Da Running virus #5
        if (e > 382) {
          speedE = -2;
        }
        if (e < 8) {
          speedE = 2;
        }
        e = e + speedE;

        //Da Running virus #6
        if (f > 382) {
          speedF = -2;
        }
        if (f < 8) {
          speedF = 2;
        }
        f = f + speedF;

        //Da Running virus #7
        if (g > 382) {
          speedG = -2;
        }
        if (g < 8) {
          speedG = 2;
        }
        g = g + speedG;

        //Da Running virus #8
        if (h > 382) {
          speedH = -2;
        }
        if (h < 8) {
          speedH = 2;
        }
        h = h + speedH;
      }

      // //Level 3
      level3();

      strokeButton(335, 0, 30, "f", "none", 12, 0, function() {
        stopgame = true;
      }, function() {
        fill(220, 0, 0);
        noStroke();
        // triangle(307.5, 4, 322.5, 15, 307.5, 26);
        rect(307.5 + 35, 4, 5, 20);
        rect(317.5 + 35, 4, 5, 20);
      });

      strokeButton(365, 0, 30, "txt", " ME\n NU", 12, 0, function() {
        startgame = true;
        gameplay = false;
        x = 200;
        y = -900;
        cursor(AUTO);
      });

      textFont("Consolas");
      textAlign(CENTER);
      fill(255, 0, 0);
      rect(0, 383, 72, 17);
      textSize(15);
      fill(255, 255, 255);
      text("Score:" + floor(score), 36, 397);

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
      human(x);

      // These make the player moves
      if (stopgame != true) {
        if (keyIsPressed && keyCode === 37 && x >= 20) {
          x += -3;
        }
        if (keyIsPressed && keyCode === 39 && x <= 380) {
          x += 3;
        }
      }

      // For DYING!!! 
      if (life <= 0) {
        textSize(30);
        y = 1800;
        background(27, 189, 27);
        fill(255, 0, 0);
        text("You've got the virus!", 200, 135);
        textSize(16);
        text("You've been cough(t) (caught)\nby the covics XD\nYou've got: " + floor(score) + " points\nBest by now: " + bestscore, 200, 171);
        nostrokeButton(200, 275, 50 * 4, "Try again?", function() {
          gameplay = true;
          life = 1;
          x = 200;
          y = -900;
          score = 0;
        }, 30);
        
        nostrokeButton(200, 320, 50 * 4, "Menu", function() {
          gameplay = false;
          startgame = true;
          life = 1;
          x = 200;
          y = -900;
          score = 0;
        }, 30);
      }

      if (win === true || life <= 0) {
        if (fst_time === true) {
          bestscore = floor(score);
          fst_time = false;
        } else {
          if (bestscore < floor(score)) {
            bestscore = floor(score);
          } else {
            bestscore = bestscore;
          }
        }
      }

      textAlign(CENTER, CENTER);
      textSize(20);
      fill(0);

      if (stopgame === true && win != true) {
        fill(0, 180);
        rect(0, 0, 400, 400);
        fill(255);
        textSize(60);
        text("PAUSED", 200, 130);
        nostrokeButton(200, 300, 25 * 4, "GO!!", function() {
          stopgame = false;
        }, 50);
      }
      textAlign(LEFT, BASELINE);
    }

    if (startgame === true) {
      start();
    }
    if (gameplay === true) {
      game();
    }
    if (tuto === true || story === true || advs === true) {
      if (tuto === true) {
        howto();
      }
      if (story === true) {
        storyline();
      }
      if (advs === true) {
        advance();
      }
      nostrokeButton(330, 371, 25 * 4, "Back", function() {
        tuto = false;
        story = false;
        advs = false;
        startgame = true;
      }, 30);
    }

    textAlign(LEFT, CENTER);
    fill(0);
    textSize(16);
    if (round(fps, 1) != round(fps)) {
      text("FPS:" + round(fps, 1), 320, 389);
    }
    if (round(fps, 1) == round(fps)) {
      text("FPS:" + round(fps, 1) + ".0", 320, 389);
    }
    textAlign(LEFT, BASELINE);
  };
}

//Just comments
{
  //       virus = new Virus(8, y - 910);
  //       virus.drawLine(164, y - 910);

  //       virus = new Virus(264, y - 910);
  //       virus.drawLine(164);

  //       virus = new Virus(8, y - 1000);
  //       virus.drawLine(264);

  //       virus = new Virus(344, y - 1000);
  //       virus.drawLine(164);

  //       virus = new Virus(304, y - 1090);
  //       virus.drawLine(164);

  //       virus = new Virus(8, y - 1090);
  //       virus.drawLine(219);

  //       virus = new Virus(8, y - 1180);
  //       virus.drawLine(264);

  //       virus = new Virus(344, y - 1180);
  //       virus.drawLine(164);

  //       virus = new Virus(8, y - 1270);
  //       virus.drawLine(164);

  //       virus = new Virus(264, y - 1270);
  //       virus.drawLine(164);

  //       virus = new Virus(8, y - 1360);
  //       virus.drawLine(91);

  //       virus = new Virus(188, y - 1360);
  //       virus.drawLine(206);

  //       virus = new Virus(304, y - 1450);
  //       virus.drawLine(93);

  //       virus = new Virus(26, y - 1450);
  //       virus.drawLine(190);

  //       virus = new Virus(26, y - 1540);
  //       virus.drawLine(313);

  // // 'Points function' :)
  // if (x > 193 && x < 229 && y > 1671.2 && y < 1673) {score ++;}
  // if (x > 274 && x < 313 && y > 1751.2 && y < 1753) {score ++;}
  // if (x > 233 && x < 269 && y > 1823.2 && y < 1825) {score ++;}
  // if (x > 273 && x < 309 && y > 1895.2 && y < 1897) {score ++;}
  // if (x > 193 && x < 229 && y > 1991.2 && y < 1993) {score ++;}
  // if (x > 113 && x < 149 && y > 2071.2 && y < 2073) {score ++;}
  // if (x > 233 && x < 269 && y > 2175.2 && y < 2177) {score ++;}
  // if (x > 353 && y < 2271.2 && y > 2273) {score ++;}

  // // You've got mail!! Oops, I meant: You've got points!!
  // if (x < 232 && y > 678.2 && y < 680|| x > 272 && x < 400 && y > 678.2 && y < 680) {score ++;}
  // if (x < 38 && y > 792.2 && y < 794 || x > 78 && x < 400 && y > 792.2 && y < 794) {score ++;}
  // if (x < 175 && y > 897.2 && y < 899 || x > 215 && x < 400 && y > 897.2 && y < 899) {score ++;}
  // if (x < 42 && y > 1015.2 && y < 1017 || x > 82 && x < 400 && y > 1015.2 && y < 1017) {score ++;}
  // if (x < 170 && y > 1115.2 && y < 1117||x > 210 && x < 400 && y > 1115.2 && y < 1117) {score ++;}
  // if (x < 294 && y > 1245.2 && y < 1247||x > 334 && x < 400 && y > 1245.2 && y < 1247) {score ++;}
  // if (x < 205 && y > 1370.2 && y < 1372||x > 245 && x < 400 && y > 1370.2 && y < 1372) {score ++;}
  // if (x < 333 && y > 1475.2 && y < 1477||x > 373 && x < 400 && y > 1475.2 && y < 1477) {score ++;}

  // text ("You've got " + score + " points", 200, 193);
  // text ("Score Code: " + score * 270407, 200, 211);
  // text ("Respawn?? Press Restart!", 200, 300);

  // for (var loop = 0; loop < movingCovic.length; loop++) {
  //     if (movingCovic[loop] > 382) {speed[loop] = -2;}
  //     if (movingCovic[loop] < 8) {speed[loop] = 2;}
  //     movingCovic[loop] += speed[loop];
  // }

  //   var virus = new Virus(200, y + 760, 225);
  //   virus.draw(8, 760, 187, y + 712, 8, y + 660, 176);
  //   virus.draw(8, 627, 273, y + 578, 8, y + 527, 256);
  //   virus.draw(208, 424, 394, y + 380, 208, y + 324, 176);
  //   virus.draw(8, 627, 273, y + 578, 8, y + 527, 256);
  //   virus.draw(176, 307, 394, y + 280, 176, y + 207, 208);
  //   virus.draw(8, 137, 176, y + 87, 8, y + 37, 160);
  //   virus.draw(352, 137, 394, y + 87, 352, y + 37, 325);
  //   virus.draw(240, -8, 393, y + -57, 240, y + -108, 326);
  //   virus.draw(8, -8, 99, y + -58, 8, y + -108, 80);

  //   textSize(50);
  //   if (mouseX > 140 && mouseX < 250 && mouseY > 140 && mouseY < 180) {
  //     textSize(65);
  //     if (mouseIsPressed) {
  //       gameplay = true;
  //       startgame = false;
  //     }
  //   }
  //   fill(255);
  //   text("Play", 200, 160);

  //   textSize(50);
  //   if (mouseX > 130 && mouseX < 265 && mouseY > 240 && mouseY < 280) {
  //     textSize(65);
  //     if (mouseIsPressed) {
  //       println("I don't have time to do this, so you can read it here: https://www.khanacademy.org/computer-programming/Covid-20-the-game-poster/6512731779383296\n----------------------------------------------------------------------------------------------------------------");
  //     }
  //   }
  //   fill(255);
  //   text("Story", 200, 260);

  //       virus = new Virus(8, y - 853);
  //       virus.drawLine(8, 200);
  //       fill(0);
  //       text("this is y - 1000", 20, y - 883);

  //       virus = new Virus(264, y - 883);
  //       virus.drawLine(264, 164, y - 883);

  //       virus = new Virus(8, y - 1000);
  //       virus.drawLine(264);

  //       virus = new Virus(344, y - 1000);
  //       virus.drawLine(164);

  //       virus = new Virus(304, y - 1090);
  //       virus.drawLine(164);

  //       virus = new Virus(8, y - 1090);
  //       virus.drawLine(219);

  //       virus = new Virus(8, y - 1180);
  //       virus.drawLine(264);

  //       virus = new Virus(344, y - 1180);
  //       virus.drawLine(164);

  //       virus = new Virus(8, y - 1270);
  //       virus.drawLine(164);

  //       virus = new Virus(264, y - 1270);
  //       virus.drawLine(164);

  //       virus = new Virus(8, y - 1360);
  //       virus.drawLine(91);

  //       virus = new Virus(188, y - 1360);
  //       virus.drawLine(206);

  //       virus = new Virus(304, y - 1450);
  //       virus.drawLine(93);

  //       virus = new Virus(26, y - 1450);
  //       virus.drawLine(190);

  //       virus = new Virus(26, y - 1540);
  //       virus.drawLine(313);

  // var constr = constrain(x, 0, 380);
}