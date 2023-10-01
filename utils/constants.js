const { JWT_SECRET } = process.env;
const { NODE_ENV } = process.env;

const DEV_KEY = '46f8e433063b235b75a1f24b10b9d22075a6e34a9574bf7694778c6cede60e0f';

module.exports = {
  JWT_SECRET,
  NODE_ENV,
  DEV_KEY,
};