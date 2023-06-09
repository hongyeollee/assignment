const { catchAsync } = require('../middleware/error');
const patientServeice = require('../services/patientService');

const createPatient = catchAsync(async (req, res) => {
  const { name, ssn, birthDate, cellPhone, phone, email, address1, address2 } =
    req.body;

  if (!name || !ssn || !birthDate || !cellPhone || !email || !address1) {
    const error = new Error('KEY_ERROR');
    error.statusCode = 400;
    throw error;
  }

  const data = await patientServeice.createPatient(
    name,
    ssn,
    birthDate,
    cellPhone,
    phone,
    email,
    address1,
    address2
  );

  return await res.status(200).json({ code: 200, message: 'success', data });
});

// const getPatient = catchAsync(async (req, res) => {
//   const { patientId } = req.params;

//   const data = await patientServeice.getPatient(patientId);

//   return res.status(200).json({ code: 200, message: 'success', data: [data] });
// });

// const updatePatient = catchAsync(async (req, res) => {
//   const {
//     name,
//     ssn,
//     birthDate,
//     cellPhone,
//     phone,
//     email,
//     address1,
//     address2,
//     imageUrl,
//     imageTxt,
//     imageSize,
//   } = req.body;

//   const data = await patientServeice.updatePatient(
//     name,
//     ssn,
//     birthDate,
//     cellPhone,
//     phone,
//     email,
//     address1,
//     address2,
//     imageUrl,
//     imageTxt,
//     imageSize
//   );

//   res.status(200).json({ data });
// });

// const deletePatient = catchAsync(async (req, res) => {
//   const { patientId } = req.params;

//   await patientServeice.deletePatient(patientId);
//   res.status(200).json({ code: 200, message: 'Success' });
// });

module.exports = { createPatient };
