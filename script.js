//Utils

const copyGrid = (grid) => {
    return grid.flat().map(row => ({ ...row }));
};

const startGrid = () => {
  const emptyCell = () => Array(4).fill().map(() => ({number: '0', color: ''}))
  const g = []
  while (g.length < 4) {
    g.push(emptyCell());
  }
  return g;
}

const printGrid = () => {
  gridConteiner.innerHTML = '';
  grid.flat().forEach((element, id) => {
    const cell = document.createElement('div');
    const number =  document.createElement('text');
    cell.classList.add(
      'w-16', 'h-16', 'bg-amber-200', 'text-center', 'flex', 'items-center', 'justify-center'
    );
    cell.dataset.row = id;
    number.classList.add('text-black', 'w-16', 'h-16', 'bg-blue-500')
    number.textContent = element.number === '0' ? ' ' : element.number;

    cell.appendChild(number)
    gridConteiner.appendChild(cell);
  })
}






let grid = startGrid();

const gridConteiner = document.getElementById('grid-container');


const updateGrid = (key) => {
  const randomNum = Math.random() < 0.9 ? 2 : 4
  const randomPosition = Math.floor(Math.random() * 16);
  const newgrid = copyGrid(grid);
  const indexEmpty = grid.flat().filter(element => element.number === '0')
  while (indexEmpty.some((indexEmpty) => indexEmpty.index))

  grid = newgrid.flat().map((element, index) => {
    while (element.number === '0') {
      if (randomPosition === index) {
        return ({...element, number: randomNum})
      }
      else {
        randomNum = Math.random() < 0.9 ? 2 : 4
      }
    }
    return element
  })
  
  printGrid();

  const checkerIfFinish = newgrid.flat().find((element) => element.number === '0')
  if (!checkerIfFinish) {
      grid = startGrid();
      printGrid();
      alert(",lasmflkamfl")
      return
  }
}

document.addEventListener('keydown', (event) => {
  const key = event.key;
  if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key)) {
    updateGrid(key);
  }
})

//printGrid();





//button
const buttonStart = document.getElementById('restart-btn')

buttonStart.addEventListener('click', () => {
  alert("CLick straret")
  grid = startGrid();
  printGrid();
})


