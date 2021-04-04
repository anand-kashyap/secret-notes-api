import emojiMap from '../encryptions/emo-gize.json';

const swapKeyVal = (obj: any) => Object.fromEntries(Object.entries(obj).map(([k, v]) => [v, k]));

const encryptMsg = (msg: string, encName: string) => {
  switch (encName) {
    case 'backwards':
      msg = msg.split('').reverse().join('');
      break;
    case 'emo-gize':
      // convert chars to emoji unicode
      const strArr = [...msg];
      for (let i = 0; i < strArr.length; i++) {
        const char = strArr[i];
        const unicode = (emojiMap as any)[char];
        if (unicode) strArr[i] = unicode;
      }
      msg = strArr.join('');
      console.log('emoji str', msg);
      break;
    case 'backwards':
      msg = [...msg].reverse().join('');
      break;
    case 'letter-scramble':
      break;
    default:
      // nothing or unkown
      break;
  }
  return msg;
};

const decryptMsg = (msg: string, encName: string) => {
  switch (encName) {
    case 'emo-gize':
      const emojiToChar = swapKeyVal(emojiMap);
      const decrypted = msg.replace(/1F.{3}/g, (unicode: string) => {
        return emojiToChar[unicode] || unicode;
      });
      msg = decrypted;
      break;
    case 'backwards':
      msg = [...msg].reverse().join('');
      break;

    default:
      break;
  }
  return msg;
};

export { encryptMsg, decryptMsg };
