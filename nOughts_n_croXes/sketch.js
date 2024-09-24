/**
  Created all by DQG. (https://dqg.itch.io/tic-tac-toe)
  Copying isn't allowed!! Please ask if you want to take a small part!!!!
**/

function setup() {
  createCanvas(450, 450);
  w = width / Size; //width of 1 tile
  h = height / Size; //height of 1 tile
  colors = [color(255, 0, 0), color(0, 128, 255), color(0, 255, 0)]; //Colors
  theme = color(240, 240, 240);
  themenot = color(20, 20, 20);
  textFont(font);
  imageMode(CENTER);
  angleMode(DEGREES);
  rectMode(CENTER);
  lerp_ = (width * 0.7) / Size;
}

var font, X, O, arrow;
function preload() {
  font = loadFont("Assets/fixedsys.ttf");
  X = loadImage("Assets/X (TTT).png");
  O = loadImage("Assets/O (TTT).png");
  arrow = loadImage("Assets/Arrow.png");
}

var Size = 3; //Size of board
var w, h, left, turn; //Others
var players = ["X", "O", "tie"]; //Players

var scene = "menu"; //"menu", "game", "choose", "settings"
var colors = [];
var theme, themenot;
var delag = false,
  trans = true,
  dark = false,
  toSize = false;
var board = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];
var mode = "";

function cross(x, y, s, fi) {
  rectMode(CENTER);
  image(X, x, y, s, s);
  rectMode(CORNER);
} //Draws the crosses

function naught(x, y, s, fi) {
  ellipseMode(CENTER);
  image(O, x, y, s, s);
  rectMode(CORNER);
} //Draws the naughts

function button(x, y, w, h, txt, f, col) {
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  strokeWeight(2);
  stroke(themenot);
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
  rect(x, y, w, h * (2 / 3), 4);
  noStroke();
  fill(col);
  textSize((w + h) / 10 + 4);
  text(txt.toUpperCase(), x, y - h / 20);
} //Draws the buttons

var done = true; //Checks if Transit() is done
var tArr = [0, 0];
function transit() {
  rectMode(CORNER);
  noStroke();
  if (!done) {
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
}

let li = 150;
function check(win) {
  let equals3 = (a, b, c) => a == b && b == c && a != "";

  strokeWeight(10);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (equals3(board[i][j], board[i + 1][j + 1], board[i + 2][j + 2])) {
        win = board[i][j];
        line(
          w * (i + 0.3),
          h * (j + 0.3),
          w * (i + 2.7) - li,
          h * (j + 2.7) - li
        );
      } // Diagonal (N.W-S.E)
    }
  }

  for (let i = 0; i < Size; i++) {
    for (let j = 0; j < Size - 2; j++) {
      if (equals3(board[i][j], board[i][j + 1], board[i][j + 2])) {
        win = board[i][j];
        line(w * (i + 0.5), h * (j + 0.3), w * (i + 0.5), h * (j + 2.7) - li);
      } // Vertical
      if (equals3(board[j][i], board[j + 1][i], board[j + 2][i])) {
        win = board[j][i];
        line(w * (j + 0.3), h * (i + 0.5), w * (j + 2.7) - li, h * (i + 0.5));
      } //Horizontal
    }
  }

  for (let i = Size - 1; i > 1; i--) {
    for (let j = 0; j < 3; j++) {
      if (equals3(board[i][j], board[i - 1][j + 1], board[i - 2][j + 2])) {
        win = board[i][j];
        line(
          w * (i + 0.7),
          h * (j + 0.3),
          w * (i - 1.7) + li,
          h * (j + 2.7) - li
        );
      }
    }
  }

  if (win != null) {
    li = lerp(li, 0, 0.2);
  }

  if (win == null && left == 0) {
    return "tie";
  } else {
    return win;
  }
}

function bestMove() {
  let bestScore = -Infinity;
  let move;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == "") {
        board[i][j] = players[0];
        let score = minimax(board, 0, false);
        board[i][j] = "";
        if (score > bestScore) {
          bestScore = score;
          move = { i, j };
        }
      }
    }
  }
  if (turn % 2 == 0) {
    board[move.i][move.j] = players[0];
    turn++;
    left--;
  }
}

