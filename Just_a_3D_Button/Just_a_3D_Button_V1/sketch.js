// p5.disableFriendlyErrors = true;
var scene = "menu";
var delag = false;

function preload() {
  tick = loadImage("tick.png");
  rpt = loadImage("mission.png");
  saber = loadImage("Saber.png");
  dp = loadImage("dudeperfect.png");
}

function setup() {
  createCanvas(600, 420);
  textAlign(CENTER, CENTER);
  rectMode(CENTER);
  angleMode(DEGREES);
  textFont("Consolas");

  advan[0] = new addAdv(false, 0, "Count to Ten!", "Get started with 10 pts");
  advan[1] = new addAdv(false, 0, "More Money!", "Get more than 1 pt/click");
  advan[2] = new addAdv(
    false,
    0,
    "Woah we're halfway there!",
    "Reach 500000 pts"
  );
  advan[3] = new addAdv(false, 0, "That's lucky!", "Get 142857 pts (🍀)");
  advan[4] = new addAdv(false, 0, "Dude Perfect!", "Get 8128 pts (perfect #)");
  advan[5] = new addAdv(false, 0, "May the 4th be with you!", "Get 124 pts");
  advan[6] = new addAdv(
    false,
    0,
    "Mission passed! Respect+",
    "Get 999999 pts (limit)"
  );
  advan[7] = new addAdv(false, 0, "STONKS!", "Reach 100000 pts/clk");
  advan[8] = new addAdv(false, 0, "JACKPOT!", "Reach 777 pts");
  advan[9] = new addAdv(false, 0, "DU DU DU DU", "Speedrun the game");
  advan[10] = new addAdv(false, 0, "Yes it's advancement", "Click me!!");
  advan[11] = new addAdv(false, 0, "VIRUS...", "REALLY!? VIRUS??");
  advan[12] = new addAdv(false, 0, "Become Elon (secret)", "YES");
}

var maxH = 170;

var score = 0;
var p_c = 1;

var advan = [];
var addAdv = function (tf, timer, rep1, rep2) {
  this.tf = tf;
  this.timer = timer;
  this.advs = rep1;
  this.advs1 = rep2;
};

var ptsPclk = [1, 2, 5, 10, 20, 50, 100, 150, 200, 500];
var moneyneed = [30, 50, 120, 220, 380, 780, 1480, 2140, 2600, 5500];

var done = true; //Checks if Transit() is done
var tran = -150;
var randomNum;
function transit() {
  var randoms = [
    "This message will NEVER ever appear on the splash screen, isn't that weird? (Wait, you can see this??)",
    "There are 13 advancements, with 3 hidden!",
    "Just get to 999999 to win speedrun!",
    "It is the BIG RED BUTTon :)",
    "AWESOME!!",
    "COOL AS A CUCUMBER!!",
    "99% b̸̨̥͐ú̶̌͜g̸̡̝͛ ̸͕́̓f̸̙̒r̴̟͋̕e̷̘͌͒e̸͚̽!!",
    "DEFINITELY a meme-free game!",
    "1% sugar!",
    '"Creeper, AWW MAN!"-Famous last words',
    "plz waer ya mask",
    "plz sanitize your hands!",
    "Get vaccinated!",
    ":) :D XD",
    'Say "cheeeseee!"',
    "CHEEESSEEEEEE",
    "EEEEEEEEEE",
    "Don’t worry, be happy!",
    '"red looks SUS"',
    "sussy baka",
    "AMOGUSSSSSSS",
    "lol",
    "ok boomer",
    "RIP Youtube Rewind 2010-2019",
    "...",
    "Limited edition!",
    "It's here!",
    "It's just a game!",
    "Yaaay!",
    "Wow!",
    '"a splash message"',
    '"a random splash"',
    "Water proof!",
    "sqrt(-1) love you!",
    "THIS ISS SPARTAAAA!",
    "01000010 01101001 01110100\n01110011 00100001",
    "-- --- .-. ... . -·-·--",
    "Warning: very addictive!!",
    "Déjà vu!",
    "εὕρηκα!",
    "lmao",
    "DREAMNOTFOUND <3",
    "This game is sponsored by...no one ;(",
    "Not sponsored by Skillshare",
    "Cookie clicker V2.0!",
    "cookie clicker ripoff",
    '"Oh, you dont know what Karlson is?? Pfff\nFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF-"',
    "hi",
    "hello",
    '"t𝓱𝐢ş 𝐢ş ⓕ🅰𝕌𝔩t𝕪"',
    '"drawkcab si sihT"',
    '"uʍoqǝqᴉsdn sᴉ sᴉɥ⊥"',
    "#BlackLivesMatter",
    "GG!!",
    "Dream VS Technoblade!",
    '"Not even close baby, TECHNOBLADE NEVER DIES!!!"',
    "#TechnoSupport <3",
    "If you see this then.... TYSM!!!",
    "To press, or not to press, that is the question!",
    "DONATE teamseas.org #TeamSeas!!",
    "#TeamTrees VS #TeamSeas",
  ];
  rectMode(CORNER);

  noStroke();
  if (!done) {
    if (tran < -145) {
      randomNum = floor(random(1, randoms.length));
    }
    tran += abs(tran) / 25 + 1.2;

    for (var i = 0; i < width; i += 50) {
      fill(255 - i / 4, 0, 0);
      rect(i, tran, 50, height + 50);
    }

    fill(0);
    textSize(20);
    text(randoms[randomNum], width / 2, tran + height / 1.5);
    textSize(31);
    text('DQG Presents "Just a 3D Button"', width / 2, tran + height / 2);
  }
  if (tran >= height) {
    done = true; //Reset
    tran = -150; //Reset
  }
  rectMode(CENTER);
}

