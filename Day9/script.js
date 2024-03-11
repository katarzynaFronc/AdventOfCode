const readFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsText(file);
  });
};

document.getElementById("fileInput").addEventListener("change", async (event) => {
  const file = event.target.files[0];
  const content = await readFile(file);
  const data = content.split("\n");

  stories = data.map((i) => i.replace(/\r/, ""));

  const history = stories.map((i) => i.split(" ").map(Number));

  let finishArray = [];
  let finishNumber;

  history.map((array) => {
    let originalLastNumber = array[array.length - 1];

    let substractedArray;
    let lastArrayNumbers = [];
    let lastNumber;

    lastArrayNumbers.push(originalLastNumber);

    const allZero = (array) => {
      return array.every((value) => value === 0);
    };

    const subtractPrevious = (array) => {
      while (allZero(array) !== true) {
        substractedArray = array
          .map((value, index, arr) => {
            if (index === 0) {
              return undefined;
            } else {
              return value - arr[index - 1];
            }
          })
          .filter((value) => value !== undefined);

        lastNumber = substractedArray[substractedArray.length - 1];
        lastArrayNumbers.unshift(lastNumber);
        array = substractedArray;
      }

      return { substractedArray, lastNumber };
    };

    ({ substractedArray, lastNumber } = subtractPrevious(array));

    let lastNumbers = lastArrayNumbers.reduce((accumulator, currenrValue) => {
      return accumulator.concat(accumulator.length > 0 ? accumulator[accumulator.length - 1] + currenrValue : currenrValue);
    }, []);

    finishNumber = lastNumbers[lastNumbers.length - 1];
    finishArray.push(finishNumber);
  });

  const result = finishArray.reduce((accumulator, currenrValue) => accumulator + currenrValue);

  console.log(result);
});
