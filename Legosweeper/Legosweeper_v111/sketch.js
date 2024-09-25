var scene = "menu"; // Include: "menu", "play", "cred", "how"
var heart = 1,
  sec = 1 / 45;
var totalPieces = 30;
var flags = [];
var clickTimer = 0;
var shop = false;
var money_ = 0;
var buyitems = false;
var items = ["  Heart", "  Potion", "  Coin", "   Ticket", "  X-ray"];
var buy = [false, false, false, false, false];
var money = [40, 100, 20, 50, 80],
  slr = [50, 30, 20, 10];
var shopTxt = [
  " A heart: +1 heart to health bar, will save\nyou a live if you click on a mine.",
  " Flash potion: Decrease the time by 20%.",
  " FlipaCoin: Win if head, stay the same\nif tail",
  " Manager ticket: Be a manager in a turn, x2\nif wins, -10 if loses (Needs " +
    (money[3] + 10) +
    "$ to buy)",
  " X-ray Glasses: Reveals the whole board in\n5 (game) seconds",
];

var besttime = 0;
var manager, xray, xraytime, rollingtime, slrtime, buyingtime, pausing;

var win, lose, grid, cols, rows, time, fstclkaf;
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
  hearts = loadImage("Images/Heart (Alternative).png");
  potions = loadImage("Images/Potion.png");
  coin = loadImage("Images/Coin.png");
  // whearts = loadImage("Images/WhiteH.png");
  tickets = loadImage("Images/Ticket.png");
  timer = loadImage("Images/Timer.png");
  xRay = loadImage("Images/X Ray Glasses.png");
  buythis = loadImage("Images/Shop.png");
  // tuto = loadImage("Images/Tuto.png");
  Cur = loadImage("Images/Cursor.png");
  // timerImg = loadImage("Images/Timer.png");
  // paperM = loadImage("Images/Money (Paper).png");
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
  slrtime = 0;
  time = 0;
  lose = false;
  win = false;
  unsweepedSpace = cols * rows;
  grid = make2DArray(cols, rows);
  pausing = false;
  // fstclkaf = false;
  flags = [];
  particles = [];

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
    let i = choice[0];
    let j = choice[1];
    options.splice(index, 1);
    grid[i][j].thing = true;
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j].countTotal();
    }
  }
}

function Button3D(x, y, w, h, t, func, bCol, tCol) {
  fill(bCol[0], bCol[1], bCol[2]);
  // stroke(0);
  if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
    rect(x, y, w, h, 3);
    noStroke();
    fill(tCol[0], tCol[1], tCol[2]);
    textSize((w + h) / 8 + 10 - t.length);
    text(t, x + w / 2, y + h / 2 + 4);
    if (mouseIsPressed) mouseReleased = () => func();
  } else {
    rect(x, y - 3, w, h, 3);
    fill(bCol[0] - 40, bCol[1] - 40, bCol[2] - 40);
    rect(x, y + h - 4, w, 5, 0, 0, 3, 3);
    noStroke();
    fill(tCol[0], tCol[1], tCol[2]);
    textSize((w + h) / 8 + 10 - t.length);
    text(t, x + w / 2, y + h / 2 + 1);
  }
}

function Button2D(x, y, w, h, txt, txtY, func, size) {
  fill(220);
  stroke(0);
  rect(x, y, w, h, 2);
  fill(0);
  textSize(size);
  text(txt, x + w / 2, txtY);
  if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) {
    mouseReleased = () => {
      if (mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h) func();
    };
  }
}

function shopSlot(i, txt, func) {
  let y = 150 + i * 25;
  fill(220);
  rect(410, y, 90, 20);
  fill(0);
  textSize(15);
  text(txt, 455, y + 15);
  if (
    mouseIsPressed &&
    mouseX > 411 &&
    mouseX < 500 &&
    mouseY > y &&
    mouseY < y + 20
  ) {
    func();
  }
}

