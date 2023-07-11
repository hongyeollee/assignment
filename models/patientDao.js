const { appDataSource } = require('./index');

const createPatient = async (
  name,
  ssn,
  enssn,
  birthDate,
  cellphone,
  phone,
  email,
  address1,
  address2
) => {
  const queryRunner = appDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();
  try {
    await queryRunner.query(
      `
      INSERT INTO patient(
        name,
        ssn,
        enssn,
        birthDate,
        cellphone,
        phone,
        email
      ) VALUES(
        ?,?,?,?,?,?,?
      )
      `,
      [name, ssn, enssn, birthDate, cellphone, phone, email]
    );

    const [patientId] = await queryRunner.query(
      `SELECT LAST_INSERT_ID() as insertId FROM patient`
    );

    await queryRunner.query(
      `
      INSERT INTO patient_address(
        patientId,
        address1,
        address2
      ) VALUES(
        ?,?,?
      )
      `,
      [patientId.insertId, address1, address2]
    );

    // await queryRunner.query(
    //   `
    //   INSERT INTO patient_image(
    //     patientId,
    //     imageUrl,
    //     imageSize,
    //     imageTxt
    //   ) VALUES(
    //     ?,?,?,?
    //   )
    //   `,
    //   [patientId.insertId, imageUrl, imageSize, imageTxt]
    // );

    await queryRunner.commitTransaction();

    const result = {
      name,
      ssn,
      enssn,
      birthDate,
      cellphone,
      phone,
      email,
      addresses: [address1, address2],
    };
    return result;
  } catch (err) {
    await queryRunner.rollbackTransaction();
    console.error(err);
    const error = new Error('Failed To Create Patient');
    error.statusCode = 400;
    throw error;
  } finally {
    await queryRunner.release();
  }
};

// const getPatient = async (patientId) => {
//   const result = await appDataSource.query(
//     `
//     SELECT
//       p.patientId,
//       p.name,
//       p.ssn,

//       p.birthDate,
//       p.cellPhone,
//       p.phone,
//       pi.imageUrl AS imageUrl,
//         JSON_ARRAYAGG(
//         JSON_OBJECT(
//           'address1', pa.address1,
//           'address2', pa.address2,
//           'createdAt', pa.createdAt
//         )) AS addresses,
//         JSON_ARRAYAGG(
//         JSON_OBJECT(
//           'imageUrl', pi.imageUrl,
//           'imageSize', pi.imageSize,
//           'imageTxt', pi.imageTxt,
//           'createdAt', pi.createdAt
//         ))AS images,
//       p.createdAt
//     FROM
//       patient AS p
//       LEFT JOIN patient_address AS pa ON pa.patientId = p.patientId
//       LEFT JOIN patient_image AS pi ON pi.patientId = p.patientId
//     WHERE
//       p.patientId=?
//     GROUP BY pi.imageUrl
//     `,
//     [patientId]
//   );
//   console.log(`DAO result: `, result[0]);
//   return result[0];
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
//   const queryRunner = appDataSource.createQueryRunner();
//   await queryRunner.connect();
//   await queryRunner.startTransaction();
//   try {
//     await queryRunner.commitTransaction();
//   } catch (err) {
//     console.log(err);
//     await queryRunner.rollbackTransaction();
//   } finally {
//     await queryRunner.release();
//   }
// };

// const deletePatient = async (patientId) => {
//   const queryRunner = appDataSource.createQueryRunner();
//   await queryRunner.connect();
//   await queryRunner.startTransaction();
//   try {
//     await queryRunner.query(
//       `
//       DELETE FROM
//         patient
//       WHERE
//         patientId=?
//       `,
//       [patientId]
//     );

//     await queryRunner.query(
//       `
//       DELETE FROM
//         patient_image
//       WHERE
//         patientId=?
//       `,
//       [patientId]
//     );

//     await queryRunner.query(
//       `
//       DELETE FROM
//         patient_address
//       WHERE
//         patientId=?
//       `,
//       [patientId]
//     );
//     await queryRunner.commitTransaction();
//   } catch (err) {
//     await queryRunner.rollbackTransaction();
//     console.log(err);
//     throw err;
//   } finally {
//     await queryRunner.release();
//   }
// };

module.exports = { createPatient };
