const ROWS = 4;
const COLS = 4;

const startGrid = () => {
  const emptyCell = () => Array(4).fill().map(() => ({number: '0', lock: false}))
  const g = []
  while (g.length < 4) {
    g.push(emptyCell());
  }

  //firts Random number
  const firtsEmptyPositions = getEmptyPositions(g)
  const { randomPosition: pos1, randomNum: num1 }= randomNumberGenerator(firtsEmptyPositions)
  const { randomPosition: pos2, randomNum: num2 } = randomNumberGenerator(firtsEmptyPositions.filter(index => index != pos1))

  
  const getIndex1dTo2d = (index) => [Math.floor(index / ROWS), (index % COLS)]
 
  const [row1, col1] = getIndex1dTo2d(pos1);
  const [row2, col2] = getIndex1dTo2d(pos2)

  g[row1][col1].number = num1;
  g[row2][col2].number = num2;
  return g;
}

const getEmptyPositions = (grid) => {
  const emptyPositions = grid.flat().map((element, index) => {
    if (element.number === '0') {
      return index;
    }
    return null;
  }).filter(index => index !== null);
  //console.log(`Empty positions are ${emptyPositions}`);
  return emptyPositions;
}

const randomNumberGenerator = (positionsAvailable) => {
  const randomNum = Math.random() < 0.9 ? 2 : 4
  if (positionsAvailable.length === 0) {
    alert("There are not positions available!!!!");
    return (-1);
  }
  let randomPosition = Math.floor(Math.random() * 16);
  while (!positionsAvailable.some(pos => pos === randomPosition)) {
    randomPosition = Math.floor(Math.random() * 16)
  }
  //console.log(`random Position; ${randomPosition}, randomNum: ${randomNum}`)
  return {randomPosition, randomNum: randomNum.toString()};
}

let grid = startGrid();
let pastGrid =  null;
const gridConteiner = document.getElementById('grid-container');
const scoreSpan = document.getElementById('score');
const bestScoreSpan = document.getElementById('bestScore');
let lastScore = 0;

const printGrid = () => {
  gridConteiner.innerHTML = '';
  grid.flat().forEach((element, id) => {
    const cellDiv = document.createElement('div');
    const numberText =  document.createElement('text');

    const num = element.number;

    cellDiv.classList.add(
      'w-16', 'h-16', 'bg-amber-200', 'text-center', 'flex', 'items-center', 'justify-center', 'hover:animate-spin', 'rounded-lg'
    );
    cellDiv.dataset.row = id;

    // Assign color class based on tile value
    let colorClass = '';
    switch (num) {
      case '2': colorClass = 'bg-gray-200'; break;
      case '4': colorClass = 'bg-yellow-100'; break;
      case '8': colorClass = 'bg-yellow-300'; break;
      case '16': colorClass = 'bg-orange-300'; break;
      case '32': colorClass = 'bg-orange-400'; break;
      case '64': colorClass = 'bg-orange-500'; break;
      case '128': colorClass = 'bg-yellow-400'; break;
      case '256': colorClass = 'bg-yellow-500'; break;
      case '512': colorClass = 'bg-yellow-600'; break;
      case '1024': colorClass = 'bg-yellow-700'; break;
      case '2048': colorClass = 'bg-yellow-800'; break;
      default: colorClass = 'bg-gray-400';
    }
    let colorText = (num === '4' || num === '2') ? 'text-black' : 'text-white'
    numberText.classList.add(colorText, 'w-16', 'h-16', colorClass, 'rounded-lg', 'flex', 'justify-center', 'items-center', 'font-bold')
    numberText.textContent = num === '0' ? ' ' : element.number;

    cellDiv.appendChild(numberText)
    gridConteiner.appendChild(cellDiv);
  })
}

printGrid();



const unlockElements = (tempGrid) => {
  return tempGrid.map(row => row.map(cell => ({...cell, lock: false})))
}


const deepCopyGrid = (grid) => {
  return grid.map(row => row.map(cell => ({...cell})));
};