function shopBoard(x, y, txt, truebuynum, func) {
  textSize(12);
  textAlign(CENTER);
  Button2D(480, 120, 20, 20, "×", 134.5, () => (shop = false), 20);

  for (let i in items) {
    shopSlot(i, items[i], () => {
      buy[0] = buy[1] = buy[2] = buy[3] = buy[4] = false;
      buy[i] = "mid";
    });
  }

  image(hearts, 420, 152, 16, 16);
  image(potions, 416, 177, 16, 16);
  image(coin, 422, 202, 16, 16);
  image(tickets, 420, 227, 16, 16);
  image(xRay, 414, 252, 22, 16);

  if (buyitems) {
    fill(220);
    rect(x, y, 400, 40, 2);
    noFill();
    if (mouseX > x + 385 && mouseX < x + 400 && mouseY > y && mouseY < y + 15) {
      fill(220, 0, 0);
      if (mouseIsPressed) buyitems = false;
    }
    rect(x + 385, y, 15, 15, 0, 0, 0, 2);
    textAlign(LEFT);
    textSize(12);
    fill(0);
    text("×", x + 389, y + 10);

    for (let i in buy) {
      if (buy[i] == "mid") {
        textAlign(LEFT, CENTER);
        textSize(13);
        text(shopTxt[i], 3, 425);
        textAlign(CENTER, BASELINE);
      }
    }

    noFill();
    if (
      mouseX > x + 355 &&
      mouseX < x + 385 &&
      mouseY > y + 5 &&
      mouseY < y + 35
    ) {
      fill(220, 0, 0);
      stroke(220, 0, 0);
      textAlign(CENTER);
      text("Buy?", x + 370, y - 5);
      let index_ = buy.indexOf("mid");
      text(money[index_] + "$/\nthing", x + 420, y + 15);
      if (money_ < money[index_]) {
        textSize(12);
        text("🔒\nLocked", x + 330, y + 15);
      }

      if (mouseIsPressed) {
        buyingtime = buyingtime + 1;
        if (buyingtime < 1.1) {
          if (buy[0] == "mid" && money_ >= money[0] && heart < 3) buy[0] = true;
          if (buy[1] == "mid" && money_ >= money[1] && sec == 1 / 60)
            buy[1] = true;
          if (buy[2] == "mid" && money_ >= money[2]) buy[2] = true;
          if (buy[3] == "mid" && money_ >= money[3] + 10) buy[3] = true;
          if (buy[4] == "mid" && money_ >= money[4]) buy[4] = true;
        }
        mouseReleased = () => (buyingtime = 0);
      }
      fill(200, 0, 0);
    }
    // textAlign(CENTER)
    stroke(0);
    ellipse(370, 425, 30, 30);
    textSize(18);
    fill(0);
    text("🛍️", 370, 430);
  }
}

var herp = 0;
var num1 = true;

function gameOver() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      grid[i][j].revealed = true;
      lose = true;
    }
  }
}

var particles = [];

function Particle(ob) {
  for (let i in ob) {
    var p = ob[i];
    if (ob[ob.length - 1].y <= height + 10) {
      fill(ob[i].color);
      rect(ob[i].x, ob[i].y, ob[i].w, ob[i].h);

      ob[i].x += ob[i].velx;
      ob[i].y += ob[i].vely; // apply forces
      ob[i].vely += ob[i].gravity;
    }
  }
}

function mousePressed() {
  for (var i = 0; i < cols; i++) {
    for (var j = 0; j < rows; j++) {
      if (
        scene == "play" &&
        grid[i][j].contains(mouseX, mouseY) &&
        win == false &&
        lose == false &&
        pausing == false &&
        xray == false
      ) {
        if (mouseButton == LEFT) {
          grid[i][j].reveal();
          if (grid[i][j].thing) {
            heart -= 1;
            grid[i][j].thing = false;
            grid[i][j].thing2 = true;
            if (heart <= 0) gameOver();
          } else grid[i][j].flagged = false;
        } else if (mouseButton == RIGHT) flags.push([i, j]);
      }
    }
  }
}

