// emo-gize
const { writeFile } = require('fs').promises;

const makeEmojiJson = async () => {
  const alphabetArr = Array.from(Array(26), (e, i) => String.fromCharCode(i + 97)).map(v => [v, v.toUpperCase()]).flat();

  const charToEmojiMap = alphabetArr.reduce((obj, v, i) => {
    const emoji = emojis[i].codes;
    obj[v] = emoji;
    return obj;
  }, {});
  console.log(charToEmojiMap);
  await writeFile('./src/encryptions/emo-gize.json', JSON.stringify(charToEmojiMap));
}

// makeEmojiJson();

const decryptEmoji = (str) => {
  const matches = str.replace(/1F.{3}/g, (unicode) => {

  });
  console.log('decryptEmoji -> matches', matches)
}

// decryptEmoji('1F6031F61B1F6191F6441F6011F9151F61B1F6031F6441F6191F91512{1F6441F61B1F9151F6191F9141F911');