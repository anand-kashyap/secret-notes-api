import { decryptMsg } from '@shared/utils';
import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import EncryptionsRouter from './Encryptions';
import NotesRouter from './Notes';

const { OK } = StatusCodes;

// Init router and path
const router = Router();

// Add sub-routes
router.use('/notes', NotesRouter);
router.use('/encryptions', EncryptionsRouter);
router.post('/decrypt', (req, res) => {
  const { encryption, message } = req.body;

  const decrypted = decryptMsg(message, encryption);

  return res.status(OK).json({ decrypted });
});

// Export the base-router
export default router;