let mili = 0;
var act = [
  [false, false, false, true, true],
  [false, false, false, true, false],
  [true, false, false, false, false],
  [true, true, false, false, false],
];
var step = 0;
var longPress = false;
function draw() {
  function game() {
    if (mili < 1) mili += sec;

    if (mili <= 0.25) setBoard();

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

      if (unsweepedSpace == totalPieces && !xray) win = true;
    }

    Button3D(
      405,
      73,
      90,
      20,
      "SHOP",
      () => (shop = true),
      [220, 220, 220],
      [0, 0, 0]
    );

    //Show board
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        grid[i][j].show();
      }
    }

    //All shop
    if (shop) {
      fill(220);
      stroke(0);
      rect(410, 120, 90, 270);

      shopBoard(0, 405);

      textAlign(CENTER);
      fill(0);
      textSize(14);
      text("SHOP:", 455, 140);
      text("__________\n\nMORE TO\nCOME\n\n¯¯¯¯¯¯¯¯¯¯", 455, 290);

      //Pop-up shop under the board
      {
        if (
          mouseIsPressed &&
          mouseX > 410 &&
          mouseX < 500 &&
          mouseY > 150 &&
          mouseY < 320
        ) {
          buyitems = true;
        }

        if (buyitems) {
          textAlign(LEFT);
          fill(0);
          textSize(12);
          for (var obj = 0; obj < 6; obj++) {
            if (buy[obj] == true) {
              if (obj == 0 || obj == 1 || obj == 3 || obj == 4) {
                money_ = money_ - money[obj];
                buy[obj] = "mid";
                if (obj == 0) heart = heart + 1;
                if (obj == 1) sec = 13 / 1000;
                if (obj == 3) manager = true;
                if (obj == 4) xray = true;
              }
              if (obj == 2) {
                textAlign(CENTER);
                rollingtime += 0.04;
                if (rollingtime < 0.05) money_ = money_ - money[2];
                if (rollingtime < 4) {
                  fill(0);
                  textSize(50);
                  text("Flipping...", 200, 200);
                }
                if (rollingtime >= 4) {
                  print(rollingtime);
                  var rannum = random();
                  textSize(20);
                  fill(0);
                  buy[2] = "mid";
                  // if (rannum >= 0.5) win = true;

                  if (!win)
                    text("You don't win anything :(", width / 2, height / 2);

                  if (rollingtime >= 6) rollingtime = 0;
                }
                fill(0);
                textAlign(CENTER);
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
      text("Manager" + (manager ? "✔️" : "❌"), 450, 110);

      if (xraytime < 5) {
        if (xray) {
          xraytime += 1 / 60;
          for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
              grid[i][j].revealed = true;
            }
          }
        }
      } else if (xraytime > 5) {
        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            grid[i][j].revealed = false;
          }
        }
        xray = false;
        xraytime = 0;
      }
    }

    stroke(255, 0, 0);
    fill(255, 0, 0);
    textSize(35);

    //Losing and winning

    if (lose) {
      fill(255, 150);
      rect(0, 0, 400);
      win = false;
      fill(255, 0, 0);
      text("😔You lose!\n<space>/double tap", 200, 100);
      if (manager) {
        slrtime++;
        if (slrtime < 1.1) money_ -= 10;
      }
    }

    if (win) {
      fill(255, 150);
      rect(0, 0, 400);
      if (particles.length < 69) {
        particles.push({
          x: 200,
          y: 200,
          w: 10,
          h: 10,
          velx: random(-1, 1),
          vely: -random(2.5, 3.5),
          gravity: 0.05,
          angle: random(-90, -270),
          color: color(random(30), random(50, 255), random(30)),
        });
      }

      fill(255, 0, 0);
      lose = false;
      text("🏆You win!!\n<space>/double tap!", 200, 100);
      slrtime = slrtime + 1;
      if (slrtime < 1.1) {
        if (manager) {
          slr = [80, 50, 20, 10, 4];
        } else {
          slr = [40, 25, 10, 5, 2];
        }
        if (floor(time) <= 40) money_ += slr[0];
        else if (floor(time) <= 60) {
          money_ += slr[1];
        } else if (floor(time) <= 80) {
          money_ += slr[2];
        } else {
          money_ += slr[3];
        }
      }
      noStroke();
      Particle(particles);
    }

    doubleClicked = function () {
      if (lose) heart = 1;
      setBoard();
    };
    if (keyIsPressed && keyCode == 32) {
      if (lose) heart = 1;
      setBoard();
    }

    //First-click and pausing
    {
      // if (
      //   mouseIsPressed &&
      //   scene == "play" &&
      //   // fstclkaf &&
      //   mouseX < 400 &&
      //   mouseY < 400
      // ) {
      //   fstclkaf = false;
      // }

      if (
        // fstclkaf == false &&
        scene == "play" &&
        !pausing &&
        time < 10000 &&
        !win &&
        !lose
      ) {
        time += sec;
      }

      Button2D(
        440,
        430,
        20,
        20,
        "⏸️",
        444.5,
        () => {
          pausing = true;
          al = 255;
        },
        12
      );
      Button2D(
        462,
        430,
        35,
        20,
        "Menu",
        444.5,
        () => {
          scene = "menu";
          setBoard();
        },
        14.5
      );
    }

    //Timer + Money
    {
      fill(0);
      textSize(15);
      textAlign(LEFT);
      stroke(0);
      strokeWeight(0.7);
      // image(timerImg, 405, 7);
      text("⏱️:" + floor(time), 405, 20);
      // image(paperM, 405, 52);
      text("💵:" + money_, 405, 60);
      textSize(12);
      text("(Best:" + besttime + ")", 400, 40);

      if (sec < 1 / 60) {
        textSize(12);
        text("⚡️", 408, 25);
      }
    }

    //Health bar
    {
      noFill();
      rect(472, 0, 35, 65);
      if (floor(heart) == heart + 0.5) {
        fill(220);
        image(hearts, 464, 60, 15, 15);
      }

      for (let i = 0; i < floor(heart); i++) {
        fill(220);
        image(hearts, 477, i * 20 + 3.5, 18, 18);
      }
    }

    if (pausing) {
      fstclkaf = true;
      // fill(0, 140);
      // rect(0, 0, 500, 450);
      background(255);
      fill(0);
      stroke(0);
      textSize(50);
      textAlign(CENTER);
      text("⏸️PAUSING⏸️", 250, 110);
      Button3D(
        145,
        150,
        220,
        50,
        "Resume",
        () => {
          pausing = false;
          // for (var i = 0; i < cols; i++) {
          //   for (var j = 0; j < rows; j++) {
          //     if (grid[i][j].revealed) {
          //       fstclkaf = false;
          //     } else {
          //       fstclkaf = true;
          //     }
          //   }
          // }
        },
        [200, 200, 200],
        [50, 50, 50]
      );
    }

    //Highscore
    if (win) {
      if (time > besttime && num1) {
        besttime = floor(time);
        num1 = false;
      } else if (time < besttime && !num1) {
        besttime = floor(time);
        num1 = false;
      }
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
    textSize(sin(herp / 5) * 3 + 40 + 20 / 2 - 2);
    text(word, 250, 63.5);
    fill(255, 0, 0);
    textSize(sin(herp / 5) * 3 + 40 + 20 / 2);
    text(word, 250, 60);
    textSize(25);
    fill(0);
    text("by DQG", 250, 100);
    Button3D(
      145,
      150,
      210,
      60,
      "PLAY",
      () => (scene = "play"),
      [0, 200, 0],
      [255, 0, 0]
    );
    Button3D(
      145,
      230,
      210,
      60,
      "HOW",
      () => (scene = "how"),
      [0, 200, 0],
      [255, 0, 0]
    );
    Button3D(
      145,
      310,
      210,
      60,
      "CREDITS",
      () => (scene = "cred"),
      [0, 200, 0],
      [255, 0, 0]
    );

    textSize(18);
    text("𝗩𝟭.𝟭.𝟭", 467, 444);
  }

  function cred() {
    // textFont("Courier");
    background(41, 97, 143);
    fill(255, 0, 0);
    textSize(30);
    text("All created by DQG", 250, 120);
    textSize(20);
    text("      dqg.itch.io ", 250, 170);
    fill(0);
    text(
      "Visit            !\n\nIf you can make music for games, you can\ncontact me here: abusinessemail27@gmail.com\n(You'll be added to the creds :D)",
      250,
      220
    );
  }

  function how() {
    // textFont("Courier");
    background(41, 97, 143);
    fill(255, 0, 0);
    textSize(30);
    text("HOW TO PLAY:", 250, 50);
    textSize(20);
    text("Press <space> or double tap", 250, 80);
    arr = [
      [1, -1, 1, 1, 1],
      [2, 2, 2, 1, -1],
      [1, -1, 2, 2, 2],
      [1, 1, 2, -1, 1],
    ];
    // act = [[false, false, false], [false, false, false], [false, false, false]]
    for (let i = 0; i < arr.length; i += 1) {
      for (let j = 0; j < arr[i].length; j += 1) {
        stroke(0);
        fill(220);
        if (act[i][j]) fill(200);
        rect(j * 30 + 175, i * 30 + 220, 30);
        fill(0);
        noStroke();
        if (
          mouseIsPressed &&
          mouseX >= j * 30 + 175 &&
          mouseX <= j * 30 + 205 &&
          mouseY >= i * 30 + 220 &&
          mouseY <= i * 30 + 250 &&
          act[i][j] != true
        ) {
          if (mouseButton == LEFT) act[i][j] = true;
          else act[i][j] = "flag";
        }
      }
    }
    for (let i = 0; i < arr.length; i += 1) {
      for (let j = 0; j < arr[i].length; j += 1) {
        if (act[i][j] == true) {
          if (arr[i][j] == -1) image(mines, j * 30 + 180, i * 30 + 225, 20, 20);
          else text(arr[i][j], j * 30 + 190, i * 30 + 235);
        } else if (act[i][j] == "flag") {
          text("🚩", j * 30 + 190, i * 30 + 235);
        }
      }
    }

    // text(act, 200, 20);

    doubleClicked = () => (step += 1);
    if (keyIsPressed && keyCode == 32) {
      step += 1;
      keyIsPressed = false;
    }
    if (step == 27) {
      arr = [
        [1, -1, 1, 1, 1],
        [2, 2, 2, 1, -1],
        [1, -1, 2, 2, 2],
        [1, 1, 2, -1, 1],
      ];
      act = [
        [false, false, false, true, true],
        [false, false, false, true, false],
        [true, false, false, false, false],
        [true, true, false, false, false],
      ];
      step = 0;
    }
    strokeWeight(0.25);
    stroke(0);
    switch (step) {
      case 0:
        text(
          'A number in a "cell" represents the number\nof lego pieces neighboring that cell.',
          250,
          150
        );
        break;
      case 1:
        textSize(20);
        text(
          'For example, this "1" means there is only 1\ncell neighboring it is a lego piece :)',
          250,
          150
        );
        textSize(30);
        text("⇐", 340, 235);
        break;
      case 2:
        textSize(20);
        text(
          "But there is only 1 unexplored cell near\nit, meaning it must be a lego piece!",
          250,
          150
        );
        textSize(30);
        text("⇐", 340, 265);
        break;
      case 3:
        textSize(20);
        text(
          "Don't touch it just yet! Carefully place\na flag there by right clicking the cell!",
          250,
          150
        );
        textSize(30);
        text("⇐", 340, 265);
        break;
      case 4:
        textSize(20);
        text(
          'Now, let\'s look at this cell. It says "1".\nYup, that means a lego piece is close!',
          250,
          150
        );
        textSize(30);
        text("⇘", 260, 200);
        break;
      case 5:
        textSize(19);
        text(
          'But, since THIS flagged cell is a lego piece,\nand it IS a neighbor of that "1" cell...',
          250,
          150
        );
        text("⇘", 260, 200);
        textSize(30);
        text("⇐", 340, 265);
        break;
      case 6:
        textSize(19);
        text(
          "Meaning all of the cells near this cell is not\na Lego piece! Left-click them all to reveal!",
          250,
          150
        );
        textSize(30);
        text("⇘", 260, 200);
        break;
      case 7:
        textSize(20);
        text(
          "Great job! Now do the same thing\nwith the lower left corner!",
          250,
          150
        );
        textSize(30);
        text("⇒", 160, 325);
        break;
      case 8:
        textSize(20);
        text("Need a hint?\nThis one right here is a lego piece! :)", 250, 150);
        textSize(30);
        text("⇐", 250, 295);
        break;
      case 9:
        textSize(20);
        text("Just work your way with other cells!", 250, 150);
        // textSize(30);
        // text("⇒", 160, 325);
        break;
      case 10:
        textSize(20);
        text(
          "You are left with these 4 cells right?\nIf so, continue!",
          250,
          150
        );
        textSize(30);
        text("⇓ ⇓\n\n\n\n           ⇑ ⇑", 205, 283);
        break;
      case 11:
        textSize(20);
        text(
          'We see this cell is a "2", and there\'s\nalready one nearby which is a Lego piece',
          250,
          150
        );
        textSize(30);
        text("⇖", 280, 330);
        break;
      case 12:
        textSize(20);
        text(
          "And this cell is left so it is\ndefinitely a Lego piece! Flag it!",
          250,
          150
        );
        textSize(30);
        text("⇑", 280, 360);
        break;
      case 13:
        textSize(20);
        text(
          "Let's look at this cell. We can see\nit already has 2 Lego piece near it.",
          250,
          150
        );
        textSize(30);
        text("⇐", 340, 295);
        break;
      case 14:
        textSize(20);
        text("That means this cell is NOT\na Lego piece! :D", 250, 150);
        textSize(30);
        text("⇐", 340, 325);
        break;
      case 15:
        textSize(20);
        text("Do the same up here!", 250, 150);
        textSize(30);
        text("⇓ ⇓", 205, 205);
        break;
      case 16:
        textSize(20);
        text("Hint: use this cell!", 250, 150);
        textSize(30);
        text("⇘", 220, 238);
        break;
      case 17:
        textSize(20);
        text(
          "YAYY you're done with the board!\nBut, just a little bit more...",
          250,
          150
        );
        break;
      case 18:
        textSize(20);
        text(
          "Everytime you win, you will receive an\namount depends on the time you finish.",
          250,
          150
        );
        break;
      case 19:
        textSize(20);
        text(
          "You can press <space> or double tap\nto reset the board",
          250,
          150
        );
        break;
      case 20:
        textSize(20);
        text("Not this board of course! XD", 250, 150);
        break;
      case 21:
        textSize(20);
        text(
          "If you accidently click on a cell\nwith a Lego piece, you'll die!",
          250,
          150
        );
        break;
      case 22:
        textSize(20);
        text("The shop has tools to help\nyou with that though!", 250, 150);
        break;
      case 23:
        textSize(20);
        text(
          "For example, you can buy up to 3 hearts;\nfor every misclick, you will lose a heart.",
          250,
          150
        );
        break;
      case 24:
        textSize(20);
        text(
          "There is also a lot of other tools\nto help you! Tinker around!",
          250,
          150
        );
        break;
      case 25:
        textSize(20);
        text("And that is it! Happy playing!! :)", 250, 150);
        break;
      case 26:
        textSize(20);
        text("Press <space> / double tap to reset the tutorial!", 250, 150);
        break;
    }
    strokeWeight(1);
    noStroke();
  }

  if (scene == "menu") startscreen();
  else if (scene == "play") game();
  else {
    if (scene == "how") how();
    else if (scene == "cred") cred();
    Button3D(
      365,
      380,
      100,
      60,
      "BACK",
      () => (scene = "menu"),
      [0, 200, 0],
      [255, 0, 0]
    );
  }
  fill(0);
  noCursor();
  image(Cur, mouseX, mouseY, 15, 15);
}

