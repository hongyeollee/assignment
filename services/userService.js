const jwt = require('jsonwebtoken');

const createToken = async (id) => {
  const secretKey = process.env.SECRET_KEY;
  const time = new Date().getTime() / 1000 + 60 * 60 * 9;
  const currentTime = Math.floor(time);
  const expireTime = currentTime * 60 * 60 * 24;

  const payload = {
    patientId: id,
    iss: 'TNH-assignment',
    iat: currentTime,
    exp: expireTime,
  };
  console.log(`patload : `, payload);

  return jwt.sign(payload, secretKey);
};

const login = async (id, pw) => {
  return createToken(id);
};

const logout = async () => {
  createToken.destroy();
};

module.exports = { login, createToken, logout };
