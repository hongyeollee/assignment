const userService = require('../services/userService');
const { catchAsync } = require('../middleware/error');

const login = catchAsync(async (req, res) => {
  const { id, pw } = {
    id: 'idtest',
    pw: 'pwtest',
  };

  try {
    await userService.login(id, pw);
    const data = await userService.login(id, pw);
    return res.status(200).json({ code: 200, message: `Success`, data });
  } catch (err) {
    return res.status(401).json({
      code: 401,
      message: `Unauthorized,`,
      data: { message: `인증되지 않은 유저입니다.` },
    });
  }
});

const logout = catchAsync(async (req, res) => {
  return await res.status(200).json({ code: 200, message: `success` });
});
module.exports = { login, logout };
