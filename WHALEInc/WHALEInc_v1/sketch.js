function setup() {
  createCanvas(500, 400);
  textAlign(CENTER, CENTER);
  textFont("Consolas");
  rectMode(CENTER);
  noStroke();
  imageMode(CENTER);
}

var scene = "menu";
var toScene = "";

var startnum = 600;
var trash = [];
var del = 0;
var num;
var budget = 0;
var over = [];

function preload() {
  cur = loadImage("assets/cursor.png");
  bag = loadImage("assets/bag.png");
  bag1 = loadImage("assets/bag1.png");
  bag2 = loadImage("assets/bag2.png");
  cohe = loadImage("assets/cohe.png");
  cohe1 = loadImage("assets/cohe1.png");
  cohe2 = loadImage("assets/cohe2.png");
  sharbuck = loadImage("assets/sharbuck.png");
  sharbuck1 = loadImage("assets/sharbuck1.png");
  sharbuck2 = loadImage("assets/sharbuck2.png");

  trashType = [
    bag,
    bag1,
    bag2,
    cohe,
    cohe1,
    cohe2,
    sharbuck,
    sharbuck1,
    sharbuck2,
  ];
  trW = [26, 32, 32, 16, 32, 32, 17, 32, 17];
  trH = [32, 26, 32, 32, 16, 32, 32, 17, 32];
}

var hover = (p1x, p1y, p2x, p2y, tf) => {
  if (mouseX > p1x && mouseX < p2x && mouseY > p1y && mouseY < p2y) return true;
};

var trashType = [];

function addTrash(num) {
  let i = [];
  if (i.length == 0) i.push(trash.length);
  while (trash.length < i[0] + num) {
    trash.push({
      x: random(30, 310),
      y: random(100, 310),
      tp: floor(random(trashType.length)),
    });
  }
}

var clicked = false;
var Trash = function () {
  for (var i = trash.length - 1; i >= 0; i--) {
    let t = trash[i];
    image(trashType[t.tp], t.x, t.y);
    if (
      hover(t.x - trW[t.tp], t.y - trH[t.tp], t.x + trW[t.tp], t.y + trH[t.tp])
    )
      over[i] = true;
    else over[i] = false;
  }
};

var doneTran = true; //Checks if Transit() is done
var tran = -600;

var randomNum;
function transit() {
  rectMode(CORNER);

  noStroke();
  if (!doneTran) {
    tran += abs(tran - 50) / 50 + 0.4;

    for (let i = 0; i < 6; i++) {
      fill(255 - i * 25, 255, 0);
      rect(i % 2 == 0 ? tran - 100 : -tran, i * 200 / 3, width * 1.2, 200 / 3 + 2);
      fill(255, 0,0)
      textSize(30)
      text("  𝗪ᵒʳˡᵈʷᶦᵈᵉ      ", tran + width * 0.6 - 100, 100/3)
      text("   𝗛ᵃᶻᵃʳᵈˡᵉˢˢ      ", -tran + width * 0.6, 100)
      text("          𝗔ⁿⁿᶦʰᶦˡᵃᵗᶦᵒⁿ ⁽ᵒᶠ⁾      ", tran + width * 0.6 - 100, 500 / 3)
      text("         𝗟ᶦᵗᵗᵉʳ ⁽ᶠᵒʳ ᵗʰᵉ⁾      ", -tran + width * 0.6, 700 / 3)
      text("    𝗘ⁿᵛᶦʳᵒⁿᵐᵉⁿᵗ      ", tran + width * 0.6 - 100, 300)
      text("   𝗜𝗻𝗰ᵒʳᵖᵒʳᵃᵗᵉᵈ      ", -tran + width * 0.6, 1100/3)

    }
  }
  if (tran >= width * 1.3) {
    doneTran = true;
    tran = -600;
    scene = toScene
    toScene = ""
  }
  rectMode(CENTER);
}

var addT = [20, 40, 80, 200, 500];
var addTN = [
  "Buy a net",
  "Hire a kid",
  "Hire a worker",
  "Rent a truck",
  "Rent the\nInterceptor",
];
var addon = function (y, i) {
  stroke(0);
  fill(0, 40);
  if (budget >= addT[i] && trash.length > 0) {
    noFill();
    if (hover(360, y - 30, 490, y + 30, true)) {
      noStroke();
      fill(255);
      rect(310, y, 70, 35);
      fill(255);
      triangle(345, y + 7, 355, y, 345, y - 7);
      fill(0);
      textSize(15);
      text("Add " + round(addT[i] / 10), 310, y);

      noFill();
      stroke(0);
      if (mouseIsPressed) {
        del += addT[i] / 625 - 0.002;
        addTrash(addT[i]);
        num = trash.length;
        mouseIsPressed = false;
      }
    }
  }
  rect(425, y, 130, 60);
  noStroke();
  textSize(16);
  fill(255, 0, 0);
  text(addTN[i] + "\n(Need " + addT[i] + ")", 425, y);
};