var scores = [10, -10, 0];

function minimax(board, depth, isMaximizing) {
  let result = check(null);
  if (result !== null) {
    return scores[players.indexOf(result)];
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] == "") {
          board[i][j] = players[0];
          let score = minimax(board, depth + 1, false);
          board[i][j] = "";
          bestScore = max(score, bestScore);
        }
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] == "") {
          board[i][j] = players[1];
          let score = minimax(board, depth + 1, true);
          board[i][j] = "";
          bestScore = min(score, bestScore);
        }
      }
    }
    return bestScore;
  }
}

function mousePressed() {
  var i = floor(mouseX / w);
  var j = floor(mouseY / h);
  var result = check(null);
  if (board[i][j] == "" && scene == "game" && TIMER_ == 200) {
    if (mode == "multi") {
      board[i][j] = players[turn % 2]; //X or O
    } else if (mode == "single") {
      if (turn % 2 == 1) {
        board[i][j] = players[1];
        bestMove();
      }
    }
    if (done == true) {
      lerping = true;
      lerp_ = (width * 0.7) / Size;
      W.push(i);
      H.push(j);
    }
    turn++; //+1
    left--; //-1
  }
}

function reload() {
  board = [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ];
  w = width / Size;
  h = height / Size;
  left = Size * Size;
  turn = 0;
  if (trans) {
    done = false;
  }
  TIMER_ = 200;
  W = [];
  H = [];
  li = 150;
} //For resetting

var TIMER_ = 400;
var W = [];
var H = [];
function game() {
  if (turn % 2 == 0 && mode == "single") {
    bestMove();
  }

  stroke(themenot);
  strokeWeight(4);
  rectMode(CORNER);
  noFill();
  for (var i = 0; i < Size; i++) {
    for (var j = 0; j < Size; j++) {
      rect(i * w, j * h, width, height); //Tiles
    }
  }

  for (let i = 0; i < Size; i++) {
    for (let j = 0; j < Size; j++) {
      let POS_ = [w * (i + 1 / 2), h * (j + 1 / 2), (width * 0.7) / Size];
      if (board[i][j] == players[0]) {
        cross(POS_[0], POS_[1], POS_[2], 0);
      } else if (board[i][j] == players[1]) {
        naught(POS_[0], POS_[1], POS_[2], 0);
      }
    }
  }

  textAlign(CENTER, CENTER);
  if (lerp_ <= w - Size * 3 && lerping == true) {
    lerp_ += 7.75 / Size;
    let pos_ = [w * (W[W.length - 1] + 1 / 2), h * (H[H.length - 1] + 1 / 2)];
    if (mode == "multi") {
      if (turn % 2 == 1) {
        cross(pos_[0], pos_[1], lerp_);
      } else if (turn % 2 == 0) {
        naught(pos_[0], pos_[1], lerp_);
      }
    } else {
      naught(pos_[0], pos_[1], lerp_);
    }
  } else {
    lerping = false;
    lerp_ = lerp(lerp_, (width * 0.7) / Size, 0.001);
  }

  textAlign(CENTER, CENTER);
  var result = check(null);
  if (result !== null && scene == "game") {
    if (!delag) {
      TIMER_ -= 2;
    } else {
      TIMER_ = 0;
    }

    if (TIMER_ < 150) {
      fill(0, 70);
      rect(0, 0, width, height); //Grey background
      fill(colors[2]);
      textSize(98);
      strokeWeight(4);
      if (result == "tie") {
        text("Draw!", width / 2, height * (3 / 10));
      } else {
        fill(colors[players.indexOf(result)]);
        text(result + " wins!", width / 2, height * (3 / 10));
      }
      button(
        width / 2 - TIMER_ * 2 - 4,
        height * (200 / 400),
        width / 2.5,
        height * (2.7 / 20),
        "Play again",
        () => {
          reload();
        },
        colors[2]
      );
      button(
        width / 2 + TIMER_ * 2 + 4,
        height * (254 / 400),
        width * (11 / 40),
        height * (2.2 / 20),
        "Menu",
        function () {
          scene = "menu";
          reload();
          mode = "";
          l = 0;
        },
        colors[2]
      );
      if (TIMER_ < 0) {
        TIMER_ = 0;
      }
    }
  }
}

