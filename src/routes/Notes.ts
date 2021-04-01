import { IRequest, paramMissingError } from '@shared/constants';
import logger from '@shared/Logger';
import { Request, Response, Router } from 'express';
import StatusCodes from 'http-status-codes';

const router = Router();
const { BAD_REQUEST, CREATED, OK } = StatusCodes;

router.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id || isNaN(id as any)) {
    return res.status(BAD_REQUEST).json({
      error: paramMissingError,
    });
  }
  const noteId = parseInt(id);
  const [rows] = await req.DB.execute(`SELECT * FROM notes WHERE id = ${noteId}`);
  return res.status(OK).json({ rows });
});
router.get('/', async (req: Request, res: Response) => {
  const [rows] = await req.DB.execute('SELECT * FROM `notes` ORDER BY timestamp DESC');
  return res.status(OK).json({ rows });
});

router.post('/add', async (req: Request, res: Response) => {
  const { message, encryption } = req.body;
  if (!message || !encryption) {
    return res.status(BAD_REQUEST).json({
      error: paramMissingError,
    });
  }
  const [rows]: any = await req.DB.execute(`INSERT INTO notes (message, encryption) VALUES ('${message}', '${encryption}')`);

  return res.status(CREATED).json({ id: rows.insertId });
});

router.patch('/update', async (req: Request, res: Response) => {
  const { message, encryption, id } = req.body;
  if (!message || !encryption || !id || isNaN(id)) {
    return res.status(BAD_REQUEST).json({
      error: paramMissingError,
    });
  }
  const noteId = parseInt(id);
  const [rows]: any = await req.DB.execute(`UPDATE notes SET message = '${message}', encryption = '${encryption}' WHERE id = ${noteId}`);
  logger.info(rows);

  return res.status(OK).end();
});

router.delete('/delete/:id', async (req: IRequest, res: Response) => {
  const { id } = req.params;
  if (!id || isNaN(id as any)) {
    return res.status(BAD_REQUEST).json({
      error: paramMissingError,
    });
  }
  const noteId = parseInt(id);
  const [rows]: any = await req.DB.execute(`DELETE FROM notes WHERE id = ${noteId}`);
  logger.info(rows);
  return res.status(OK).end();
});

export default router;
