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
