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
      if(element_b == element_a){matched.push(element_a)}}
    }
    return matched;
};

export function switchClass(elem, removeClass, addClass_a, addClass_b) {
    elem.classList.remove(removeClass);
    elem.classList.add(addClass_a);
    elem.classList.add(addClass_b);
}
