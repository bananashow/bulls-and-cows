export const random = () => {
  let randomNumbersArray = [];
  while (randomNumbersArray.length < 4) {
    let randomNumbers = Math.floor(Math.random() * 9) + 1;
    if (randomNumbersArray.indexOf(randomNumbers) === -1) {
      randomNumbersArray.push(randomNumbers);
    }
  }
  return randomNumbersArray;
};
