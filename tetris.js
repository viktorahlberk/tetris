let liveCounter = 1;
let cellCounter = 0



startNewGame()

function startNewGame() {

  createStartingHtmlTags();

    const grid = document.querySelector(".grid");
    let squares = Array.from(document.querySelectorAll(".grid div"));
    const scoreDisplay = document.querySelector("#score");
    scoreDisplay.innerHTML = "0000"
    const startButton = document.querySelector("#start_btn");
    const rowWidth = 10;
    let nextRandom = 0;
    let nextRandomColor = 0;
    let timerId; // moving down every second
    let timerIdd; // ingame timer
    let score = 0;
    
    let isGameStarted;

  //gameInit();
  
  createPauseMenu()

  
  
  function createPauseMenu(){  
    pauseDiv = document.createElement('div')
    let grid = document.querySelector('.grid')

    //creating PAUSE-MENU
    pauseDiv.style.backgroundColor = 'rgb(190, 232, 128)'
    pauseDiv.style.display = 'flex'
    pauseDiv.style.flexDirection = 'column'
    pauseDiv.style.opacity = '0%'
    pauseDiv.style.position = 'absolute'
    pauseDiv.style.width = '200px'
    pauseDiv.style.height = '400px'

    //creating RESUME button 
    resumeBtn = document.createElement('div')
    resumeBtn.style.width = '100px'
    resumeBtn.style.height = '20px'
    resumeBtn.style.backgroundColor = 'gray'
    resumeBtn.style.color = 'white'
    resumeBtn.style.margin = 'auto auto';
    //resumeBtn.style.border = "thick solid deepskyblue";
    resumeBtn.style.borderRadius = "20px";    
    resumeBtn.style.textAlign = 'center'
    resumeBtn.id = 'resume-btn'
    resumeBtn.innerHTML = 'resume'
    pauseDiv.appendChild(resumeBtn)

    //creating RESTART button
    restartBtn = document.createElement('div')
    restartBtn = document.createElement('div')
    restartBtn.style.width = '100px'
    restartBtn.style.height = '20px'
    restartBtn.style.backgroundColor = 'gray'
    restartBtn.style.color = 'white'
    restartBtn.style.margin = 'auto auto';
    restartBtn.style.border = "thin solid deepskyblue";
    restartBtn.style.borderRadius = "20px"
    restartBtn.style.textAlign = 'center'
    restartBtn.id = 'restart-btn'
    restartBtn.innerHTML = 'restart'
    pauseDiv.appendChild(restartBtn)    
    
    //grid = document.querySelector('#grid')
    grid.appendChild(pauseDiv)    
  }

  function createStartingHtmlTags() {
    const welcome = document.createElement('div')
    welcome.id = "welcome"
    welcome.textContent = 'Welcome. . . to TETRIS'
    document.body.appendChild(welcome)

    const mainContainer = document.createElement('div')
    mainContainer.id = "mainContainer"

    const gameArea = document.createElement('div')
    gameArea.id = "gameArea"

    const infoArea = document.createElement('div')
    infoArea.id = "infoArea"

    const infoAreaScore = document.createElement('div')
    infoAreaScore.id = "infoAreaScore"

    let h4score = document.createElement('h4')
    h4score.innerHTML = 'Score: '
    let spanScore = document.createElement('span')
    spanScore.id = 'score'
    h4score.appendChild(spanScore)
    infoAreaScore.appendChild(h4score)    

    let h4timer = document.createElement('h4')
    h4timer.innerHTML = 'Timer: '
    let spanTimer = document.createElement('span')
    spanTimer.id = 'timer'
    spanTimer.innerHTML = '--:--'
    h4timer.appendChild(spanTimer)
    infoAreaScore.appendChild(h4timer)    

    let h4lives = document.createElement('h4')
    h4lives.innerHTML = 'Lives: '
    let spanLives = document.createElement('span')
    spanLives.id = 'lives'
    spanLives.innerHTML = liveCounter
    h4lives.appendChild(spanLives)
    infoAreaScore.appendChild(h4lives)
    
    let startBtn = document.createElement('button')
    startBtn.id = 'start_btn'
    startBtn.innerHTML = 'Start!'
    infoAreaScore.appendChild(startBtn)

    let br = document.createElement('br')
    //let br2 = document.createElement('br')
    document.body.appendChild(br)
    //document.body.appendChild(br2)

    let grid = document.createElement('div')
    grid.classList.add('grid')    
     
    for (i = 1; i<=200; i++){
      let div = document.createElement('div')
      div.id='cell'
      grid.appendChild(div)
    }
    for (i = 1; i<=10; i++){
      let div = document.createElement('div')
      div.classList.add('taken')
      grid.appendChild(div)
    }

    let miniGrid = document.createElement('div')
    miniGrid.classList.add('mini-grid')

    for (i = 1; i<=16; i++){
      let div = document.createElement('div')
      miniGrid.appendChild(div)
    }

    let bann = document.createElement('span')
    bann.innerHTML = '.'
    bann.style.fontSize = 10 + 'px'
    bann.id = 'banner'
    bann.style.opacity = '0%'
    document.body.appendChild(bann)

    gameArea.appendChild(grid)
    infoArea.appendChild(miniGrid)

    infoArea.appendChild(infoAreaScore)
    mainContainer.appendChild(gameArea)
    
    mainContainer.appendChild(infoArea)
    document.body.appendChild(mainContainer)

    let gri = document.querySelectorAll('#cell')
        cellCounter = 0
        setInterval(function(){
          if (cellCounter<gri.length){
            gri[cellCounter].style.backgroundColor="rgb(203, 228, 166)"
            cellCounter++
          }
        },10)
  }

  let size = 10  
  fpsAnimation() 
  function fpsAnimation(){
    requestAnimationFrame(fpsAnimation)
    let banner = document.getElementById('banner')
    size++
    if (size>15){
      size = 10
    }
    banner.style.fontSize = size + 'px'
     
  }

  //timer
  const timerDisplay = document.querySelector("#timer");
  let timer = [0, 0];

  function updateTimer() {
    timer[1] += 1;
    if (timer[1] === 60) {
      timer[0] += 1;
      timer[1] = 0;
    }
    timerDisplay.innerHTML = timer[0] + "min " + timer[1] + "sec";
  }
  //you can add some other colors
  const colors = ["red", "orange", "green", "yellow", "blue", "white"];

  //tetrominoes
  const jTetromino = [
    [1, rowWidth + 1, rowWidth * 2 + 1, 2],
    [rowWidth, rowWidth + 1, rowWidth + 2, rowWidth * 2 + 2],
    [1, rowWidth + 1, rowWidth * 2 + 1, rowWidth * 2],
    [rowWidth, rowWidth * 2, rowWidth * 2 + 1, rowWidth * 2 + 2],
  ];
  const sTetromino = [
    [0, rowWidth, rowWidth + 1, rowWidth * 2 + 1],
    [rowWidth + 1, rowWidth + 2, rowWidth * 2, rowWidth * 2 + 1],
    [0, rowWidth, rowWidth + 1, rowWidth * 2 + 1],
    [rowWidth + 1, rowWidth + 2, rowWidth * 2, rowWidth * 2 + 1],
  ];
  const tTetromino = [
    [1, rowWidth, rowWidth + 1, rowWidth + 2],
    [1, rowWidth + 1, rowWidth + 2, rowWidth * 2 + 1],
    [rowWidth, rowWidth + 1, rowWidth + 2, rowWidth * 2 + 1],
    [1, rowWidth, rowWidth + 1, rowWidth * 2 + 1],
  ];
  const oTetromino = [
    [0, 1, rowWidth, rowWidth + 1],
    [0, 1, rowWidth, rowWidth + 1],
    [0, 1, rowWidth, rowWidth + 1],
    [0, 1, rowWidth, rowWidth + 1],
  ];
  const iTetromino = [
    [1, rowWidth + 1, rowWidth * 2 + 1, rowWidth * 3 + 1],
    [rowWidth, rowWidth + 1, rowWidth + 2, rowWidth + 3],
    [1, rowWidth + 1, rowWidth * 2 + 1, rowWidth * 3 + 1],
    [rowWidth, rowWidth + 1, rowWidth + 2, rowWidth + 3],
  ];
  const zTetromino = [
    [0, 1, rowWidth + 1, rowWidth + 2],
    [1, rowWidth, rowWidth + 1, rowWidth * 2],
    [0, 1, rowWidth + 1, rowWidth + 2],
    [1, rowWidth, rowWidth + 1, rowWidth * 2],
  ];
  const lTetromino = [
    [1, rowWidth + 1, rowWidth * 2 + 1, rowWidth * 2 + 2],
    [1, 2, 3, rowWidth + 1],
    [2, 3, rowWidth + 3, rowWidth * 2 + 3],
    [rowWidth + 3, rowWidth * 2 + 1, rowWidth * 2 + 2, rowWidth * 2 + 3],
  ];

  const tetrominoes = [
    lTetromino,
    zTetromino,
    tTetromino,
    oTetromino,
    iTetromino,
    sTetromino,
    jTetromino,
  ];
  let currentPosition = 4;

  random = Math.floor(Math.random() * tetrominoes.length);
  let randomColor = Math.floor(Math.random() * colors.length);
  let currentTetromino = tetrominoes[random][0];
  let currentRotation = 0;

  function draw() {
    currentTetromino.forEach((index) => {
      squares[currentPosition + index].classList.add("tetromino");
      squares[currentPosition + index].style.backgroundColor =
        colors[randomColor];
    });
  }
  function undraw() {
    currentTetromino.forEach((index) => {
      squares[currentPosition + index].classList.remove("tetromino");
      squares[currentPosition + index].style.backgroundColor = "";
    });
  }

  //key functions
  function keyUp(e) {
    if (e.keyCode === 38 || e.keyCode === 87) {
      rotateTetromino();
    } else if (e.keyCode === 27){
      pauseButtonHandler()
    }
  }  

  function keyDown(e) {
    if (e.keyCode === 40 || e.keyCode === 83) {
      moveDown();
    } else if (e.keyCode === 37 || e.keyCode === 65) {
      moveLeft();
    } else if (e.keyCode === 39 || e.keyCode === 68) {
      moveRight();
    }
  }  

  let now;
  let then = Date.now();
  let interval = 1000 / 1;
  let delta, dt;

  let time_now;
  let time_then = Date.now();
  let time_interval = 1000 / 1;
  let time_delta, time_dt;

  function gameLoop() {
    timerId = window.requestAnimationFrame(gameLoop);

    now = Date.now();
    delta = now - then;
    dt = delta / interval;
  
    if (delta > interval) {
      then = now - (delta % interval);  
      moveDown();
    }

    //timerId = window.requestAnimationFrame(gameLoop); // DAMN i was so long looking for this bug(should be upside) 
  }

  function timeLoop() {    
    time_now = Date.now();
    time_delta = time_now - time_then;
    time_dt = time_delta / time_interval;
  
    if (time_delta > time_interval) {
      time_then = time_now - (time_delta % time_interval);  
      updateTimer();
    }
    timerIdd = window.requestAnimationFrame(timeLoop);
  }  

  function moveDown() {
    score += 3
    scoreDisplay.innerHTML = score
    freeze();
    undraw();
    currentPosition += rowWidth;
    draw();
    
  }

  

  ///FIX ROTATION OF TETROMINOS A THE EDGE
  function isAtRight() {
    return currentTetromino.some(
      (index) => (currentPosition + index + 1) % rowWidth === 0
    );
  }

  function isAtLeft() {
    return currentTetromino.some(
      (index) => (currentPosition + index) % rowWidth === 0
    );
  }
  /*function isRightTetrominoNear(){
    return currentTetromino.some(
      (index) => (currentPosition + index) % rowWidth === 0
    );
  }*/

  function checkRotatedPosition(P) {
    P = P || currentPosition; //get current position.  Then, check if the piece is near the left side.
    if ((P + 1) % rowWidth < 4) {
      //add 1 because the position index can be 1 less than where the piece is (with how they are indexed).
      if (isAtRight()) {
        //use actual position to check if it's flipped over to right side
        currentPosition += 1; //if so, add one to wrap it back around
        checkRotatedPosition(P); //check again.  Pass position from start, since long block might need to move more.
      }
    } else if (P % rowWidth > 5) {
      if (isAtLeft()) {
        currentPosition -= 1;
        checkRotatedPosition(P);
      }
    }
    
  }

  function rotateTetromino() {
    const isBlocked = isWayBlocked()
    //console.log('way:', isWayBlocked())
    if (isBlocked){
      return
    }
    
    undraw();
    currentRotation++;
    if (currentRotation === currentTetromino.length) {
      currentRotation = 0;
    }
    currentTetromino = tetrominoes[random][currentRotation];
    checkRotatedPosition();
    draw();
    
    
  }
  function isWayBlocked(){
    let rotationClone = currentRotation+1
    
    if (rotationClone === 4){
      rotationClone = 0
    }
    let tetrominoClone = tetrominoes[random][rotationClone]

    if (tetrominoClone.some((index) =>
    squares[currentPosition + index].classList.contains("taken"))){
      return true
    }

    return false
    
  }
  function freeze() {
    if (
      currentTetromino.some((index) =>
        squares[currentPosition + index + rowWidth].classList.contains("taken")
      )
    ) {
      
      currentTetromino.forEach((index) =>
        squares[currentPosition + index].classList.add("taken")
      );

      //start new tetromino falling
      random = nextRandom;
      nextRandom = Math.floor(Math.random() * tetrominoes.length);
      randomColor = nextRandomColor;
      nextRandomColor = Math.floor(Math.random() * colors.length);

      currentTetromino = tetrominoes[random][currentRotation];
      currentPosition = 4;
      
      draw();
      displayShape();
      addScore();
      gameOver();
      
    }
  }
  function moveLeft() {
    undraw();
    const isAtLeftEdge = currentTetromino.some(
      (index) => (currentPosition + index) % rowWidth === 0
    );
    if (!isAtLeftEdge) {
      currentPosition -= 1;
    }
    if (
      currentTetromino.some((index) =>
        squares[currentPosition + index].classList.contains("taken")
      )
    ) {
      currentPosition += 1;
    }
    draw();
  }

  function moveRight() {
    undraw();
    const isAtRightEdge = currentTetromino.some(
      (index) => (currentPosition + index) % rowWidth === rowWidth - 1
    );
    if (!isAtRightEdge) {
      currentPosition += 1;
    }
    if (
      currentTetromino.some((index) =>
        squares[currentPosition + index].classList.contains("taken")
      )
    ) {
      currentPosition -= 1;
    }
    draw();
  }

  const displaySquares = document.querySelectorAll(".mini-grid div");
  const displayWidth = 4;
  let displayIndex = 0;

  const upNextTetrominoes = [
    [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 2 + 2],
    [0, 1, displayWidth + 1, displayWidth + 2],
    [1, displayWidth, displayWidth + 1, displayWidth + 2],
    [0, 1, displayWidth, displayWidth + 1],
    [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1],
    [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1],
    [1, displayWidth + 1, displayWidth * 2 + 1, 2],
  ];

  //displays next tetromino on mini-grid
  function displayShape() {
    displaySquares.forEach((square) => {
      square.classList.remove("tetromino");
      square.style.backgroundColor = "";
    });
    upNextTetrominoes[nextRandom].forEach((index) => {
      displaySquares[displayIndex + index].classList.add("tetromino");
      displaySquares[displayIndex + index].style.backgroundColor =
        colors[randomColor];
    });
  }    
  
  function reloadPage(){
    window.location.reload();
  }

  function startButtonHandler () {
    startButton.innerHTML = 'pause(ESC)'

    let colorchanger = document.querySelector('.grid')
    colorchanger.style.backgroundColor="rgb(203, 228, 166)"

    requestAnimationFrame(timeLoop);
    pauseDiv.style.opacity = '50%'    
    pauseDiv.style.opacity = '0%'
    requestAnimationFrame(gameLoop);

    if (!isGameStarted){
      nextRandom = Math.floor(Math.random() * tetrominoes.length);
    }    

    requestAnimationFrame(displayShape);

    document.addEventListener("keyup", keyUp);
    document.addEventListener("keydown", keyDown);

    resumeBtn.removeEventListener('click', startButtonHandler)
    restartBtn.removeEventListener('click', reloadPage)
    
    startButton.removeEventListener("click",startButtonHandler)
    startButton.addEventListener('click', pauseButtonHandler)
  }

  function pauseButtonHandler(){
    document.removeEventListener("keyup", keyUp);
    document.removeEventListener("keydown", keyDown);

    resumeBtn.addEventListener('click', startButtonHandler)
    restartBtn.addEventListener('click', reloadPage) // refresh page

    cancelAnimationFrame(timerId);
    timerId = 0;
    pauseDiv.style.opacity = '50%'    
   
    //clearInterval(timerIdd);
    cancelAnimationFrame(timerIdd);
    timerIdd = 0;    
  }
  
  startButton.addEventListener("click", startButtonHandler)
  

  function addScore() {
    for (let i = 0; i < 199; i += rowWidth) {
      const row = [
        i,
        i + 1,
        i + 2,
        i + 3,
        i + 4,
        i + 5,
        i + 6,
        i + 7,
        i + 8,
        i + 9,
      ];
      if (row.every((index) => squares[index].classList.contains("taken"))) {
        score += 333;
        scoreDisplay.innerHTML = score;
        row.forEach((index) => {
          squares[index].classList.remove("taken");
          squares[index].classList.remove("tetromino");
          squares[index].style.backgroundColor = "";
        });
        const squaresRemoved = squares.splice(i, rowWidth);
        squares = squaresRemoved.concat(squares);
        squares.forEach((cell) => grid.appendChild(cell));
      }
    }
  }

  function clearGrid() {
    const list = document.querySelector('body')

    while (list.hasChildNodes()) {
      list.removeChild(list.firstChild);
    }

  }
  function gameInit() {
    clearGrid();
    startNewGame();
  }


  async function gameOver() {    
    
    if (
      currentTetromino.some((index) =>
        squares[currentPosition + index].classList.contains("taken")
      )
    ) {    
      liveCounter--
      cancelAnimationFrame(timerId);
      cancelAnimationFrame(timerIdd);
      document.removeEventListener("keyup", keyUp);
      document.removeEventListener("keydown", keyDown);
      startButton.removeEventListener("click",pauseButtonHandler)      

      if (liveCounter > 0){
        gameInit()
      }else{
        const name = prompt('Enter your name for see scoreboard', 'player')
        let spanLives = document.getElementById('lives')
        spanLives.innerHTML = liveCounter
        scoreDisplay.innerHTML = "Game over with score - " + score;
        let t = document.getElementById('timer')
        //sendScore(name,score,t.innerHTML)
        //let scores = await getScores()
        /*let scores = await*/ sendScore(name,score,t.innerHTML)
        //showScores(scores)
        //console.log(scores)
        
        let gri = document.querySelectorAll('#cell')
        let i = 0
        setInterval(function(){
          if (i<gri.length){
            gri[i].style.backgroundColor="rgb(190, 232, 128)"
            i++
          }
        },200)

        //sleep(5000)
        //showScores(scores)

        /*setTimeout(function(){

          let main = document.getElementById('mainContainer')
      while (main.hasChildNodes()) {
        main.removeChild(main.firstChild);
      }
      let sb = document.createElement('div')
      sb.id="scoreboardContainer"

      for (score of scores){
        let row = document.createElement('div')
        row.innerHTML = 
        ` <div>${score.Name}</div>
          <div>${score.Score}</div>
          <div>${score.Time}</div>
        `
        sb.appendChild(row)
      }
      main.appendChild(sb)


        },5000)*/

      }      
    }
  }
}
function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}
async function getScores(){
  let resp = await fetch('/scores').then((res)=>res.json())
  console.log(resp)
  return resp

}
async function sendScore(name,score,time){
  await fetch("/scores", {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({name,score,time})
  })
  .then((r)=>r.json())
  .then((r)=>showScores(r))
  //.then((r)=>console.log(r))
  
  //.then((r)=>showScores(r))
}
function showScores(response){
    sleep(1000)
      let info = document.getElementById('infoArea')
      while (info.hasChildNodes()) {
        info.removeChild(info.firstChild);
      }
      
      let sb = document.createElement('div')
      sb.id="scoreboardContainer"
      sb.innerHTML = 
      `
      <div id=scoreHeader>
        <div id="scoreIndex"><b><u>#</u></b></div>
        <div id="scoreName"><b><u>Name</u></b></div>
        <div id="scoreScore"><b><u>Score</u></b></div>
        <div id="scoreTime"><b><u>Time</u></b></div>
      `
      info.appendChild(sb)
      let message = document.createElement('div')
      message.id="message"
      console.log(response)
      if  ( response.IsTopScore == true ){
        message.innerHTML=`Congratulations! You are on 1st place!<br>
        You beat <b>100%</b> of players!`       
      }else{
        if (response.Place == 0){
          message.innerHTML=`You are on <b>last<b/> place. What a shame!<br>
          You get <b>${response.Procent}%</b> of topscore!`
        }else{
          message.innerHTML=`You are on ${response.Place} place.<br>
          You get <b>${response.Procent}%</b> of topscore!`
        }
             
      }
      sb.appendChild(message)

      let index = document.getElementById('scoreIndex')
      let name = document.getElementById('scoreName')
      let scor = document.getElementById('scoreScore')
      let time = document.getElementById('scoreTime')
      let button = document.createElement('button')
      let num = 1
      for (score of response.ScoreBoard){

        let i = document.createElement('div')
        let n = document.createElement('div')
        let s = document.createElement('div')
        let t = document.createElement('div')
        
        i.innerHTML=`<div>${num}</div>`
        index.appendChild(i)
        n.innerHTML=`<div>${score.Name}</div>`
        name.appendChild(n)
        s.innerHTML=`${score.Score}`
        scor.appendChild(s)
        t.innerHTML=`${score.Time}`
        time.appendChild(t)
        num++

      }
      
      button.innerHTML="Restart game"
      button.addEventListener('click', () => window.location.reload())
      info.appendChild(button)
}
        
/*async function wave(){
  grid = document.querySelectorAll('#cell')
  console.log(grid)

  /*for (div of grid){
    sleep()
    div.style.backgroundColor='black'

  }
    
  for (let i=0;i<grid.length;i++){
    setTimeout(async function(){
        grid[i].style.backgroundColor='white';
        console.log(i)
    }, 1000);
}


}*/
      
