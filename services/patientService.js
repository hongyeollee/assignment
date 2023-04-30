const patientDao = require('../models/patientDao');

const createPatient = async (
  name,
  ssn,
  enssn,
  birthDate,
  cellPhone,
  phone,
  email,
  address1,
  address2,
  imageUrl,
  imageSize,
  imageTxt
) => {
  return await patientDao.createPatient(
    name,
    ssn,
    enssn,
    birthDate,
    cellPhone,
    phone,
    email,
    address1,
    address2,
    imageUrl,
    imageSize,
    imageTxt
  );
};

const getPatient = async (patientId) => {
  return await patientDao.getPatient(patientId);
};

const updatePatient = async (
  name,
  ssn,
  birthDate,
  cellPhone,
  phone,
  email,
  address1,
  address2,
  imageUrl,
  imageTxt,
  imageSize
) => {
  return await patientDao.updatePatient(
    name,
    ssn,
    birthDate,
    cellPhone,
    phone,
    email,
    address1,
    address2,
    imageUrl,
    imageTxt,
    imageSize
  );
};

const deletePatient = async (patientId) => {
  return await patientDao.deletePatient(patientId);
};

module.exports = { createPatient, getPatient, updatePatient, deletePatient };
