import multer from 'multer';
import { uuid } from 'uuidv4';
import { resolve } from 'path';

export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename(req, file, callback) {
      const fileName = `${uuid()}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
