const startGrid = () => {
  const emptyCell = () => Array(4).fill().map(() => ({number: '0'}))
  const g = []
  while (g.length < 4) {
    g.push(emptyCell());
  }

  //firts Random number
  const firtsEmptyPositions = getEmptyPositions(g)
  const { randomPosition: pos1, randomNum: num1 }= randomNumberGenerator(firtsEmptyPositions)
  const { randomPosition: pos2, randomNum: num2 } = randomNumberGenerator(firtsEmptyPositions.filter(index => index != pos1))

  
  const finalGrid = g.flat().map((element, index) => {
    if (index === pos1)
      return {...element, number: num1}
    else if (index === pos2)
      return {...element, number: num2}
    else
      return element
  })
 
  return finalGrid;
}

const getEmptyPositions = (grid) => {
  const emptyPositions = grid.flat().map((element, index) => {
    if (element.number === '0') {
      return index;
    }
    return null;
  }).filter(index => index !== null);
  console.log(`Empty positions are ${emptyPositions}`);
  return emptyPositions;
}

const randomNumberGenerator = (positionsAvailable) => {
  const randomNum = Math.random() < 0.9 ? 2 : 4
  if (!positionsAvailable) {
    alert("There are not positions available!!!!");
    return (-1);
  }
  const randomPosition = Math.floor(Math.random() * 16);
  while (!positionsAvailable.some(pos => pos === randomPosition)) {
    randomPosition = Math.floor(Math.random() * 16);
  }
  console.log(`random Position; ${randomPosition}, randomNum: ${randomNum}`)
  return {randomPosition, randomNum};
}

let grid = startGrid();
const gridConteiner = document.getElementById('grid-container');

const printGrid = () => {
  gridConteiner.innerHTML = '';
  grid.flat().forEach((element, id) => {
    const cellDiv = document.createElement('div');
    const numberText =  document.createElement('text');

    const num = element.number;

    cellDiv.classList.add(
      'w-16', 'h-16', 'bg-amber-200', 'text-center', 'flex', 'items-center', 'justify-center'
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
    numberText.classList.add(colorText, 'w-16', 'h-16', colorClass)
    numberText.textContent = num === '0' ? ' ' : element.number;

    cellDiv.appendChild(numberText)
    gridConteiner.appendChild(cellDiv);
  })
}

printGrid();


document.addEventListener('keydown', (event) => {
  const key = event.key;
  if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key)) {
    updateGrid(key);
  }
})


//button
const buttonStart = document.getElementById('restart-btn')

buttonStart.addEventListener('click', () => {
  alert("CLick straret")
  grid = startGrid();
  console.log(grid);
  printGrid();
})








//const copyGrid = (grid) => {
//    return grid.flat().map(row => ({ ...row }));
//};