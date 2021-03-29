import { Router } from 'express';
import EncryptionsRouter from './Encryptions';
import NotesRouter from './Notes';

// Init router and path
const router = Router();

// Add sub-routes
router.use('/notes', NotesRouter);
router.use('/encryptions', EncryptionsRouter);

// Export the base-router
export default router;