function button(x, y, w, h, txt, f, transtf) {
  let add = 0;
  rectMode(CENTER);
  textAlign(CENTER, CENTER);
  fill(200, 0, 0);
  rect(x, y + (h * 9) / 20, w, 12, 4);
  fill(235, 0, 0);
  if (hover(x, y, -w / 2, w / 2, -h / 2, h / 2)) {
    fill(255, 0, 0);
    cursor(HAND);
    if (mouseIsPressed) {
      add = 3;
      if (transtf && !delag) done = false;
      if (tran < -145 || tran > 240) f();
    }
  }
  rect(x, y + add, w, h, 5);
  textSize(h / 2 + 10 - txt.length);
  fill(0);
  noStroke();
  textLeading(13);
  text(txt, x, y + h / 25 + add);
  textLeading(17);
}

function hover(x, y, p1x, p2x, p1y, p2y) {
  return (
    mouseX >= x + p1x &&
    mouseX <= x + p2x &&
    mouseY >= y + p1y &&
    mouseY <= y + p2y
  );
}

var speedrun = false,
  warn = false;
var minustime,
  won = false;
var stop = [];
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

var userName, myWindow;

function slot(x, y, num) {
  fill(106, 149, 242);
  rect(x, y, 70, 20, 2);
  fill(0);
  textSize(14);
  text("+" + ptsPclk[num] + "/clk", x, y);
  if (hover(x, y, -35, 35, -10, 10)) {
    fill(255);
    rect(x, y - 25, 60, 22);
    triangle(x - 5, y - 15, x, y - 10, x + 5, y - 15);
    fill(0);
    textSize(15);
    text(moneyneed[num] + "pts", x, y - 25);
    if (score < moneyneed[num]) text("🔒", x - 40, y - 25);

    mouseClicked = function () {
      if (hover(x, y, -35, 35, -10, 10) && score >= moneyneed[num]) {
        p_c += ptsPclk[num];
        score -= moneyneed[num];
      }
    };
  }
}
function shop() {
  fill(64, 194, 75);
  rect(500, 270, 170, 240, 2);

  fill(255, 127, 0);
  rect(420, 180, 80, 45, 12, 2, 2, 2);

  noStroke();
  fill(0);
  textSize(30);
  text("Shop", 420, 180);

  for (let i = 220; i < 390; i += 35) {
    slot(460, i, ((i - 220) / 35) * 2);
    slot(540, i, ((i - 220) / 35) * 2 + 1);
  }
}

function movText(txt, x, y) {
  if (delag) textSize(35);
  else textSize(sin(frameCount * 5) * 5 + 40);
  fill(255, 55, 55);
  text(txt, x, y);
}

