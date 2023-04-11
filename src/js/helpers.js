export function getRandomNumbers(min, max, amountOfNumbers) {
    const numbers = [];
    
    while (numbers.length < amountOfNumbers) {
        const number = Math.floor(Math.random() * (max - min) + min);

        if (!numbers.includes(number)) {
            numbers.push(number);
        }
    }

    return numbers
}

export function intersect(a, b){
    let matched = [];
    for(let element_a of a) {
      for(let element_b of b){
      if (element_b == element_a){matched.push(element_a)}}
    }
    return matched;
};

export function switchClass(elem, removeClass, addClass_a) {
    elem.classList.remove(removeClass);
    elem.classList.add(addClass_a);
}

export function checkCells(i, columns, rows) {
    let cellsToCheck = [];

    if (i === 0) {
      cellsToCheck = [i + 1, i + columns, i + columns + 1]; // top left corner
    } else if (i === columns - 1) {
      cellsToCheck = [i - 1, i + columns - 1, i + columns]; // top right corner
    } else if (i === columns * rows - columns) {
      cellsToCheck = [i - columns, i - columns + 1, i + 1]; // down left corner
    } else if (i === columns * rows - 1) {
      cellsToCheck = [i - columns - 1, i - columns, i - 1]; // down right corner
    } else if (i % columns === 0) {
      cellsToCheck = [
        i - columns,
        i - columns + 1,
        i + 1,
        i + columns,
        i + columns + 1,
      ]; // left side
    } else if (i > 0 && i < columns - 1) {
      cellsToCheck = [
        i - 1,
        i + 1,
        i + columns - 1,
        i + columns,
        i + columns + 1,
      ]; //top side
    } else if (i % columns === columns - 1) {
      cellsToCheck = [
        i - columns - 1,
        i - columns,
        i - 1,
        i + columns - 1,
        i + columns,
      ]; //right side
    } else if (
      i > columns * rows - columns &&
      i < columns * rows - 1
    ) {
      cellsToCheck = [
        i - columns - 1,
        i - columns,
        i - columns + 1,
        i - 1,
        i + 1,
      ]; //bot side
    } else {
      cellsToCheck = [
        i - columns - 1,
        i - columns,
        i - columns + 1,
        i - 1,
        i + 1,
        i + columns - 1,
        i + columns,
        i + columns + 1,
      ];
    }
    return cellsToCheck
  };
