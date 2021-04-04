import { paramMissingError } from '@shared/constants';
import logger from '@shared/Logger';
import { encryptMsg } from '@shared/utils';
import { Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { IEncryption } from 'src/interfaces';

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

router.post('/', async (req: Request, res: Response) => {
  const { message, encryption, encObj } = req.body;
  if (!message || !encryption || !encObj) {
    return res.status(BAD_REQUEST).json({
      error: paramMissingError,
    });
  }
  const { name } = encObj as IEncryption;
  const finalMsg: string = encryptMsg(message, name);
  const [rows]: any = await req.DB.execute(`INSERT INTO notes (message, encryption) VALUES ('${finalMsg}', '${encryption}')`);

  // return res.status(CREATED).json({ rows: '' });
  return res.status(CREATED).json({ rows: [{ createdId: rows.insertId }] });
});

router.patch('/', async (req: Request, res: Response) => {
  const { message, encryption, id, encName } = req.body;
  if (['message', 'encryption', 'id', 'encName'].some((v) => !req.body[v]) || isNaN(id)) {
    return res.status(BAD_REQUEST).json({
      error: paramMissingError,
    });
  }
  const noteId = parseInt(id);
  const finalMsg: string = encryptMsg(message, encName);
  const [rows]: any = await req.DB.execute(`UPDATE notes SET message = '${finalMsg}', encryption = '${encryption}' WHERE id = ${noteId}`);
  logger.info(rows);

  return res.status(OK).end();
});

router.delete('/:id', async (req: Request, res: Response) => {
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