var warn = false;
function warnPopup() {
  fill(255);
  rect(width / 2, 350, 200, 80, 5);
  triangle(150, 375, 140, 365, 150, 355);
  fill(0);
  textSize(20);
  text("Quit?", width / 2, 330);
  button(210, 360, 70, 30, "Yes", () => {
    startgame = true;
    diff = undefined;
  });
  button(290, 360, 70, 30, "No", () => (warn = false));
}

var Inver = function (milisec) {
  milisec_ = (floor((milisec % 60) * 100) / 100).toFixed(2);
  if (milisec_ < 10) milisec_ = "0" + milisec_;
  
  var min = floor(floor(milisec / 10) / 6);
  if (min < 10) min = "0" + min;
  // else min = min;
  return min + ":" + milisec_;
};

var done = false;
var mili = 0;
var Time,
  timearr = [];
var userName, Window;
function game() {
  budget = startnum - trash.length;
  background(240);
  fill(0, 120, 255);
  rect(175, 250, 350, 300);
  Trash();
  for (var i = 0; i < trash.length; i++) {
    if (over[i] && mouseIsPressed) {
      trash.splice(i, 1);
      num = trash.length;
      mouseIsPressed = false;
    }
  }

  if (trash.length > 0) Time = (millis() - mili) / 1000;
  else if (timearr.length == 0) {
    timearr.push(mili);
    Time = (millis() - timearr[0]) / 1000;
  }
  textSize(40);
  fill(255, 0, 0);
  text("Left:" + ceil(num), 100, 50);
  textSize(15);
  text("Budget: " + budget, 290, 25);
  text("Trash/sec ≈" + round(del * 60), 290, 45);
  text("Time:" + Inver(Time), 290, 65);
  stroke(0);
  line(350, 0, 350, 400);
  noStroke();
  textSize(25);
  text("Shop:", 430, 25);
  for (let i = 0; i < 5; i++) addon(80 + i * 60, i);

  if (trash.length < startnum && !done) {
    addTrash(startnum);
    background(0, 120);
    fill(255, 0, 0);
    textSize(50);
    text("loading trash...", 230, 200);
  } else {
    done = true;
    if (del != 0 && ceil(num) >= num && num > del) num -= del;
    if (num < del) num = 0;
    if (num > -1) trash.length = ceil(num);
  }

  button(70, 365, 120, 35, "Q.U.I.T.", () => (warn = true));

  if (warn) warnPopup();

  if (trash.length == 0) {
    background(0, 120);
    fill(255, 0, 0);
    textSize(50);
    text("You won!", 250, 140);
    textSize(20);
    fill(0, 200, 0);
    text(
      "Your time: " + Inver(Time) + "\nYour T/S: " + round(del * 60),
      250,
      200
    );
    noStroke();
    button(250, 260, 140, 35, "Restart", () => {
      startgame = true;
      diff = undefined;
    });
    button(250, 320, 140, 35, "Menu", () => {
      mouseReleased = function () {
        if (scene == "game" && hover(180, 303, 320, 337)) scene = "menu";        
      };
    });
  }
}

var startgame = true;
var diff;
function start() {
  background(220);
  fill(0);
  textSize(20);
  text("Choose difficulty: " + (diff ? diff : ""), 250, 80);
  textSize(16);
  text("(*: number of trash)\n(Lag warning for hard mode!)", 140, 360);

  if (diff) {
    fill(0);
    textSize(20);
    text("Timer will start when you click go!", 250, 200);
    button(250, 240, 180, 40, "GOOO!", () => {
      startgame = false;
      warn = false;
      while (trash.length > 0) {
        trash.pop();
        num = 0;
      }
      done = false;
      del = 0;

      if (diff == "Easy") startnum = 500;
      else if (diff == "Normal") startnum = 1000;
      else if (diff == "Hard") startnum = 3000;
      num = startnum;
      mili = millis();
      mouseIsPressed = false;
    });
  } else text("(Please choose your difficulty before starting)", 250, 220);

  button(90, 140, 150, 35, " Easy-500* ", () => (diff = "Easy"));
  button(250, 140, 150, 35, "Normal-1000*", () => (diff = "Normal"));
  button(410, 140, 150, 35, " Hard-3000* ", () => (diff = "Hard"));
  button(420, 360, 130, 35, "B.A.C.K.", () => {
    toScene = "menu";
    diff = undefined;
    num = 0;
    mili = 0;
  }, true);
}

function movText(txt, x, y, s) {
  textSize(s);
  fill(255, 55, 55);
  text(txt, x, sin(millis() / 500) * 10 + y);
}