var btnY = 300;
function menu() {
  if (btnY > 0) btnY -= 6;
  else btn = 0;
  noStroke();
  movText("Just a 3D Button!", width / 2, 70);
  textSize(20);
  fill(0);
  text("by DQG", width / 2, 120);

  if ((tran > 0 && done == false) || done == true) {
    button(300 - btnY, 200, 220, 40, "PLAY", () => (scene = "game"), true);

    button(300 + btnY, 270, 220, 40, "HOW", () => (scene = "how"), true);

    button(510, 390, 160, 32, "ADVANCEMENTS", () => (scene = "adv"), true);
  }
  textSize(17);
  if (hover(80, 400, -50, 50, -8, 8)) {
    textSize(15);
    text("(Turns off background color,\nmoving texts, particles...)", 250, 395);
    textSize(20);
    mouseClicked = function () {
      if (hover(80, 400, -50, 50, -8, 8)) delag = !delag;
    };
  }
  fill(0);
  text("DELAG:" + (delag ? "✔️" : "❌"), 80, 400);
}

function how() {
  if (mouseIsPressed && hover(120, 270, -30, 30, -30, 30)) {
    advan[10].tf = true;
  }

  noStroke();
  movText("How:", width / 2, 50);

  GameButton(90, 170, 2);
  noFill();
  noStroke();
  slot(90, 320, 0);

  fill(0);
  textSize(15);
  text("🡨 This is the BIG BUTTon\nwhich gives you points! :)", 270, 160);
  advance(110, 250, "Just\nan adv", () => {}, 10);
  textSize(15);
  fill(0);
  noStroke();
  text(
    "🡨 This is an advancement.\n" +
      (advan[10].tf ? "Now with 'New' and ✔️" : "Try clicking it!"),
    270,
    250
  );
  text("🡨 A shopping slot\nHover on it! :)", 220, 330);
  if (hover(90, 320, -35, 35, -10, 10)) {
    textSize(15);
    text("🡨 Price", 160, 295);
    text("🔒🡪not enough", 90, 345);
  }

  if (advan[10].tf && advan[10].timer < 25) {
    textSize(13);
    text("New advancement alert.\n(Appears ≈8 sec)", 495, 50);
    textSize(20);
    text("🡳", 580, 60);
  }
  stroke(0);
  line(380, 110, 380, 330);
  noStroke();
  fill(255, 0, 0);
  textSize(13);
  textLeading(20);
  strokeWeight(0.4);
  stroke(255, 0, 0);
  text(
    "Points/click (or pts/clk)\nincreases your pts. You start\nwith 1 pts/clk but you can\nincrease it with 'shop slots'.\n\nThe point of this game?? Well,\nin normal mode you can win by\nachieving all advancements (3\nsecrets). In speedrun mode,\njust reach 999,999 (limit)!",
    490,
    230
  );
  strokeWeight(1);
  noStroke();
  textSize(20);
  fill(0, 0, 255);
  text("Good luck! >:)", 480, 390);
}

function GameButton(x, y, pressSpeed) {
  stroke(148);
  fill(200);
  for (let i = y; i > y - 10; i--) {
    rect(x, i, 130, 80, 3);
  }

  if (hover(x, y, -60, 60, -60, -10)) cursor(HAND);

  if (hover(x, y, -60, 60, -60, -10) && mouseIsPressed) {
    for (let i = y + 30; i > maxH; i--) {
      stroke(230, 0, 0);
      fill(255, 0, 0);
      ellipse(x, i - 40, 100, 50);
    }
    if (maxH < y + 20) maxH += pressSpeed;

    mouseReleased = function () {
      if (hover(x, y, -60, 60, -60, -10) && scene == "game") {
        score += p_c;
      }
    };
  } else {
    for (let i = y + 30; i > maxH; i--) {
      stroke(230, 0, 0);
      fill(255, 0, 0);
      ellipse(x, i - 40, 100, 50);
    }
    if (maxH !== y) maxH -= pressSpeed;
  }
}

