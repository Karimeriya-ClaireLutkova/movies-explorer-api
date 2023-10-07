const { JWT_SECRET } = process.env;
const { NODE_ENV } = process.env;
const { DATABASE_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;
const { PORT = 3000 } = process.env;

const DEV_KEY = '3f6eced9908a3839f89ae8880da36ecc9a6ad24910a463c29b1e34d659066ceb';

module.exports = {
  JWT_SECRET,
  NODE_ENV,
  DEV_KEY,
  DATABASE_URL,
  PORT,
};
