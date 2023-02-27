var appleScore = 0;
var orangeScore = 0;

var gameState = 1

function preload() {
  bgImg = loadImage("assets/backgrounf.png");

  appleImg = loadImage("assets/player1-removebg-preview-removebg-preview.png");
  orangeImg = loadImage("assets/player2-removebg-preview.png");
  sunImg = loadImage("assets/sun-removebg-preview.png");

  bowImg = loadImage("assets/player2_weapon-removebg-preview.png");
  gunImg = loadImage("assets/player1_weapon-removebg-preview.png");
  bulletImg = loadImage("assets/bullet-removebg-preview.png");
  arrowImg = loadImage("assets/arrow-removebg-preview.png");

  orangeSheildImg = loadImage("assets/orange_shield-removebg-preview.png");
  appleSheildImg = loadImage("assets/apple_shield-removebg-preview.png");
  bgImg1 = loadImage("assets/intro-2.png");

  boomImg = loadImage("assets/boom-removebg-preview.png");

}

function setup() {
  createCanvas(1200, 440);



  bg = createSprite(width / 2, height / 2, width, height);
  bg.addImage(bgImg);


  apple = createSprite(200, height / 2 + 60);
  apple.addImage(appleImg);
  apple.scale = 0.6

  orange = createSprite(width - 100, height / 2 + 60);
  orange.addImage(orangeImg);
  orange.scale = 0.6

  sun = createSprite(400, 100);
  sun.addImage(sunImg);

  bow = createSprite(1030, 270);
  bow.addImage(bowImg);
  bow.scale = 0.7;

  gun = createSprite(250, 250);
  gun.addImage(gunImg);
  gun.scale = 0.7;

  bulletGroup = new Group()
  arrowGroup = new Group()
  appleSheildGroup = new Group()
  orangeSheildGroup = new Group()

  bg1 = createSprite(width / 2 + 100 , height / 2 +100 , width, height);
  bg1.addImage(bgImg1);
  bg1.scale = 0.7


  //appleScore=0;
  //orangeScore=0;
}

function draw() {
  background(0);
  //text("Apple's score: "+ appleScore, 200,100);
  //text("Orange's score: "+ orangeScore, 800,100);

  // for the red player (the one on the left side)/gun and bullets

  drawSprites()

  if (keyDown("space")) {
    bg1.destroy()
    gameState = 2
  }

  if (gameState == 2) {

    if (keyIsDown(RIGHT_ARROW)) {
      bullet = createSprite(gun.x + 60, gun.y);
      bullet.addImage(bulletImg);
      bullet.velocityX = 4
      bullet.scale = 0.24;
      bulletGroup.add(bullet)
    }


    // for the blue player (the one on the right side)/bow & arrow
    if (keyIsDown(LEFT_ARROW)) {
      arrow = createSprite(bow.x - 60, bow.y);
      arrow.addImage(arrowImg);
      arrow.velocityX = -4
      arrow.scale = 0.5;
      arrowGroup.add(arrow)
    }

    if (bulletGroup.isTouching(arrowGroup)) {
      console.log("hi")
      bulletGroup.destroyEach()
      arrowGroup.destroyEach()

      boom = createSprite(bullet.x , bullet.y );
      boom.addImage(boomImg);
      boom.scale = 0.5

      swal(
        {
          title: `Game Over!!!`,
          imageUrl: "https://raw.githubusercontent.com/unsmartly/playagain/main/play_again_notification.png",
          imageSize: "150x150",
          confirmButtonText: "Play Again"
        },
        function (isConfirm) {
          if (isConfirm) {
            location.reload();
          }
        }
      );

    }

    if (keyIsDown(UP_ARROW)) {
      createSheild()
    }

    setTimeout(() => {
      appleSheildGroup.destroyEach()
    }, 3000)


    if (keyIsDown(DOWN_ARROW)) {
      createSheildOrange()
    }

    setTimeout(() => {
      createSheildOrange.destroyEach()
    }, 3000)


    if (appleSheildGroup.isTouching(arrowGroup)) {
      appleSheildGroup.destroyEach()
      arrowGroup.destroyEach()
      orangeScore -= 1
    }
    if (orangeSheildGroup.isTouching(bulletGroup)) {
      orangeSheildGroup.destroyEach()
      bulletGroup.destroyEach()
      appleScore -= 1
      
    }
    if (orangeSheildGroup.isTouching(arrowGroup)) {
      arrowGroup.destroyEach()
    }
    if (appleSheildGroup.isTouching(bulletGroup)) {
      bulletGroup.destroyEach()
    }

    if (arrowGroup.isTouching(apple)) {
      arrowGroup.destroyEach()
      orangeScore = orangeScore + 1;
    }

    if (bulletGroup.isTouching(orange)) {
      bulletGroup.destroyEach()
      appleScore = appleScore + 1;
    }

    if (appleScore > orangeScore) {
      winner = "Apple Wins"
    }
    else if (appleScore < orangeScore) {
      winner = "Orange Wins"
    }
    else {
      winner = "Its a Tie!!"
    }

    setTimeout(function () {
      swal(
        {
          title: `Time Over!!!`,
          text: winner,
          imageUrl: "https://raw.githubusercontent.com/unsmartly/playagain/main/play_again_notification.png",
          imageSize: "150x150",
          confirmButtonText: "Play Again"
        },
        function (isConfirm) {
          if (isConfirm) {
            location.reload();
          }
        }
      );
    }, 30000)


    // for Mr.orange
    textSize(30)
    fill("blue")
    text("Score : " + orangeScore, width - 150, 30)

    // for Mr.apple
    textSize(30)
    fill("red")
    text("Score : " + appleScore, 50, 30)
  }
}

function createSheild() {
  appleSheild = createSprite(gun.x + 60, gun.y);
  appleSheild.addImage(appleSheildImg);
  appleSheildImg.scale = 0.7;
  appleSheildGroup.add(appleSheild)
}
function createSheildOrange() {
  orangeSheild = createSprite(bow.x + -60, bow.y);
  orangeSheild.addImage(orangeSheildImg);
  orangeSheildImg.scale = 0.7;
  orangeSheildGroup.add(orangeSheild)
}