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

  const instructions = contents.split("\n");

  let steps = instructions[0].split("");
  steps = steps.map((i) => i.replace(/\r/g, "")).filter((i) => i !== "");
  let mapa = instructions.slice(2);
  mapa = mapa.map((i) => i.replace(/\r/g, "")).filter((i) => i !== "");

  let objects = mapa.map((i) => {
    let parts = i.split(" = ");

    let code = parts[0];

    let sides = parts[1].replace(/[\(\)]/g, "").split(", ");

    return {
      code: code,
      left: sides[0],
      right: sides[1],
    };
  });

  let start = objects[0].code;
  let end = objects[objects.length - 1].code;

  let stepsCount = 0;
  let stepsIndex = 0;
  let currentNode = start;

  while (currentNode !== end) {
    let currentObject = objects.find((obj) => obj.code === currentNode);
    if (steps[stepsIndex] === "R") {
      currentNode = currentObject.right;
    } else {
      currentNode = currentObject.left;
    }
    stepsCount++;
    stepsIndex = (stepsIndex + 1) % steps.length;
  }
  console.log(stepsCount);
});
