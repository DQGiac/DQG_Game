var scene = "menu"; // Include: "play", "cred", "how"
var heart = 1, sec = 1 / 60;
var totalPieces = 30;
var shop = false;
var Moneytobuy = 0;
var items = ["  -Heart", "  -Potion", "  -Dice", "  -Heart", "   -Ticket", "  -XRay"];
var buyitems = false;
var buy = ["heart", "potion", "dice", "heart2", "ticket", "xr"];
buy[0] = buy[1] = buy[2] = buy[3] = buy[4] = buy[5] = false;
var money = [40, 100, 20, 30, 50, 80], salary = [40, 25, 15, 10, 3];
var al = 255;
var besttime = 0;
var manager, xray, rollingtime, salarytime, buyingtime, xraytime, pausing, lose, win, grid, cols, rows, time, fstclkaf;
var mines, hearts, potions, dices, whearts, tickets, timer, xRay, buythis;
//🏬 💳 🎲 🔴 😎 ⚡️ 💵 💗 🎮
function make2DArray(cols, rows) {
  var arr = new Array(cols);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

function preload() {
  mines = loadImage("Images/Mines.png");
  hearts = loadImage("Images/Heart.png");
  potions = loadImage("Images/Potion.png");
  dices = loadImage("Images/Dice.png");
  whearts = loadImage("Images/Heart (White).png");
  tickets = loadImage("Images/Ticket.png")
  timer = loadImage("Images/Timer.png");
  xRay = loadImage("Images/X Ray Glasses.png");
  buythis = loadImage("Images/Shop.png");
}

function setup() {
  createCanvas(500, 450);
  cols = rows = 20;
}

//Setboard (for losing and winning)
function setBoard() {
  manager = false;
  xray = false;
  xraytime = 0;
  buyingtime = 0;
  rollingtime = 0;
  salarytime = 0;
  time = 0;
  lose = false;
  win = false;
  unsweepedSpace = cols * rows;
  grid = make2DArray(cols, rows);
  pausing = false;
  fstclkaf = true;

  var options = [];
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i, j, 20);
      options.push([i, j]);
    }
  }

  for (var n = 0; n < totalPieces; n++) {
    var index = floor(random(options.length));
    var choice = options[index];
    var i = choice[0];
    var j = choice[1];
    options.splice(index, 1);
    grid[i][j].thing = true;
  }

  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].countTotal();
    }
  }
}

function ThreeDButton(x, y, w, h, t, txtSze, func, txty, bCol, tCol) {
  textAlign(CENTER);
  fill(bCol[0], bCol[1], bCol[2]);
  if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
    stroke(0);
    rect(x, y, w, h, 3);
    noStroke();
    fill(tCol[0], tCol[1], tCol[2]);
    textSize(txtSze);
    text(t, x + w / 2, txty);
    if (mouseIsPressed) {
      func();
    }
  } else {
    stroke(0);
    rect(x, y - 3, w, h, 3);
    fill(bCol[0] - 20, bCol[1] - 20, bCol[2] - 20);
    rect(x, y + h - 4, w, 5, 0, 0, 3, 3);
    noStroke();
    fill(tCol[0], tCol[1], tCol[2]);
    textSize(txtSze);
    text(t, x + w / 2, txty - 3);
  }
}

function TwoDButton(x, y, w, h, txt, txtY, func, size) {
  fill(220);
  stroke(0);
  rect(x, y, w, h, 2);
  fill(0);
  textSize(size);
  text(txt, x + w / 2, txtY);
  if (mouseIsPressed && mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
    func();
  }
}

function shopSlot(y, txt, func) {
  fill(220);
  rect(411, y, 88, 20);
  fill(0);
  text(txt, 455, y + 15);
  if (mouseIsPressed && mouseX > 411 && mouseX < 500 && mouseY > y && mouseY < y + 20) {
    func();
  }
}

