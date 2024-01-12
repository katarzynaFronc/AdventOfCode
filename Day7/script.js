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

  let hand;
  let bid;
  let newHand = [];
  let order;
  let camelCard = {};
  let camelCards = [];
  let sortedCards;

  for (card of cards) {
    [hand, bid] = card.split(" ");
    let newBid = bid.toString().replace("\r", "");

    newHand = hand.split("");
    camelCard = { hand: hand, bid: newBid, order: order };

    let count;

    // check the cards
    if (newHand.every((sign) => sign === hand[0])) {
      camelCard = { ...camelCard, order: "7" };
    } else if (
      ((count = {}),
      newHand.forEach((sign) => {
        count[sign] = (count[sign] || 0) + 1;
      }),
      Object.values(count).includes(4))
    ) {
      camelCard = { ...camelCard, order: "6" };
    } else if (
      ((count = {}),
      newHand.forEach((sign) => {
        count[sign] = (count[sign] || 0) + 1;
      }),
      Object.values(count).includes(3) && Object.values(count).includes(2))
    ) {
      camelCard = { ...camelCard, order: "5" };
    } else if (
      ((count = {}),
      newHand.forEach((sign) => {
        count[sign] = (count[sign] || 0) + 1;
      }),
      Object.values(count).includes(3))
    ) {
      camelCard = { ...camelCard, order: "4" };
    } else if (
      ((count = {}),
      newHand.forEach((sign) => {
        count[sign] = (count[sign] || 0) + 1;
      }),
      Object.values(count).filter((x) => x === 2).length === 2)
    ) {
      camelCard = { ...camelCard, order: "3" };
    } else if (
      ((count = {}),
      newHand.forEach((sign) => {
        count[sign] = (count[sign] || 0) + 1;
      }),
      Object.values(count).includes(2))
    ) {
      camelCard = { ...camelCard, order: "2" };
    } else if (newHand.every((sign, index, self) => self.indexOf(sign) === index)) {
      camelCard = { ...camelCard, order: "1" };
    }
    camelCards.push(camelCard);
  }

  // sort

  sortedCards = camelCards.sort(function (a, b) {
    if (a.order !== b.order) return a.order < b.order ? -1 : 1;
    if (a.order === b.order) {
      const handA = a.hand.split("");
      const handB = b.hand.split("");
      const cardOrder = { A: 13, K: 12, Q: 11, J: 10, T: 9, 9: 8, 8: 7, 7: 6, 6: 5, 5: 4, 4: 3, 3: 2, 2: 1 };

      for (let i = 0; i < handA.length; i++) {
        if (cardOrder[handA[i]] !== cardOrder[handB[i]]) {
          return cardOrder[handA[i]] < cardOrder[handB[i]] ? -1 : 1;
        }
      }
    }
  });

  // rank
  const rankedCards = sortedCards.map((camelCard, i) => ({
    ...camelCard,
    rank: i + 1,
  }));

  let score = rankedCards.map((camelCard) => {
    return { ...camelCard, result: camelCard.bid * camelCard.rank };
  });

  let sum = score.reduce((total, camelCard) => total + camelCard.result, 0);
  console.log(sum);
});
