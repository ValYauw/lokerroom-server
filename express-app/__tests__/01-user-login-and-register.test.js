const request = require('supertest');
const app = require('../app');
const { encrypt } = require('../helpers/password'); 
const { sequelize } = require('../models');
const entrypoints = require('./entrypoints');

const dummyDate = new Date('01-01-2020');

/* 
 * START SEED DATA
 */
const educationLevels = [
  {
    education: 'SD',
    priority: 1,
    createdAt: dummyDate,
    updatedAt: dummyDate
  },
  {
    education: 'SMK',
    priority: 2,
    createdAt: dummyDate,
    updatedAt: dummyDate
  },
  {
    education: 'Diploma',
    priority: 3,
    createdAt: dummyDate,
    updatedAt: dummyDate
  },
  {
    education: 'S1',
    priority: 4,
    createdAt: dummyDate,
    updatedAt: dummyDate
  },
  {
    education: 'S2',
    priority: 5,
    createdAt: dummyDate,
    updatedAt: dummyDate
  }
];
const users = [
  {
    name: "Basuki",
    telephone: "081113334462",
    email: null,
    password: "password",
    address: "Jakarta",
    imgUrl: null,
    EducationId: 1,
    gender: "Male",
    dateOfBirth: "20-12-2001",
    profileDescription: null,
    createdAt: dummyDate,
    updatedAt: dummyDate
  },
  {
    name: "Chandra",
    telephone: "08227810354",
    email: "chandra-nga@gmail.com",
    password: "password",
    address: "Tangerang",
    imgUrl: "https://dummyimage.com/100x100/000/fff",
    EducationId: 1,
    gender: "Male",
    dateOfBirth: "01-03-1995",
    profileDescription: null,
    createdAt: dummyDate,
    updatedAt: dummyDate
  },
  {
    name: "Ria",
    telephone: "08227810321",
    email: null,
    password: "password",
    address: "BSD",
    imgUrl: null,
    EducationId: 2,
    gender: "Female",
    dateOfBirth: "05-10-1999",
    profileDescription: null,
    createdAt: dummyDate,
    updatedAt: dummyDate
  },
];
/* 
 * END SEED DATA
 */

beforeAll(async () => {
  await sequelize.queryInterface.bulkInsert('EducationLevels', educationLevels);
  await sequelize.queryInterface.bulkInsert('Users', users.map(el => {
    return {...el, password: encrypt(el.password)}
  }));
})

afterAll(async () => {
  ['EducationLevels', 'Users'].forEach(async (tableName) => {
    await sequelize.queryInterface.bulkDelete(tableName, null, {
      restartIdentity: true,
      cascade: true,
      truncate: true
    });
  });
})

describe('POST User login', () => {

  it('should log the user in with their phone number', async () => {
    const response = await request(app)
      .post(entrypoints.login)
      .send({
        telephone: users[0].telephone,
        password: users[0].password
      })
    expect(response.statusCode).toBe(200);
    const { access_token } = response.body;
    expect(access_token).toBeDefined();
  });

  it('should log the user in with their email', async () => {
    const response = await request(app)
      .post(entrypoints.login)
      .send({
        email: users[1].email,
        password: users[1].password
      })
    expect(response.statusCode).toBe(200);
    const { access_token } = response.body;
    expect(access_token).toBeDefined();
  });

  it('should give an invalid response (no matching phone number)', async () => {
    const response = await request(app)
      .post(entrypoints.login)
      .send({
        telephone: '0817729103',
        password: 'password'
      })
    expect(response.statusCode).toBe(401);
    const { access_token, message } = response.body;
    expect(access_token).toBeUndefined();
    expect(message).toBeDefined();
  });


  it('should give an invalid response (no matching email)', async () => {
    const response = await request(app)
      .post(entrypoints.login)
      .send({
        email: 'nomail@mail.com',
        password: 'password'
      })
    expect(response.statusCode).toBe(401);
    const { access_token, message } = response.body;
    expect(access_token).toBeUndefined();
    expect(message).toBeDefined();
  });

  it('should give an invalid response (wrong password)', async () => {
    const response = await request(app)
      .post(entrypoints.login)
      .send({
        email: users[0].email,
        password: 'wrongpass'
      })
    expect(response.statusCode).toBe(401);
    const { access_token, message } = response.body;
    expect(access_token).toBeUndefined();
    expect(message).toBeDefined();
  });

  it('should give an invalid response (data is undefined)', async () => {
    const response = await request(app)
      .post(entrypoints.login)
      .send({})
    expect(response.statusCode).toBe(401);
    const { access_token, message } = response.body;
    expect(access_token).toBeUndefined();
    expect(message).toBeDefined();
  });

  it('should give an invalid response (phone number and email is empty)', async () => {
    const response = await request(app)
      .post(entrypoints.login)
      .send({
        telephone: '',
        email: '',
        password: 'password'
      })
    expect(response.statusCode).toBe(401);
    const { access_token, message } = response.body;
    expect(access_token).toBeUndefined();
    expect(message).toBeDefined();
  });

  it('should give an invalid response (password is empty)', async () => {
    const response = await request(app)
      .post(entrypoints.login)
      .send({
        telephone: users[0].telephone,
        password: ''
      })
    expect(response.statusCode).toBe(401);
    const { access_token, message } = response.body;
    expect(access_token).toBeUndefined();
    expect(message).toBeDefined();
  });

})

