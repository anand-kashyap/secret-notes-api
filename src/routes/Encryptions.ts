import { Request, Response, Router } from 'express';
import StatusCodes from 'http-status-codes';

const router = Router();
const { OK } = StatusCodes;

router.get('/', async (req: Request, res: Response) => {
  const [rows] = await req.DB.execute('SELECT * FROM `encryptions`');
  return res.status(OK).json({ rows });
});

export default router;
