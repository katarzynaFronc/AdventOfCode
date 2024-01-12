const readFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsText(file);
  });
};

document.getElementById("fileInput").addEventListener("change", async (e) => {
  const file = e.target.files[0];
  const contents = await readFile(file);

  const cards = contents.split("\n");

  let games = [];
  let i;
  let sum = 0;

  for (let card of cards) {
    let [cardNumber, numbers] = card.split(": ");
    let [winNumbers, drawnNumbers] = numbers.split(" | ");
    let gamesObject = {
      cardNumber: cardNumber,
      winNumbers: winNumbers,
      drawnNumbers: drawnNumbers,
    };
    games.push(gamesObject);

    let newDrawnList = [];

    const winList = winNumbers
      .split(" ")
      .filter((str) => str !== "")
      .map(Number);

    const drawnList = drawnNumbers
      .split(" ")
      .filter((str) => str !== "")
      .map(Number);

    drawnList.map((str) => {
      let newNumbers = str.toString().replace("\r", "");
      newDrawnList.push(newNumbers);
    });

    let commonNumbers = drawnList.filter((num) => winList.includes(num));

    if (commonNumbers.length === 1) {
      i = 1;
    } else if (commonNumbers.length > 1) {
      i = Math.pow(2, commonNumbers.length - 1);
    } else {
      i = 0;
    }

    sum += i;
  }
  console.log(sum);
});