function button(x, y, w, h, txt, f, transtf) {
  let addY = 0;
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  fill(200, 0, 0);
  rect(x, y + (h * 9) / 20, w, 12, 4);
  fill(235, 0, 0);
  if (hover(x - w / 2, y - h / 2, x + w / 2, y + h / 2, true)) {
    fill(255, 0, 0);
    if (mouseIsPressed) {
      addY = 3;
      if (transtf) doneTran = false;
      f();
    }
  }
  rect(x, y + addY, w, h, 5);
  textSize(h / 2 + 10 - txt.length / 2);
  fill(0);
  noStroke();
  text(txt, x, y + h / 25 + addY);
}

function menu() {
  background(250);
  noStroke();
  movText("W.H.A.L.E.", 200, 70, 40);
  movText("inc.", 365, 73, 30);
  textSize(20);
  fill(0);
  text("by DQG", width / 2, 120);

  button(250, 180, 220, 40, "P.L.A.Y.", () => {
    toScene = "game";
    startgame = true;
  }, true);
  button(250, 250, 220, 40, "H.O.W.", () => (toScene = "how"), true);
  button(250, 320, 220, 40, "A.B.O.U.T.", () => (toScene = "about"), true);
}

var clicked = false;
let test;
let a = 5;
function how() {
  frameRate(90);
  background(240);
  movText("H.O.W", width / 2, 40, 30);
  fill(0);
  textSize(15.5);
  text(
    "This is trash. Click to erase 🡪\n" + (clicked ? "See? EZ :))" : ""),
    180,
    130
  );
  if (!clicked) {
    if (floor(millis() / 100) % 2 == 0) {
      a = floor(random(trashType.length))
    } else a = a
    image(trashType[a], 420, 120);
  }
  if (!clicked && hover(420 - 30, 70, 420 + 30, 130) && mouseIsPressed) clicked = true;
  
  fill(0);
  text(
    "This is shop, clicking raise your Trash\nper sec (T/s) to clean trash faster 🡪",
    180,
    200
  );
  stroke(0);
  fill(0, 40);

  if (clicked) {
    noFill();
    if (hover(360, 170, 490, 230, true)) {
      noStroke();
      fill(255);
      rect(310, 200, 70, 40);
      fill(255);
      triangle(345, 210, 355, 200, 345, 190);
      fill(0);
      textSize(15);
      text("Add 69", 310, 200);
      stroke(0, 0, 255);
      fill(0, 0, 255);
      text("Name\n\n\n\n\nHow many trash\nit drops back", 425, 207);
      text("Add this\nto T/s", 310, 245);
      stroke(0);
      text("🡫\n\n\n🡩", 425, 200);
      text("🡩", 310, 221);

      noFill();
      stroke(0);
    }
  } else if (hover(360, 170, 490, 230)) {
    fill(0);
    text("Click the trash\nto 'unlock' this", 425, 255);
    fill(0, 40);
  }

  rect(425, 200, 130, 60);
  noStroke();
  textSize(16);
  fill(255, 0, 0);
  text("Click this??\n(Need 420)", 425, 200);

  fill(0);
  text(
    "T/s decreases a certain number of trash every second.\nThe bigger the T/s, the faster it will clean your trash!",
    250,
    300
  );
  fill(0, 0, 255);
  textSize(25);
  text("GOOD LUCK! :)", 120, 370);
}

function about() {
  background(240);
  movText("A.B.O.U.T", width / 2, 40, 30);
  fill(0);
  textSize(18);
  text(
    "W.H.A.L.E. inc. is an organization whose\ngoal is to remove trash out of the ocean to\nsave all of marine lives from extinction.\n\nThe name is an acronym for:",
    250,
    140
  );
  textAlign(LEFT);
  text(
    "𝗪orldwide\n𝗛azardless\n𝗔nnihilation (of)\n𝗟itter (for the)\n𝗘nvironment\n𝗜𝗻𝗰orporated",
    50,
    270
  );
  textAlign(CENTER);
  textSize(16);
  fill(255, 0, 0);
  text(
    "What does it mean?? Well,\nI've got no idea. :L\nDid it I spent an whole\nday figuring out the name?\n Definitely not :D",
    380,
    270
  );
  fill(0);
  textSize(15);
  text("Made in a week (12 hours total)\nfor #Seajam and #Teamseas!", 140, 380);
}

function draw() {
  noCursor();
  if (scene == "menu") menu();
  else if (scene == "game") {
    if (startgame) start();
    else game();
  } else if (scene == "how" || scene == "about") {
    if (scene == "about") about();
    else how();
    button(420, 370, 130, 30, "M.E.N.U.", () => (toScene = "menu"), true);
  }

  transit();
  if (tran > 0) scene = toScene;

  image(cur, mouseX + 16, mouseY + 7.5);
}