var l = 0;
function menu() {
  noFill();
  strokeWeight(2);
  stroke(themenot);
  push();
  translate(width / 8, 205);
  if (!delag) {
    rotate(millis() / 15);
  }
  arc(0, 0, 75, 75, 22.5, 67.5);
  arc(0, 0, 75, 75, 90, 180);
  arc(0, 0, 75, 75, 225, 360);
  cross(0, 0, 50);
  pop();
  push();
  translate((width * 7) / 8, 205);
  if (!delag) {
    rotate(millis() / 15);
  }
  arc(0, 0, 75, 75, 122.5, 167.5);
  arc(0, 0, 75, 75, 190, 280);
  arc(0, 0, 75, 75, 325, 460);
  naught(0, 0, 50);
  pop();
  fill(themenot);
  textSize(20);
  noStroke();
  text("Player 1", 60, 150);
  text("Player 2", width - 60, 150);
  button(
    (width / 2) * (l + 1) - width / 2,
    height / 2,
    width * (2 / 5),
    (height * 3) / 20,
    "Play",
    function () {
      scene = "choose";
      if (trans) {
        done = false;
      }
    },
    colors[0]
  );
  button(
    (width / 2) * (1 - l) + width / 2,
    height * (3 / 4),
    width * (2 / 5),
    (height * 3) / 20,
    "Settings",
    function () {
      scene = "settings";
      if (trans) {
        done = false;
      }
    },
    colors[0]
  );
  textSize(20);
  text("Created by DQG in 5 days", width / 2, height - 13);
  textSize(45);

  if (!delag) {
    l = lerp(l, 1, 0.04);
  } else {
    l = 1;
  }
  push();
  translate(width / 2, height * (94 / 400));
  scale(l);
  fill(themenot);
  text("Special Edition!!", -1, 2);
  fill(255, 255, 0);
  text("Special Edition!!", 0, 0);
  pop();
  fill(themenot);
  text("NOUGHTS & CROXES", width * (199 / 400), height * (40 / 400)); //Shadow
  fill(colors[1]);
  text("NOUGHTS", width * (11 / 40), height * (38 / 400));
  fill(colors[2]);
  text("&", width * (210 / 400), height * (38 / 400));
  fill(colors[0]);
  text("CROXES", width * (30 / 40), height * (38 / 400));
}

function choose() {
  textSize(29);
  fill(255, 0, 0);
  text("Pick one:", width / 2, height / 15);
  if (mode !== "") {
    text("Choose your board size:", width / 2, height / 2);
    button(
      width * (69 / 400),
      height * (13 / 20),
      width / 4,
      height / 10,
      "3x3",
      function () {
        Size = 3;
        reload();
        scene = "game";
      },
      color(255, 0, 0)
    );
    if (mode == "multi") {
      button(
        width / 2,
        height * (13 / 20),
        width / 4,
        height / 10,
        "4x4",
        function () {
          Size = 4;
          reload();
          scene = "game";
        },
        colors[0]
      );
      button(
        width * (331 / 400),
        height * (13 / 20),
        width / 4,
        height / 10,
        "5x5",
        function () {
          Size = 5;
          reload();
          scene = "game";
        },
        colors[0]
      );
    } else {
      textSize(20);
      text(
        "A 4x4/5x5 board can\ncause SEVERE lags",
        (width * 13) / 20,
        (height * 51) / 80
      );
    }
  }
  var W_ = width * (21 / 50);
  var H_ = (height * 2.6) / 20;
  button(
    width / 2,
    height / 4,
    W_,
    H_,
    "1 player",
    () => {
      mode = "single";
    },
    colors[0]
  );
  button(
    width / 2,
    height * (37 / 100),
    W_,
    H_,
    "2 players",
    () => {
      mode = "multi";
    },
    colors[0]
  );

  textSize(20);
  text("Singleplayer isn't recommended in delag", width / 2, height * (3 / 20));

  if (mode == "single") {
    image(arrow, width / 8, height * (97 / 400), 51, 39);
  } else if (mode == "multi") {
    image(arrow, width / 8, height * (147 / 400), 51, 39);
  }
} //Choose board size

