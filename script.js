const DEFAULT_CONTAINER_SIZE = 960;
const MIN_GRID_SIZE = 1;
const MAX_GRID_SIZE = 100;
const DEFAULT_GRID_SIZE = 16;

const gridContainer = document.querySelector('.grid-container');
const inputGrid = document.querySelector('.input-grid')
const button = document.querySelector('.btn-grid');

inputGrid.value = DEFAULT_GRID_SIZE;

function createRandomRGB() {
    return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
}

function decreaseOpacity(element) {
    let opacity = window.getComputedStyle(element).opacity;
    opacity = opacity - (1 / 10) <= 0 ? 0 : opacity - (1 / 10);
    return Math.round(opacity * 10) / 10;
}

function createGrid(itemsRow) {
    const fragment = document.createDocumentFragment();
    const itemSize = `${DEFAULT_CONTAINER_SIZE / itemsRow}px`;

    gridContainer.style.width = `${DEFAULT_CONTAINER_SIZE}px`;

    for (let i = 1; i <= itemsRow * itemsRow; i++) {
        const gridItem = document.createElement('div');

        gridItem.classList.add('grid-item');
        gridItem.id = `item-${i}`;

        gridItem.style.flex = `0 0 ${itemSize}`;
        gridItem.style.height = itemSize;
        gridItem.style.backgroundColor = createRandomRGB();

        fragment.appendChild(gridItem);
    }

    gridContainer.appendChild(fragment);
}

button.addEventListener('click', () => {
    const gridValue = parseInt(inputGrid.value)

    if (gridValue >= MIN_GRID_SIZE && gridValue <= MAX_GRID_SIZE) {
        gridContainer.replaceChildren();

        createGrid(gridValue)
    }
})

gridContainer.addEventListener('mouseover', (e) => {
    if (e.target.classList.contains('grid-item')) {
        e.target.style.backgroundColor = createRandomRGB();

        e.target.style.opacity = decreaseOpacity(e.target);
    }
});

createGrid(DEFAULT_GRID_SIZE);