function shopBoard(x, y, txt, truebuynum, func) {
  fill(220)
  rect(x, y, 400, 40, 2);
  noFill();
  if (mouseX > x + 385 && mouseX < x + 400 && mouseY > y && mouseY < y + 15) {
    fill(220, 0, 0);
    if (mouseIsPressed) {
      buyitems = false;
    }
  }
  rect(x + 385, y, 15, 15, 0, 0, 0, 2);
  textAlign(LEFT);
  textSize(12);
  fill(0);
  text("×", x + 389, y + 10);

  noFill();
  if (mouseX > x + 355 && mouseX < x + 385 && mouseY > y + 5 && mouseY < y + 35) {
    fill(220, 0, 0);
    stroke(220, 0, 0);
    textAlign(CENTER);
    text("Buy this", x + 370, y - 5);

    text(money[truebuynum] + "$/\nthing", x + 420, y + 15);
    if (Moneytobuy >= money[truebuynum]) {} else {
      textSize(12);
      text("🔒\nLocked", x + 330, y + 15);
    }

    textAlign(LEFT);
    if (mouseIsPressed && mouseX > x + 355 && mouseX < 385 && mouseY > 410 && mouseY < 440 && win === false && lose === false) {
      buyingtime = buyingtime + 1;
      if (buyingtime < 1.1) {
        if (buy[0] != false && Moneytobuy >= money[0] && heart < 3) {
          buy[0] = true;
        }
        if (buy[1] != false && Moneytobuy >= money[1] && sec === 1 / 60) {
          buy[1] = true;
        }
        if (buy[2] != false && Moneytobuy >= money[2]) {
          buy[2] = true;
        }
        if (buy[3] != false && Moneytobuy >= money[3] && heart === 3) {
          buy[3] = true;
        }
        if (buy[4] != false && Moneytobuy >= 100) {
          buy[4] = true;
        }
        if (buy[5] != false && Moneytobuy >= money[5]) {
          buy[5] = true;
        }
      }
      mouseReleased = function() {
        buyingtime = 0;
      }
    }
  }
  stroke(0);
  ellipse(x + 370, y + 20, 30, 30);
  textSize(18);
  fill(0);
  text("🛍️", x + 358, y + 25);
  textSize(12);
  text(txt, x + 1, y + 15);
  textAlign(CENTER);
}

var mili = 0;
var herp = 0;

var num1 = true;