var advWarn = function (num) {
  if (advan[num].timer < 75 && advan[num].tf) {
    advan[num].timer += 1 / 20;
    if (advan[num].timer < 25) {
      stroke(255, 0, 0);
      strokeWeight(2);
      fill(255);
      rect(500, 90, 200, 40, 2);
      strokeWeight(1);
      noStroke();
      textSize(15);
      fill(0, 0, 255);
      text("New Advancement:", 500, 82);
      textSize(14);
      fill(255, 0, 0);
      text(advan[num].advs, 500, 100);
    }
  }
};

function advance(x, y, txt, f, num) {
  noFill();
  stroke(0);
  rect(x, y, 50, 50, 2);
  fill(0);
  noStroke();
  textSize(40 / txt.length + 10);
  text(txt, x, y);
  f();
  if (advan[num].tf) {
    textSize(18);
    text("✔️", x + 25, y - 25);
    if (advan[num].timer < 75) {
      fill(255, 0, 0);
      stroke(255, 0, 0);
      strokeWeight(0.5);
      textSize(13);
      text("NEW", x - 12, y - 25);
      strokeWeight(1);
    }
  }

  if (hover(x, y, -25, 25, -25, 25)) {
    noStroke();
    fill(255);
    rect(x, y - 65, 225, 50);
    triangle(x - 15, y - 40, x, y - 25, x + 15, y - 40);
    fill(255, 0, 0);
    textSize(16);
    text(advan[num].advs, x, y - 75);
    fill(0);
    textSize(14);
    text(advan[num].advs1, x, y - 55);
  }
}

function Advances(x, y, space) {
  //x: 105    y:285
  advance(x, y, "GS", () => {}, 0);
  advance(x + space, y, "🤑", () => {}, 1);
  advance(
    x + space * 2,
    y,
    "",
    () => {
      stroke(0);
      strokeWeight(3);
      noFill();
      rect(x + space * 2, y, 20, 40);
      fill(0);
      rect(x + space * 2, y + 7.5, 10, 15);
      strokeWeight(1);
    },
    2
  );

  advance(x + space * 3, y, "🎰", () => {}, 8);
  advance(x + space * 4, y, "Ohhhh\nDREAMM", () => {}, 9);

  advance(x, y + 60, "📈", () => {}, 7);
  advance(x + space, y + 60, "142,\n857", () => {}, 3);
  advance(
    x + space * 2,
    y + 60,
    "",
    () => image(dp, x + space * 2 - 25, y + 60 - 24, 50, 50),
    4
  );
  advance(
    x + space * 3,
    y + 60,
    "",
    () => image(saber, x + space * 3 - 26, y + 60 - 15, 52, 33),
    5
  );
  advance(
    x + space * 4,
    y + 60,
    "",
    () => image(rpt, x + space * 4 - 25, y + 60 - 25, 50, 50),
    6
  );
}

var ee2 = 0;
function Advancements() {
  Advances(140, 150, 80);
  noFill();
  stroke(0);
  rect(width / 2, 300, 240, 100);
  fill(0);
  noStroke();
  textSize(18);
  text("Secret Advancements:", width / 2, 265);
  advance(220, 310, "Just\nan adv", () => {}, 10);
  if (advan[11].tf) {
    advance(300, 310, "Easter\nEgg 1!", () => {}, 11);
  }
  if (advan[12].tf) {
    advance(380, 310, "Easter\nEgg 2!", () => {}, 12);
  }

  if (mouseButton == RIGHT) {
    if (mouseIsPressed && ee2 == 120) ee2 = 0;

    if (ee2 < 80) {
      ee2++;
      noFill();
      stroke(0);
      rect(mouseX, mouseY, 240, 20);
      fill(0);
      textSize(12);
      text("Rightclick here to get virus >:)", mouseX, mouseY);
      if (mouseIsPressed && mouseButton == RIGHT && ee2 > 15) {
        advan[11].tf = true;
      }
    } else ee2 = 120;
  }
}

var Inver = function (milisec) {
  milisec_ = floor((milisec % 60) * 100) / 100;
  if (milisec_ < 10) milisec_ = "0" + floor(milisec_ * 100) / 100;

  var min = floor(floor(milisec / 10) / 6);
  if (min < 10) min = "0" + min;
  else min = min;
  return min + ":" + milisec_;
};

