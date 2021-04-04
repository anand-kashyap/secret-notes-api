import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import emojiMap from '../encryptions/emo-gize.json';
import EncryptionsRouter from './Encryptions';
import NotesRouter from './Notes';

const { OK } = StatusCodes;

const swapKeyVal = (obj: any) => Object.fromEntries(Object.entries(obj).map(([k, v]) => [v, k]));

// Init router and path
const router = Router();

// Add sub-routes
router.use('/notes', NotesRouter);
router.use('/encryptions', EncryptionsRouter);
router.post('/decrypt', (req, res) => {
  const { encryption, message } = req.body;

  let finalMsg = message;
  // get enc name
  switch (encryption) {
    case 'emo-gize':
      const emojiToChar = swapKeyVal(emojiMap);
      const decrypted = message.replace(/1F.{3}/g, (unicode: string) => {
        return emojiToChar[unicode] || unicode;
      });
      finalMsg = decrypted;
      break;
    case 'backwards':
      finalMsg = [...message].reverse().join('');
      break;

    default:
      break;
  }

  return res.status(OK).json({ decrypted: finalMsg });
});

// Export the base-router
export default router;