function draw() {
  function game() {
    mili += sec;
    if (mili <= 0.25) {
      setBoard();
    }
    textFont("Courier");
    var unsweepedSpace = cols * rows;
    background(220);
    textAlign(CENTER, BASELINE);

    //Unsweeped Spaces (for winning)
    {
      for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
          if (grid[i][j].revealed && !grid[i][j].thing && !grid[i][j].thing2) {
            unsweepedSpace--;
          }
        }
      }

      if (unsweepedSpace == totalPieces && xray == false) {
        win = true;
      }
    }

    //Shop button
    ThreeDButton(405, 73, 90, 20, "SHOP 🏬", 15, function() {
      shop = true;
    }, 88, [220, 220, 220], [0, 0, 0]);

    //Show board
    for (var i = 0; i < cols; i++) {
      for (var j = 0; j < rows; j++) {
        grid[i][j].show();
      }
    }

    //All shop 
    if (shop === true) {
      fill(220);
      stroke(0);
      rect(410, 120, 90, 270);

      //Items holder && item name
      shopSlot(150, items[0], function() {
        buy[1] = buy[2] = buy[3] = buy[4] = buy[5] = false;
        buy[0] = "mid";
      });
      shopSlot(175, items[1], function() {
        buy[0] = buy[2] = buy[3] = buy[4] = buy[5] = false;
        buy[1] = "mid";
      });
      shopSlot(200, items[2], function() {
        buy[0] = buy[1] = buy[3] = buy[4] = buy[5] = false;
        buy[2] = "mid";
      });
      shopSlot(225, items[3], function() {
        buy[0] = buy[1] = buy[2] = buy[4] = buy[5] = false;
        buy[3] = "mid";
      });
      shopSlot(250, items[4], function() {
        buy[0] = buy[1] = buy[2] = buy[3] = buy[5] = false;
        buy[4] = "mid";
      });
      shopSlot(275, items[5], function() {
        buy[0] = buy[1] = buy[2] = buy[3] = buy[4] = false;
        buy[5] = "mid";
      });

      image(hearts, 420, 152, 16, 16);
      image(potions, 416, 177, 16, 16);
      image(dices, 422, 202, 16, 16);
      image(whearts, 420, 227, 16, 16);
      image(tickets, 414, 252, 22, 16);
      image(xRay, 422, 277, 16, 16);

      //The Exit-shop button
      {
        noFill();
        if (mouseX > 480 && mouseX < 500 && mouseY > 120 && mouseY < 140) {
          fill(220, 0, 0);
          if (mouseIsPressed) {
            shop = false;
          }
        }
        rect(480, 120, 20, 20, 0, 0, 0, 3);
        fill(0);
        textSize(20);
        text("×", 490.5, 135);
      }

      textAlign(CENTER);
      fill(0);
      textSize(14);
      text("SHOP:", 455, 140);
      text("__________\nMORE WILL\nCOME IN\nTHE FUTURE\n¯¯¯¯¯¯¯¯¯¯", 455, 310);

      //Pop-up shop under the board
      {
        if (mouseIsPressed && mouseX > 410 && mouseX < 500 && mouseY > 150 && mouseY < 320) {
          buyitems = true;
        }

        if (buyitems === true) {
          fill(220);
          stroke(0);
          rect(0, 405, 400, 40);
          if (mouseX > 385 && mouseX < 400 && mouseY > 405 && mouseY < 420) {
            fill(220, 0, 0);
            if (mouseIsPressed) {
              buyitems = false;
            }
          }
          rect(385, 405, 15, 15, 0, 0, 0, 2);
          textAlign(LEFT);
          textSize(12);
          fill(0);
          text("×", 389, 415);
          fill(0);
          textSize(12);

          if (buy[0] != false) {
            text(" -A heart: +1 heart to health bar, will save\nyou a live if you click on a mine.", 1, 420);
          }
          if (buy[1] != false) {
            text(" -Flash potion: Decrease the time by 20%", 1, 420);
          }
          if (buy[2] != false) {
            text(" -RollaDice: I'll roll the dice. If the number\n<= 3 -> you win, and stay the same if num > 3", 1, 420);
          }
          if (buy[3] != false) {
            text(" -A spare heart: +0.5 heart to the health bar\n(unlocked when 3 heart was bought)", 1, 420);
          }
          if (buy[4] != false) {
            text(" -Manager ticket: Be a manager in a turn,\ndouble if win, -20 if loses (Needs 100$ to buy)", 1, 420);
          }
          if (buy[5] != false) {
            text(" -XRay Glasses: Reveal the whole board in\n5 seconds", 1, 420);
          }

          if (buy[0] != false || buy[1] != false || buy[2] != false || buy[3] != false || buy[4] != false || buy[5] != false) {
            fill(225);
            if (mouseX > 355 && mouseX < 385 && mouseY > 410 && mouseY < 440) {
              fill(220, 0, 0);
              stroke(220, 0, 0);
              textAlign(CENTER);
              text("Buy this", 370, 400);
              for (var num_obj = 0; num_obj < buy.length; num_obj++) {
                if (buy[num_obj] != false) {
                  text(money[num_obj] + "$/\nthing", 420, 420);
                  if (Moneytobuy >= money[num_obj]) {

                  } else {
                    textSize(12);
                    text("🔒\nLocked", 330, 420);
                  }
                }
              }

              textAlign(LEFT);
              if (mouseIsPressed && mouseX > 355 && mouseX < 385 && mouseY > 410 && mouseY < 440 && win === false && lose === false) {
                buyingtime = buyingtime + 1;
                if (buyingtime < 1.1) {
                  if (buy[0] != false && Moneytobuy >= money[0] && heart < 3) {
                    buy[0] = true;
                  }
                  if (buy[1] != false && Moneytobuy >= money[1] && sec === 1 / 60) {
                    buy[1] = true;
                  }
                  if (buy[2] != false && Moneytobuy >= money[2]) {
                    buy[2] = true;
                  }
                  if (buy[3] != false && Moneytobuy >= money[3] && heart === 3) {
                    buy[3] = true;
                  }
                  if (buy[4] != false && Moneytobuy >= 100) {
                    buy[4] = true;
                  }
                  if (buy[5] != false && Moneytobuy >= money[5]) {
                    buy[5] = true;
                  }
                }
                mouseReleased = function() {
                  buyingtime = 0;
                }
              }
            }
            stroke(0);
            ellipse(370, 425, 30, 30);
            textSize(18);
            fill(0);
            text("🛍️", 358, 430);
          }

          textAlign(LEFT);
          textSize(12);
          fill(0);

          fill(0);
          textSize(12);
          for (var obj_num = 0; obj_num < 6; obj_num++) {
            if (buy[obj_num] === true) {
              if (obj_num === 0 || obj_num === 1 || obj_num === 3 || obj_num === 4 || obj_num === 5) {
                Moneytobuy = Moneytobuy - money[obj_num];
                buy[obj_num] = "mid";
                if (obj_num === 0) {
                  heart = heart + 1;
                }
                if (obj_num === 1) {
                  sec = 13 / 1000;
                }
                if (obj_num === 3) {
                  heart = 3.5;
                }
                if (obj_num === 4) {
                  manager = true;
                }
                if (obj_num === 5) {
                  xray = true;
                }
              }
              if (obj_num === 2) {
                textAlign(CENTER);
                rollingtime = rollingtime + 0.04;
                if (rollingtime < 8) {
                  fill(0);
                  textSize(50);
                  text("Rolling...", 200, 200);
                  textSize(12);
                }
                if (rollingtime >= 8) {
                  Moneytobuy = Moneytobuy - money[2];
                  textSize(20);
                  fill(0);
                  var rannum = random(1, 6);
                  text(rannum, 200, 100);
                  buy[2] = "mid";
                  rollingtime = 0;
                  if (rannum <= 3) {
                    win = true;
                  }
                }
                fill(0);
                textAlign(CENTER);
                text(rollingtime, 200, 20);
              }
            }
          }
        }
      }
    }

    fill(0);
    textAlign(CENTER);

    //Special shop items algorithms
    {
      textSize(15);
      if (manager === false) {
        text("❌", 485, 112);
      }
      if (manager === true) {
        text("✔️", 485, 112);
      }

      if (xraytime < 5) {
        if (xray === true) {
          xraytime += 1 / 60;
          for (var i = 0; i < cols; i++) {
            for (var j = 0; j < rows; j++) {
              grid[i][j].revealed = true;
            }
          }
        }
      } else if (xraytime > 5) {
        for (var i = 0; i < cols; i++) {
          for (var j = 0; j < rows; j++) {
            grid[i][j].revealed = false;
          }
        }
        xray = false;
        xraytime = 0;
      }

      text("Manager", 440, 110);
    }

    stroke(0);
    fill(0);
    textSize(35);

    //Losing and winning
    {
      if (lose === true) {
        fstclkaf = false;
        win = false;
        text("😔You lose. Retry??\nPress <space>", 200, 50);
        if (manager === true) {
          salarytime += 1;
          if (salarytime < 1.1) {
            Moneytobuy -= 20;
          }
        }
        if (keyIsPressed === true && keyCode === 32) {
          setBoard();
          heart = 1;
        }
      }
      if (win === true) {
        fstclkaf = false;
        lose = false;
        text("🏆You win!!\nCongratulation!!\nRetry?Press <space>", 200, 50);
        salarytime = salarytime + 1;
        if (salarytime < 1.1) {
          if (manager === true) {
            salary = [80, 50, 20, 10, 4];
          } else {
            salary = [40, 25, 10, 5, 2];
          }
          if (floor(time) <= 25) {
            Moneytobuy += salary[0];
          }
          if (floor(time) > 25 && floor(time) <= 50) {
            Moneytobuy += salary[1];
          }
          if (floor(time) > 50 && floor(time) <= 75) {
            Moneytobuy += salary[2];
          }
          if (floor(time) > 75 && floor(time) <= 100) {
            Moneytobuy += salary[3];
          }
          if (floor(time) > 100) {
            Moneytobuy += salary[4];
          }
        }

        if (keyIsPressed === true && keyCode === 32) {
          setBoard();
        }
      }
    }

    //First-click and pausing
    {
      mouseClicked = function() {
        if (scene === "play" && fstclkaf === true && mouseX < 400 && mouseY < 400) {
          fstclkaf = false;
        }
      }

      if (fstclkaf == false && scene == "play" && pausing === false && time < 10000 && win === false && lose === false) {
        time += sec;
      }

      TwoDButton(440, 430, 20, 20, "⏸️", 444.5, function() {
        pausing = true;
        al = 255;
      }, 12);
      TwoDButton(462, 430, 35, 20, "Menu", 444.5, function() {
        mouseReleased = function() {
          scene = "menu";
        }
      }, 14.5);
    }

    //Timer + Money
    {
      fill(0);
      textSize(15);
      textAlign(LEFT);
      stroke(0);
      strokeWeight(0.7);
      text("⏱:" + floor(time), 401, 20);
      text("(Low:" + besttime + ")", 400, 40);
      text("💵:" + Moneytobuy, 401, 60);
      if (sec < 1 / 60) {
        textSize(12);
        text("⚡️", 408, 25);
      }
      textSize(15);
      strokeWeight(1);
    }

    //Health bar
    {
      noFill();
      rect(472, 0, 35, 65);
      if (heart == 0.5 || heart == 1.5 || heart == 2.5 || heart == 3.5) {
        fill(220);
        image(hearts, 464, 60, 15, 15);
      }

      var numHeart = function(num) {
        for (var i = 0; i < num; i++) {
          fill(220);
          image(hearts, 477, i * 20 + 3.5, 18, 18);
        }
      }
      numHeart(floor(heart));
    }

    stroke(0);

    if (pausing === true) {
      fstclkaf = true;
      fill(0, 140);
      rect(0, 0, 500, 450);
      if (al > 70) {
        al -= 2;
      } else if (al <= 70) {
        al = 255;
      }
      fill(0, al);
      stroke(0, al);
      textSize(50);
      textAlign(CENTER);
      text("⏸️PAUSING⏸️", 250, 110);
      ThreeDButton(145, 150, 210, 60, "▶️Resume▶️", 30, function() {
        mouseClicked = function() {
          pausing = false;
          fstclkaf = true;
        }
      }, 190, [220, 220, 220], [0, 0, 0]);
    }

    //Highscore
    if (win === true) {
      if (time > besttime && num1 === true) {
        besttime = floor(time);
        num1 = false;
      }
      if (time < besttime && num1 === false) {
        besttime = floor(time);
        num1 = false;
      }
      //text(num1, 20, 400);
    }
  }

  function startscreen() {
    background(41, 97, 143);
    noStroke();
    fill(0, 0, 0);
    textSize(62);
    textFont("Consolas");
    textAlign(CENTER, CENTER);
    var word = "LEGOSWEEPER";
    herp += 1;
    fill(30, 200);
    textSize((sin(herp / 5) * 3 + 40) + 20 / 2 - 2);
    text(word, 250, 63.5);
    fill(255, 0, 0);
    textSize((sin(herp / 5) * 3 + 40) + 20 / 2);
    text(word, 250, 60);
    textSize(25);
    fill(0);
    text("by DQG", 250, 100);
    ThreeDButton(145, 150, 210, 60, "PLAY", 40, function() {
      mouseReleased = function() {
        scene = "play";
      }
    }, 182.5, [0, 200, 0], [255, 0, 0]);
    ThreeDButton(145, 250, 210, 60, "HOW", 40, function() {
      mouseReleased = function() {
        scene = "how";
      }
    }, 282.5, [0, 200, 0], [255, 0, 0]);
    ThreeDButton(145, 350, 210, 60, "CREDIT", 40, function() {
      mouseReleased = function() {
        scene = "cred";
      }
    }, 382.5, [0, 200, 0], [255, 0, 0]);

    textSize(18);
    text("𝗩𝟭.𝟭", 477, 444);
  }

  function cred() {
    background(41, 97, 143);
    fill(0);
    textSize(30);
    text("All created by DQG", 250, 120);
    textSize(20);
    text("If you can make music for games, you can\ncontact me here: abusinessemail27@gmail.com\n(You will be added)", 250, 220);
  }

  function how() {
    background(41, 97, 143);
    fill(0);
    textSize(30);
    text("HOW TO PLAY:", 250, 50);
    textSize(20);
    text("Click on a tile, that tile will either\nbe a normal tile or a mine, and the number on\nthe tile will show how many mines around it\n(include diagonal lines, so the max is 8\n(super rare btw)). Avoid 30 mines, and get to\nthe end! If you die, don't worrry!! Press\n<space> and you'll respawn. You can collect\nsome money by winning and use that money to\nbuy some items that help you to win some\nmore games :). (Better how-to-play coming!)", 250, 210);
  }

  if (scene == "menu") {
    startscreen();
  } else if (scene == "play") {
    game();
  } else if (scene == "cred" || scene == "how") {
    if (scene == "cred") {
      cred();
    } else if (scene == "how") {
      how();
    }

    ThreeDButton(365, 380, 100, 60, "BACK", 40, function() {
      mouseReleased = function() {
        scene = "menu";
      }
    }, 412.5, [0, 200, 0], [255, 0, 0]);
  }
}

