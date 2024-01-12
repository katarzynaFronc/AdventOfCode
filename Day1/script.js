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
  const inputData = await readFile(file);

  const line = inputData.split("\n");
  const newLine = [];

  line.map((i) => {
    let numbers = i.replace(/[^0-9]/g, "");
    newLine.push(numbers);
  });

  let sum = 0;

  newLine.map((j) => {
    const firstDigit = j.charAt(0) * 10;
    const lastDigit = parseInt(j.charAt(j.length - 1));

    let num = firstDigit + lastDigit;

    sum += num;
  });

  console.log(sum);
});
