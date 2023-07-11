const patientDao = require('../models/patientDao');
const crypto = require('crypto');

// //암호화
// const CIPHER = CRYPTO.createCipheriv(ALGORITHM, KEY, IV);
// let encrypt = CIPHER.update('암호화할 문자열', 'utf8', 'base64');
// encrypt += CIPHER.final('base64');

// //복호화
// const DECIPHER = CRYPTO.createDecipheriv(ALGORITHM, KEY, IV);
// let decrypt = DECIPHER.update(encrypt, 'base64', 'utf8');
// decrypt += DECIPHER.final('utf8');

const encryptSsn = (ssn) => {
  const cipher = crypto.createCipheriv(
    process.env.CRYPTO_ALGORITHM,
    process.env.CRYPTO_KEY,
    process.env.CRYPTO_IV
  );

  let enssn = cipher.update(ssn, 'utf8', 'base64');
  return (enssn += cipher.final('base64'));
};

const createPatient = async (
  name,
  ssn,
  birthDate,
  cellPhone,
  phone,
  email,
  address1,
  address2
) => {
  const enssn = encryptSsn(ssn);

  return await patientDao.createPatient(
    name,
    ssn,
    enssn,
    birthDate,
    cellPhone,
    phone,
    email,
    address1,
    address2
  );
};

// const getPatient = async (patientId) => {
//   return await patientDao.getPatient(patientId);
// };

// const updatePatient = async (
//   name,
//   ssn,
//   birthDate,
//   cellPhone,
//   phone,
//   email,
//   address1,
//   address2,
//   imageUrl,
//   imageTxt,
//   imageSize
// ) => {
//   return await patientDao.updatePatient(
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
// };

// const deletePatient = async (patientId) => {
//   return await patientDao.deletePatient(patientId);
// };

module.exports = { createPatient };