describe('POST User register', () => {

  it('should register the user', async () => {
    const response = await request(app)
      .post(entrypoints.register)
      .send({
        name: "Susanto",
        telephone: "0815421094",
        email: "susanto@gmail.com",
        password: "password",
        address: "Depok",
        educationId: 1,
        gender: "Male",
        dateOfBirth: "15-01-2000",
      })
    expect(response.statusCode).toBe(201);
    const { message } = response.body;
    expect(message).toBeDefined();
  });

  it('should register the user', async () => {
    const response = await request(app)
      .post(entrypoints.register)
      .send({
        name: "Susilo",
        telephone: "0815421095",
        password: "password",
        address: "Depok",
        educationId: 2,
        gender: "Male",
        dateOfBirth: "15-01-2000",
      })
    expect(response.statusCode).toBe(201);
    const { message } = response.body;
    expect(message).toBeDefined();
  });

  it('should fail to register (data is undefined)', async () => {
    const response = await request(app)
      .post(entrypoints.register)
      .send({})
    expect(response.statusCode).toBe(400);
    const { message } = response.body;
    expect(message).toBeDefined();
  });

  it('should fail to register (email and telephone are empty)', async () => {
    const response = await request(app)
      .post(entrypoints.register)
      .send({
        name: "Acep",
        telephone: "",
        email: "",
        password: "password",
        address: "Depok",
        educationId: 1,
        gender: "Male",
        dateOfBirth: "15-01-2000",
      })
    expect(response.statusCode).toBe(400);
    const { message } = response.body;
    expect(message).toBeDefined();
    expect(message).toBe("Email/telephone is required");
  });

  it('should fail to register (name is empty)', async () => {
    const response = await request(app)
      .post(entrypoints.register)
      .send({
        name: "",
        telephone: "0815421098",
        email: "",
        password: "password",
        address: "Depok",
        educationId: 1,
        gender: "Male",
        dateOfBirth: "15-01-2000",
      })
    expect(response.statusCode).toBe(400);
    const { message } = response.body;
    expect(message).toBeDefined();
    expect(message).toBe("Name is required");
  });

  it('should fail to register (password is empty)', async () => {
    const response = await request(app)
      .post(entrypoints.register)
      .send({
        name: "Acep",
        telephone: "0815421099",
        email: "",
        password: "",
        address: "Depok",
        educationId: 1,
        gender: "Male",
        dateOfBirth: "15-01-2000",
      })
    expect(response.statusCode).toBe(400);
    const { message } = response.body;
    expect(message).toBeDefined();
    expect(message).toBe("Password is required");
  });

  it('should fail to register (address is empty)', async () => {
    const response = await request(app)
      .post(entrypoints.register)
      .send({
        name: "Acep",
        telephone: "0815421100",
        email: "",
        password: "password",
        address: "",
        educationId: 1,
        gender: "Male",
        dateOfBirth: "15-01-2000",
      })
    expect(response.statusCode).toBe(400);
    const { message } = response.body;
    expect(message).toBeDefined();
    expect(message).toBe("Address is required");
  });

  it('should fail to register (gender is empty)', async () => {
    const response = await request(app)
      .post(entrypoints.register)
      .send({
        name: "Acep",
        email: "",
        telephone: "0815421102",
        password: "password",
        address: "Depok",
        educationId: 1,
        gender: "",
        dateOfBirth: "15-01-2000",
      })
    expect(response.statusCode).toBe(400);
    const { message } = response.body;
    expect(message).toBeDefined();
    expect(message).toBe("Gender is required");
  });

  it('should fail to register (Date of birth is empty)', async () => {
    const response = await request(app)
      .post(entrypoints.register)
      .send({
        name: "Acep",
        email: "",
        telephone: "0815421103",
        password: "password",
        address: "Depok",
        educationId: 1,
        gender: "Male",
        dateOfBirth: "",
      })
    expect(response.statusCode).toBe(400);
    const { message } = response.body;
    expect(message).toBeDefined();
    expect(message).toBe("Date of birth is required");
  });

  it('should fail to register (phone number is already registered)', async () => {
    const response = await request(app)
      .post(entrypoints.register)
      .send({
        name: "Sayori",
        telephone: users[0].telephone,
        password: "password",
        address: "Depok",
        educationId: 1,
        gender: "Male",
        dateOfBirth: "01-03-2001",
      })
    expect(response.statusCode).toBe(400);
    const { message } = response.body;
    expect(message).toBeDefined();
    expect(message).toBe("Phone number must be unique");
  });

  it('should fail to register (email is already registered)', async () => {
    const response = await request(app)
      .post(entrypoints.register)
      .send({
        name: "Sayori",
        telephone: "0815421104",
        email: users[1].email,
        password: "password",
        address: "Depok",
        educationId: 1,
        gender: "Male",
        dateOfBirth: "01-03-2001",
      })
    expect(response.statusCode).toBe(400);
    const { message } = response.body;
    expect(message).toBeDefined();
    expect(message).toBe("Email must be unique");
  });

})