function gameOver() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].revealed = true;
      lose = true;
    }
  }
}

function mousePressed() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      if (scene == "play" && grid[i][j].contains(mouseX, mouseY) && win == false && lose == false && pausing == false && xray == false) {
        grid[i][j].reveal();
        if (grid[i][j].thing) {
          heart -= 1;
          grid[i][j].thing = false;
          grid[i][j].thing2 = true;
          if (heart <= 0) {
            gameOver();
          }
        }
      }
    }
  }
}

//Object-oriented..thingy...
{
  function Cell(i, j, w) {
    this.i = i;
    this.j = j;
    this.x = i * w;
    this.y = j * w;
    this.w = w;
    this.neighborCount = 0;
    this.thing = false;
    this.thing2 = false;
    this.revealed = false;
    this.buy = false;
  }

  //Show the grids
  Cell.prototype.show = function() {
    stroke(0);
    noFill();
    rect(this.x, this.y, this.w, this.w);
    if (this.revealed) {
      if (this.thing) {
        fill(127);
        image(mines, this.x + 1, this.y + 1, 18, 18);
      } else if (!this.thing && !this.thing2) {
        fill(200);
        rect(this.x, this.y, this.w, this.w);
        if (this.neighborCount > 0) {
          textAlign(CENTER);
          fill(0);
          text(this.neighborCount, this.x + this.w * 0.5, this.y + this.w - 6);
        }
      } else if (this.thing2) {
        fill(0);
        image(mines, this.x + 1, this.y + 1, 18, 18);
      }
    }
  }

  //Count the surrounding grids
  Cell.prototype.countTotal = function() {
    if (this.thing) {
      this.neighborCount = -1;
      return;
    }
    var total = 0;
    for (var xoff = -1; xoff <= 1; xoff++) {
      var i = this.i + xoff;
      if (i < 0 || i >= cols) continue;

      for (var yoff = -1; yoff <= 1; yoff++) {
        var j = this.j + yoff;
        if (j < 0 || j >= rows) continue;

        var neighbor = grid[i][j];
        if (neighbor.thing) {
          total++;
        }
      }
    }
    this.neighborCount = total;
  }

  //Contains mouseX, mouseY
  Cell.prototype.contains = function(x, y) {
    return (x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w);
  }

  //Reaveal the grids (When mouse is pressed)
  Cell.prototype.reveal = function() {
    this.revealed = true;
    if (this.neighborCount == 0) {
      this.floodFill();
    }
  }

  //Flood fill
  Cell.prototype.floodFill = function() {
    for (var xoff = -1; xoff <= 1; xoff++) {
      var i = this.i + xoff;
      if (i < 0 || i >= cols) continue;

      for (var yoff = -1; yoff <= 1; yoff++) {
        var j = this.j + yoff;
        if (j < 0 || j >= rows) continue;

        var neighbor = grid[i][j];
        if (!neighbor.revealed) {
          neighbor.reveal();
        }
      }
    }
  }
}