function settings() {
  function Switch(x, y, s, lflect, bflect) {
    if (
      mouseIsPressed &&
      mouseX > x - 45 / 2 &&
      mouseX < x + 45 / 2 &&
      mouseY > y - 10 &&
      mouseY < y + 10
    ) {
      frameRate(8);
      s = !s;
    }
    fill(0, 120);
    var elipX = x - 15;
    if (s) {
      fill(0, 220, 0);
      elipX = x + 15;
    }
    noStroke();
    rect(x, y, 45, 20, 10);

    if (!delag) {
      for (var i = 20; i > 0; i--) {
        lflect = 150 * cos((i / 20) * 90);
        bflect = {
          r: (1 - cos((i / 20) * 90)) / 2,
          g: (1 - cos((i / 20) * 90)) / 2,
          b: (1 - cos((i / 20) * 90)) / 2,
        };
        stroke(
          35 + lflect + bflect.r,
          35 + lflect + bflect.g,
          35 + lflect + bflect.b
        );
        strokeWeight(i);
        line(elipX, y, elipX, y);
      }
    } else {
      fill(themenot);
      ellipse(elipX, y, 20, 20);
    }
    return s;
  }
  noStroke();
  rectMode(CENTER);
  textSize(50);
  textAlign(CENTER, CENTER);
  fill(themenot);
  text("Settings", width / 2, height * (3 / 40));
  text("How to play:", width / 2, height * (9 / 16));
  textAlign(LEFT);
  textSize((width + height) * (6.5 / 160));
  text("Delag:", width * (3 / 40), height * (3 / 16));
  text("Transitions:", width * (3 / 40), height * (5 / 16));
  text("Dark theme:", width * (3 / 40), height * (7 / 16));
  delag = Switch(width * (7 / 8), (height * 8) / 40, delag, 0, 0);
  trans = Switch(width * (35 / 40), (height * 13) / 40, trans, 0, 0);
  dark = Switch(width * (35 / 40), (height * 18) / 40, dark, 0, 0);
  textAlign(CENTER, CENTER);
  fill(themenot);
  textSize(23);
  noStroke();
  text(
    "Match 3 in a row, whether\nacross, down or diagonal.",
    width / 2,
    (height * 12) / 16
  );
}

let lerping = false;
let lerp_;
draw = function () {
  background(theme);
  strokeWeight(2);
  stroke(0, 204, 255);
  for (var i = 0; i < height / 20 - 2; i++) {
    line(0, i * 20 + 40, width, i * 20 + 40);
  }
  stroke(255, 0, 0);
  line(width / 8, 0, width / 8, height);

  //Other
  {
    noStroke();
    if (scene == "menu") {
      frameRate(55);
      menu();
    } else if (scene == "game") {
      frameRate(55);
      game();
    } else if (scene == "choose" || scene == "settings") {
      if (scene == "choose") {
        frameRate(55);
        choose();
      } else if (scene == "settings") {
        settings();
      }
      button(
        width * (16.5 / 20),
        height * (37 / 40),
        width * (6 / 25),
        height * (1 / 8),
        "Back",
        function () {
          scene = "menu";
          l = 0;
          if (trans) {
            done = false;
          }
        },
        colors[0]
      );
    }

    if (trans) {
      if (!done) {
        frameRate(55);
      }
      transit();
    }
    if (dark || delag) {
      dark = true;
      if (delag) {
        trans = false;
      }
      theme = color(40, 40, 40);
      themenot = color(240, 240, 240);
    } else {
      theme = color(240, 240, 240);
      themenot = color(20, 20, 20);
    }
  }
};