//Object-oriented..thingy...
{
  Cell = function (i, j, w) {
    this.i = i;
    this.j = j;
    this.x = i * w;
    this.y = j * w;
    this.w = w;
    this.neighborCount = 0;
    this.thing = false;
    this.thing2 = false;
    this.revealed = false;
    this.flagged = false;
  };

  //Show the grids
  Cell.prototype.show = function () {
    stroke(0);
    noFill();
    rect(this.x, this.y, this.w, this.w);
    textSize(15);
    if (this.revealed) {
      if (this.thing || this.thing2) {
        fill(127);
        image(mines, this.x + 1, this.y + 1, 18, 18);
      } else if (!this.thing && !this.thing2) {
        fill(200);
        rect(this.x, this.y, this.w, this.w);
        if (this.neighborCount > 0) {
          textAlign(CENTER);
          fill(0);
          text(this.neighborCount, this.x + this.w / 2, this.y + this.w - 6);
        }
      }
      //this.flagged = false;
    }
    for (let l in flags) {
      if (flags[l][0] == this.i && flags[l][1] == this.j) this.flagged = true;

      if (this.flagged) {
        fill(0);
        textSize(12);
        text("🚩", flags[l][0] * 20 + 10, flags[l][1] * 20 + 14);
      }
    }
  };

  //Count the surrounding grids
  Cell.prototype.countTotal = function () {
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
  };

  //Contains mouseX, mouseY
  Cell.prototype.contains = function (x, y) {
    return (
      x > this.x && x < this.x + this.w && y > this.y && y < this.y + this.w
    );
  };

  //Reaveal the grids (When mouse is pressed)
  Cell.prototype.reveal = function () {
    this.revealed = true;
    if (this.flagged) {
      flags.splice(flags.indexOf([this.i, this.j]));
      this.flagged = false;
    }
    if (this.neighborCount == 0) {
      this.floodFill();
    }
  };

  //Flood fill
  Cell.prototype.floodFill = function () {
    for (var xoff = -1; xoff <= 1; xoff++) {
      var i = this.i + xoff;
      if (i < 0 || i >= cols) continue;

      for (var yoff = -1; yoff <= 1; yoff++) {
        var j = this.j + yoff;
        if (j < 0 || j >= rows) continue;

        var neighbor = grid[i][j];
        if (!neighbor.revealed) {
          neighbor.reveal();
          neighbor.flagged = false;
        }
      }
    }
  };
}
