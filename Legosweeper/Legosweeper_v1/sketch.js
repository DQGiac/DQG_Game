var heart = 1; //not in setBoard
var sec = 1 / 60; //not in setBoard
var fstclk = true;
var w = 20;
var totalPieces = 30;
var shop = true;
var Moneytobuy = 0; //not in setBoard
var items = ["❤️-Heart", "🧪-Potion", "🎲-Dice", "♡-Heart", "🎟️-Ticket", "👓-XRay"]; //not in setBoard
var buyitems = false;
var buy = ["heart", "potion", "dice", "heart2", "ticket", "xr"];
buy[0] = buy[1] = buy[2] = buy[3] = buy[4] = buy[5] = false;
var money = [50, 120, 20, 40, 60, 80]; //not in setBoard
var salary = [40, 25, 10, 5, 2]; //not in setBoard
var al = 255;
var besttime = 0;
var menu = false;
var manager, xray, rollingtime, salarytime, buyingtime, xraytime, pausing, lose, win, grid, cols, rows, fstclkaf, clicked, time;

//🔒 🏬 💳 🎲 🔴 😎 ⚡️ 💵 💗 🎮

//Make the grid
function make2DArray(cols, rows) {
  var arr = new Array(cols);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

//Setup
function setup() {
  createCanvas(500, 450);
  textSize(20);
  cols = 20;
  rows = (height - 50) / w;
  setBoard();
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
  fstclkaf = false;
  lose = false;
  win = false;
  unsweepedSpace = cols * rows;
  grid = make2DArray(cols, rows);
  pausing = false;
  clicked = false;

  var options = [];
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j] = new Cell(i, j, w);
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

//Draw
function draw() {
  textFont("Courier");
  var unsweepedSpace = cols * rows;
  background(220);
  textSize(12);
  textAlign(CENTER);

  //Unsweeped Spaces (for winning)
  {
    for (var i = 0; i < rows; i++) {
      for (var j = 0; j < cols; j++) {
        if (grid[i][j].revealed && !grid[i][j].thing && !grid[i][j].thing2) {
          unsweepedSpace--;
        }
      }
    }

    if (unsweepedSpace === totalPieces && xray === false) {
      win = true;
    }
  }
  //Unsweeped Spaces (for winning)

  textSize(15);

  //Shop button
  {
    if (mouseIsPressed && mouseX > 405 && mouseX < 495 && mouseY > 70 && mouseY < 90) {
      fill(200);
      stroke(0);
      rect(405, 73, 90, 20);
      fill(0);
      text("SHOP", 450, 88);
      shop = true;
    } else {
      fill(200);
      stroke(0);
      rect(405, 70, 90, 20);
      fill(190);
      rect(405, 89, 90, 4, 1);
      fill(0);
      text("SHOP", 450, 85);
    }
  }
  //Shop button

  //Show board
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].show();
    }
  }
  //Show board

  //All shop 
  if (shop === true) {
    fill(220);
    stroke(0);
    rect(410, 120, 90, 270);

    //Items holder && item name
    for (var a = 150; a < 300; a += 25) {
      rect(411, a, 88, 20);
      var aloop = (a - 150) / 25;
      fill(0);
      text(items[aloop], 455, a + 15);
      noFill();
    }

    fill(220);

    //The Exit-shop button
    {
      if (mouseX > 480 && mouseX < 500 && mouseY > 120 && mouseY < 140) {
        fill(220, 0, 0);
        if (mouseIsPressed) {
          shop = false;
        }
      }
      rect(480, 120, 20, 20, 0, 0, 0, 2);
    }
    //The Exit-shop button

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
        text("x", 389, 415);
        fill(0);
        textSize(12);

        if (mouseIsPressed && mouseX > 410) {
          if (mouseY > 150 && mouseY < 170) {
            buy[1] = buy[2] = buy[3] = buy[4] = buy[5] = false;
            buy[0] = "mid";
          }
          if (mouseY > 175 && mouseY < 195) {
            buy[0] = buy[2] = buy[3] = buy[4] = buy[5] = false;
            buy[1] = "mid";
          }
          if (mouseY > 200 && mouseY < 220) {
            buy[0] = buy[1] = buy[3] = buy[4] = buy[5] = false;
            buy[2] = "mid";
          }
          if (mouseY > 225 && mouseY < 245) {
            buy[0] = buy[1] = buy[2] = buy[4] = buy[5] = false;
            buy[3] = "mid";
          }
          if (mouseY > 250 && mouseY < 270) {
            buy[0] = buy[1] = buy[2] = buy[3] = buy[5] = false;
            buy[4] = "mid";
          }
          if (mouseY > 275 && mouseY < 295) {
            buy[0] = buy[1] = buy[2] = buy[3] = buy[4] = false;
            buy[5] = "mid";
          }
        }

        if (buy[0] != false) {
          text("❤️-A heart: +1 heart to health bar, will save\nyou a live if you click on a mine.", 1, 420);
        }
        if (buy[1] != false) {
          text("🧪-Flash potion: Decrease the time by 20%", 1, 420);
        }
        if (buy[2] != false) {
          text("🎲-RollaDice: I'll roll the dice. If the number\n<= 3 -> you win, and stay the same if num > 3", 1, 420);
        }
        if (buy[3] != false) {
          text("♡-A spare heart: +0.5 heart to the health bar\n(unlocked when 3 heart was bought)", 1, 420);
        }
        if (buy[4] != false) {
          text("🎟️-Manager ticket: Be a manager in a turn,\ndouble if win, -20 if loses (Needs 100$ to buy)", 1, 420);
        }
        if (buy[5] != false) {
          text("👓-XRay Glasses: Reveal the whole board in\n5 seconds", 1, 420);
        }

        if (buy[0] != false || buy[1] != false || buy[2] != false || buy[3] != false || buy[4] != false || buy[5] != false) {
          fill(225);
          stroke(0);
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
      }

      textAlign(LEFT);
      textSize(12);
      fill(0);
      text("x", 487.5, 132.5);
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
    //Pop-up shop under the board
  }
  //All shop
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
  //Special shop items algorithms

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
      noStroke();
      textSize(10);

      if (keyIsPressed === true && keyCode === 32) {
        setBoard();
      }
    }
  }
  //Losing and winning

  //First-click and pausing
  {
    mouseClicked = function() {
      if (mouseX > 145 && mouseX < 355 && mouseY > 138 && mouseY < 198) {
        fstclk = false;
        pausing = false;
        menu = false;
      }
    }

    if (mouseIsPressed && fstclk === false && lose === false && win === false && mouseX < 400 && mouseY < 400) {
      fstclkaf = true;
    }


    if (fstclkaf === true && menu === false && pausing === false && time < 10000) {
      time = time + sec;
    }

    if (mouseX > 440 && mouseX < 460 && mouseY > 430 && mouseY < 450 && pausing != true) {
      cursor(HAND);
      if (mouseIsPressed) {
        pausing = true;
        al = 255;
      }
    } else {
      cursor(AUTO);
    }

    if (mouseIsPressed && mouseX > 465 && mouseX < 500 && mouseY > 430 && mouseY < 450 && menu != true) {
      menu = true;
    }

    fill(220);
    stroke(0);
    strokeWeight(1.5);
    rect(440, 430, 20, 20, 2);
    strokeWeight(1);
    textSize(12);
    text("⏸️", 450, 444.5);
  }
  //First-click and pausing

  //Timer + Money
  {
    fill(0);
    textSize(15);
    textAlign(LEFT);
    stroke(0);
    strokeWeight(0.7);
    text("⏱:" + floor(time), 401, 20);
    text("Hi:" + besttime, 401, 40);
    text("💵:" + Moneytobuy, 401, 60);
    if (sec < 1 / 60) {
      textSize(12);
      text("⚡️", 408, 25);
    }
    textSize(15);
    strokeWeight(1);
  }
  //Timer + Money

  //Health bar
  {
    noFill();
    rect(472, 0, 35, 65);
    if (heart == 1.5 || heart == 2.5 || heart == 3.5) {
      textSize(12);
      fill(220);
      text("❤️", 463, 68);
    }

    var numHeart = function(num) {
      for (var i = 0; i < num; i++) {
        textSize(15);
        fill(220);
        text("❤️", 476, i * 20 + 17.5);
      }
    }

    numHeart(floor(heart));
  }

  textSize(15);
  stroke(0);
  fill(0);

  if (pausing === true) {
    fill(0, 120);
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
    stroke(0);
    fill(220);
    rect(145, 138, 210, 60);
    fill(0);
    textSize(25);
    text("▶️Resume▶️", 250, 177);
  }

  var num1 = true;
  if (win === true) {
    if (time > besttime && num1 === true) {
      besttime = floor(time);
      num1 = false;
    }
    if (time < besttime && num1 === true) {
      besttime = floor(time);
      num1 = false;
    }
  }
}

//Game over (lose)
function gameOver() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].revealed = true;
      lose = true;
    }
  }
}

//Function called when Mouse is pressed
function mousePressed() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      if (grid[i][j].contains(mouseX, mouseY) && mouseButton === LEFT && win === false && lose === false && fstclk != true && pausing === false && xray === false) {
        grid[i][j].reveal();
        time += sec;
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
        ellipse(this.x + this.w * 0.5, this.y + this.w * 0.5, this.w * 0.5);
      } else if (!this.thing && !this.thing2) {
        fill(200);
        rect(this.x, this.y, this.w, this.w);
        if (this.neighborCount > 0) {
          textAlign(CENTER);
          fill(0);
          text(this.neighborCount, this.x + this.w * 0.5, this.y + this.w - 6);
        }
      } else if (this.thing2) {
        fill(127);
        ellipse(this.x + this.w * 0.5, this.y + this.w * 0.5, this.w * 0.5);
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