var code = ["qwszyeropf", "avhkbnmzlj", "yxlmzcduig"];
var changeCode = function (num) {
  let numstr = floor(num).toString();
  let finalCode = "";
  for (let i = 0; i < numstr.length; i++) {
    finalCode += code[i % 3][numstr[i]];
    if (finalCode.length == numstr.length) {
      finalCode += "t";
      finalCode += code[0][floor((num % 1) * 10)];
    }
  }
  return finalCode;
};

function game() {
  GameButton(200, 170, 2, 2.5);
  if (score > 999999) score = 999999;

  noStroke();
  fill(255);
  rect(200, 40, 360, 60, 3);

  shop();
  fill(64, 194, 75);
  rect(210, 325, 340, 130, 2);
  fill(255, 127, 0);
  rect(40, 325, 40, 105, 15, 2, 2, 2);

  noStroke();
  textSize(50);
  fill(255, 0, 0);
  text("Points:" + score, 200, 45);
  fill(0);
  textSize(20);
  text("Pts/clk:" + p_c, 200, 85);

  fill(0);
  textSize(30);
  textLeading(25);
  text("A\nd\nv\ns", 40, 325);
  Advances(105, 295, 60);

  if (score >= 10) advan[0].tf = true;
  if (p_c > 1) advan[1].tf = true;
  if (score >= 500000) advan[2].tf = true;
  if (score >= 142857) advan[3].tf = true;
  if (score >= 8128) advan[4].tf = true;
  if (score >= 124) advan[5].tf = true;
  if (score >= 999999) advan[6].tf = true;
  if (p_c >= 100000) advan[7].tf = true;
  if (score >= 777) advan[8].tf = true;
  if (won == true) advan[9].tf = true;
  if (p_c >= 1000000) advan[12].tf = true;

  if (speedrun) button(455, 20, 88, 30, "Cancel", () => (warn = true));
  else button(455, 20, 88, 30, "Speedrun", () => (warn = true));

  if (!speedrun) {
    button(555, 20, 80, 30, "MENU", () => (scene = "menu"), true);
  } else {
    noFill();
    stroke(0);
    rect(60, 150, 120, 80, 0, 5, 5, 0);

    let time2dis = round(millis() - minustime) / 1000;
    if (score == 999999 && !won) {
      stop.push(time2dis);
      won = true;
    }

    noStroke();
    textSize(19);
    textAlign(LEFT);
    fill(0);
    if (!won) text(Inver(time2dis), 20, 125);
    else {
      fill(255, 0, 0);
      text(Inver(stop[0]), 20, 125);

      if (particles.length < 120 && !delag) {
        particles.push({
          x: random(50, width - 50),
          y: -10,
          w: 5,
          h: 5,
          velx: random(-0.5, 0.5),
          vely: 0,
          gravity: 0.01,
          angle: random(-90, -270),
          color: color(random(30), random(50, 255), random(30)),
        });
      }
      textAlign(CENTER);
      fill(255);
      rect(width / 2, height / 2, 350, 195, 5);
      button(460, 130, 20, 15, "×", () => (warn = true));
      textSize(25);
      fill(255, 0, 0);
      text("You finished!! YEAH!!", width / 2 - 15, 140);
      fill(0);
      textSize(20);
      text("Your time: " + Inver(stop[0]) + "!", width / 2, 180);

      button(
        width / 2,
        220,
        120,
        35,
        userName ? "Show my\ncertifi" : "Share\nmy score!",
        () => {
          mouseReleased = function () {
            if (
              hover(width / 2, 220, -60, 60, -35 / 2, 35 / 2) &&
              scene == "game" &&
              won
            ) {
              if (userName == undefined || userName == "") {
                userName = prompt(
                  "What's your name?? (You can only choose once!!)"
                );
              }
              myWindow = window.open("");
              myWindow.document.write(
                "<head><style>body {" +
                  "text-align:center;" +
                  "background-color: rgb(64, 194, 75);" +
                  "font-family: Consolas, sans-serif;}" +
                  "div {" +
                  "margin:auto;" +
                  "align: center;" +
                  "width: 600px;" +
                  "border: 4px ridge red;}" +
                  "div p, h3 {margin: 5px 10px;}" +
                  "h3 {" +
                  "text-align:CENTER;" +
                  "padding: 5px 0px 10px 0px;" +
                  "margin-bottom: 10px;" +
                  "border-bottom: 2px solid black;}" +
                  "input[type=text] {" +
                  "padding: 5px 10px;" +
                  "margin: 25px 0;" +
                  "display: inline-block;" +
                  "border: 1px solid #ccc;" +
                  "border-radius: 4px;" +
                  "box-sizing: border-box;" +
                  "font-size:16px;}" +
                  "</style></head>" +
                  "<body><br>" +
                  '<h2 align="CENTER">Hello!</h2>' +
                  '<p>Hey there!!! Just wanna say THANKS <b>A LOT</b> for playing my game!! :)<br>Here is the <i>"certificate"</i> :P for completing it!<br>Screenshot from down there to the end and share it<br>with anyone you like or sent it to me through itch.io 🡫</p><br>' +
                  '<div><h3 style="border: ">CERTIFICATE OF COMPLETION:</h3><br><p>This "certification" is awarded to <br><br><span style="font-size: 30px;color:red;"><b>' +
                  userName +
                  '</b></span><br><br>For: <i style="text-decoration:underline;">Speedrunning "Just a 3D Button"</i><br>in an <b>excellent</b> time of <u><em style="font-size:20px;">' +
                  (Inver(stop[0]) + "</em></u>!</p><br>") +
                  ("Verification code: #" + changeCode(stop[0])) +
                  ("<br><i>DATE: " + day() + "/" + month() + "/" + year()) +
                  '</i><br><br><p style="text-align: center;"><b>Author Signature: <i style="text-decoration: underline;">DQG</i> —————— Player Signature: <i style="text-decoration: underline;">' +
                  (userName + "</i></b></p></div></body>")
              );
            }
          };
        }
      );

      button(210, 270, 110, 30, "Restart", () => (warn = true));
      button(390, 270, 110, 30, "Menu", () => (scene = "menu"), true);
      text("or", 300, 270);

      Particle(particles);
    }
    fill(255, 0, 0);
    textSize(13);
    textAlign(CENTER, CENTER);
    text("(Get to 999999\nto stop timer)", 60, 160);
  }

  if (warn) {
    background(0, 220);
    fill(255, 0, 0);
    textSize(35);
    text((speedrun ? "Dis" : "En") + "able Speedrun mode?", width / 2, 110);
    if (!speedrun) {
      textSize(15);
      stroke(255, 0, 0);
      text('(The timer will start when you click "Yes")', width / 2, 20);
      noStroke();
    }
    textSize(20);
    fill(0, 255, 0);
    text(
      "(You will start from the beginning" +
        (advan[9].tf ? "\nbut the speedrun advs will be kept)" : ".)"),
      width / 2,
      210
    );
    textSize(30);
    text("Continue??", width / 2, 290);

    button(200, 360, 80, 30, "Yes", () => {
      speedrun = !speedrun;
      warn = false;
      score = 0;
      p_c = 1;
      for (var i = 0; i < advan.length - 4; i++) {
        advan[i].tf = false;
        advan[i].timer = 0;
      }
      if (speedrun) minustime = millis();
      else minustime = 0;
      stop = [];
      won = false;
      userName = undefined;
      particles = [];
    });
    button(400, 360, 80, 30, "No!", () => (warn = false));
  }
}

function Background(topCol, midCol) {
  strokeWeight(5);
  for (var i = 0; i <= width * 1.22; i += 5) {
    push();
    rotate(-45);
    translate(-300, 0);
    stroke(lerpColor(i < width ? topCol : midCol, midCol, (i / width) % 1));
    line(i, 0, i, height * 2);
    pop();
  }
  strokeWeight(1);
}

function draw() {
  cursor(AUTO);
  if (!delag) Background(color(240), color(170));
  else background(220);
  if (scene == "menu") menu();
  else {
    if (scene == "game") game();
    else {
      if (scene == "how") how();
      else if (scene == "adv") Advancements();
      noStroke();
      button(300, 385, 100, 40, "BACK", () => (scene = "menu"), true);
    }

    for (var i = 0; i < advan.length; i++) {
      if (!warn) advWarn(i);
    }
  }
  if (!delag) transit();
}