const updateGrid = (key) => {
  let totalSum = Number(scoreSpan.textContent);
  lastScore = Number(scoreSpan.textContent);
  const tempGrid = deepCopyGrid(grid);
  pastGrid = deepCopyGrid(grid)
  if (key === 'ArrowUp') {
    //console.log("Up")
    for (let col = 0; col < COLS; col++) 
    {
      for (let row = 0; row < ROWS; row++) 
      {
        if (tempGrid[row][col].number !== '0') {
          let rowNewPos = row;
          while (rowNewPos > 0 && tempGrid[rowNewPos - 1][col].number === '0') {
            rowNewPos--;
          }
          if (rowNewPos !== row) {
            tempGrid[rowNewPos][col].number = tempGrid[row][col].number;
            tempGrid[row][col].number = '0';
          }
          if (rowNewPos > 0) {
            const checkIfEqual = tempGrid[rowNewPos][col].number === tempGrid[rowNewPos - 1][col].number
            if (checkIfEqual && !tempGrid[rowNewPos - 1][col].lock) {
              tempGrid[rowNewPos - 1][col].number = String(2 * Number(tempGrid[rowNewPos][col].number))
              tempGrid[rowNewPos][col].number = '0';
              tempGrid[rowNewPos - 1][col].lock = true
              totalSum += Number(tempGrid[rowNewPos - 1][col].number)
            }
          }
        }
      }
    }
  } else if (key === 'ArrowDown') {
    //console.log("Down");
    for (let col = 0; col < COLS; col++) 
    {
      for (let row = 3; row >= 0; row--) 
      {
        if (tempGrid[row][col].number !== '0') {
          let rowNewPos = row;
          while (rowNewPos + 1 < ROWS && tempGrid[rowNewPos + 1][col].number === '0') {
            rowNewPos++;
          }
          if (rowNewPos !== row) {
            tempGrid[rowNewPos][col].number = tempGrid[row][col].number;
            tempGrid[row][col].number = '0';
          }
          if (rowNewPos + 1 < ROWS) {
            const checkIfEqual = tempGrid[rowNewPos][col].number === tempGrid[rowNewPos + 1][col].number
            if (checkIfEqual && !tempGrid[rowNewPos + 1][col].lock) {
              tempGrid[rowNewPos + 1][col].number = String(2 * Number(tempGrid[rowNewPos][col].number))
              tempGrid[rowNewPos][col].number = '0';
              tempGrid[rowNewPos + 1][col].lock = true
              totalSum += Number(tempGrid[rowNewPos + 1][col].number)
            }
          }
        }
      }
    }

  } else if (key === 'ArrowLeft') {
    //console.log("Left")
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        if (tempGrid[row][col].number !== '0') {
          let colNewPos = col;
          while (colNewPos > 0 && tempGrid[row][colNewPos - 1].number === '0') {
            colNewPos--
          }
          if (colNewPos != col) {
            tempGrid[row][colNewPos].number = tempGrid[row][col].number;
            tempGrid[row][col].number = '0';
          }
          if (colNewPos > 0) {
            const checkIfEqual = tempGrid[row][colNewPos].number === tempGrid[row][colNewPos - 1].number
            if (checkIfEqual && !tempGrid[row][colNewPos - 1].lock) {
              tempGrid[row][colNewPos - 1].number = String(2 * Number(tempGrid[row][colNewPos].number))
              tempGrid[row][colNewPos].number = '0';
              tempGrid[row][colNewPos - 1].lock = true
              totalSum += Number(tempGrid[row][colNewPos - 1].number)
            }
          }
        }
      }
    }

  } else if (key === 'ArrowRight') {
    //console.log("Right")
    for (let row = 0; row < ROWS; row++) {
      for (let col = COLS - 1; col >= 0; col--) {
        if (tempGrid[row][col].number !== '0') {
          let colNewPos = col;
          while (colNewPos + 1 < COLS  && tempGrid[row][colNewPos + 1].number === '0') {
            colNewPos++
          }
          if (colNewPos != col) {
            tempGrid[row][colNewPos].number = tempGrid[row][col].number;
            tempGrid[row][col].number = '0';
          }
          if (colNewPos + 1 < COLS) {
            const checkIfEqual = tempGrid[row][colNewPos].number === tempGrid[row][colNewPos + 1].number
            if (checkIfEqual && !tempGrid[row][colNewPos + 1].lock) {
              tempGrid[row][colNewPos + 1].number = String(2 * Number(tempGrid[row][colNewPos].number))
              tempGrid[row][colNewPos].number = '0';
              tempGrid[row][colNewPos + 1].lock = true
              totalSum += Number(tempGrid[row][colNewPos + 1].number)
            }
          }
        }
      }
    }
    
  }
  const emptyPositions = getEmptyPositions(tempGrid)
  if (emptyPositions.length > 0) {
    const { randomPosition: pos1, randomNum: num1 }= randomNumberGenerator(emptyPositions)
    const getIndex1dTo2d = (index) => [Math.floor(index / ROWS), (index % COLS)]
  
    const [row1, col1] = getIndex1dTo2d(pos1);
    tempGrid[row1][col1].number = num1;
  } else if (emptyPositions.length === 0) {
      //alert("game finish")
      if (checkIfReach2048(grid)) {
        document.getElementById('win-message').classList.remove('hidden')
      } else {
        document.getElementById('lose-message').classList.remove('hidden')
      }
      buttonStart.classList.add('animate-bounce')
      bestScoreSpan.textContent =  Number(bestScoreSpan.textContent) <= Number(scoreSpan.textContent) ? scoreSpan.textContent : bestScoreSpan.textContent
      return;
  }
  scoreSpan.textContent = totalSum
  grid = unlockElements(tempGrid);
  //console.log(`last score ${lastScore}`)
  printGrid();

}

const checkIfReach2048 = (grid) => {
  const checker = grid.flat().some((element) => Number(element.number) >= 2048)
  return checker;
}

document.addEventListener('keydown', (event) => {
  const key = event.key;
  if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key)) {
    updateGrid(key);
  }
})


//button
const buttonStart = document.getElementById('restart-btn')

buttonStart.addEventListener('click', () => {
  //alert("Click restart game")
  buttonStart.classList.remove('animate-bounce')
  document.getElementById('win-message').classList.add('hidden')
  document.getElementById('lose-message').classList.add('hidden')
  scoreSpan.textContent = 0;
  grid = startGrid();
  pastGrid = null;
  //console.log(grid);
  printGrid();
})

const goBackButton = document.getElementById('goBack');

goBackButton.addEventListener('click', () => {
  //alert("Goin back")
  if (pastGrid)
    grid = deepCopyGrid(pastGrid)
  scoreSpan.textContent = lastScore
  printGrid();
})

const howToPlayBtn = document.getElementById('how-to-play-btn');
const howToPlayInfo = document.getElementById('how-to-play-info')
const closeHowToPlayBtn = document.getElementById('close-how-to-play')

howToPlayBtn.addEventListener('click', () => {
    howToPlayInfo.classList.remove('hidden');
})

closeHowToPlayBtn.addEventListener('click', () => {
  howToPlayInfo.classList.add('hidden')
})


