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
    name: "Gober Bebek",
    email: "moneymoneymoney@mail.com",
    password: "password",
    telephone: "081113334465",
    address: "Jakarta",
    imgUrl: null,
    EducationId: 2,
    gender: "Male",
    dateOfBirth: "30-01-1985",
    createdAt: dummyDate,
    updatedAt: dummyDate
  },
  {
    name: "Donal Bebek",
    email: "donal.bebek@mail.com",
    password: "password",
    telephone: "081113334462",
    address: "Jakarta",
    imgUrl: null,
    EducationId: 3,
    gender: "Male",
    dateOfBirth: "02-04-2005",
    createdAt: dummyDate,
    updatedAt: dummyDate
  },
];
const jobPostings = [
  {
    title: "Money counter",
    description: "Job Posting 1",
    address: "Jakarta",
    minSalary: 100_000,
    maxSalary: 300_000,
    EmployerId: 1,
    requiredGender: 'Male',
    maxAge: 30,
    requiredEducation: null,
    status: 'Terpenuhi',
    isUrgent: false
  },
  {
    title: "Janitor",
    description: "Job Posting 2",
    address: "Jakarta",
    minSalary: 100_000,
    maxSalary: 300_000,
    EmployerId: 1,
    requiredGender: 'Male',
    maxAge: null,
    requiredEducation: null,
    status: 'Terpenuhi',
    isUrgent: false
  },
  {
    title: "Accountant",
    description: "Job Posting 3",
    address: "Jakarta",
    minSalary: 100_000,
    maxSalary: 300_000,
    EmployerId: 1,
    requiredGender: null,
    maxAge: null,
    requiredEducation: null,
    status: 'Aktif',
    isUrgent: false
  },
  {
    title: "Gamer",
    description: "Job Posting 4",
    address: "Jakarta",
    minSalary: 100_000,
    maxSalary: 300_000,
    EmployerId: 1,
    requiredGender: null,
    maxAge: null,
    requiredEducation: null,
    status: 'Aktif',
    isUrgent: false
  }
];
const jobApplications = [
  {
    UserId: 2,
    JobPostingId: 1,
    applicationStatus: "Diterima",
    employmentStatus: "Berhenti",
    dateOfJobEmployment: new Date("01-01-2010")
  },
  {
    UserId: 2,
    JobPostingId: 2,
    applicationStatus: "Diterima",
    employmentStatus: "Bekerja",
    dateOfJobEmployment: null
  },
  {
    UserId: 2,
    JobPostingId: 3,
    applicationStatus: "Diproses",
    employmentStatus: null,
    dateOfJobEmployment: null
  },
  {
    UserId: 2,
    JobPostingId: 4,
    applicationStatus: "Ditolak",
    employmentStatus: null,
    dateOfJobEmployment: null
  }
];
const reviews = [
  {
    EmployerId: 1,
    UserId: 2,
    JobPostingId: 1,
    body: "Etika kerja yang jelek",
    rating: 2
  },
  {
    EmployerId: 1,
    UserId: 2,
    JobPostingId: 2,
    body: "Perlu bekerja lebih keras",
    rating: 3
  }
]
/* 
 * END SEED DATA
 */

beforeAll(async () => {
  await sequelize.queryInterface.bulkInsert('EducationLevels', educationLevels);
  await sequelize.queryInterface.bulkInsert('Users', users.map(el => {
    return {...el, password: encrypt(el.password)}
  }));
  await sequelize.queryInterface.bulkInsert('JobPostings', jobPostings);
  await sequelize.queryInterface.bulkInsert('JobApplications', jobApplications);
  await sequelize.queryInterface.bulkInsert('Reviews', reviews);
})

afterAll(async () => {
  ['EducationLevels', 'Users', 'JobPostings', 'JobApplications', 'Reviews'].forEach(async (tableName) => {
    await sequelize.queryInterface.bulkDelete(tableName, null, {
      restartIdentity: true,
      cascade: true,
      truncate: true
    });
  });
})

describe('GET Job Postings', () => {  

});

describe('POST Job Posting', () => {  

});

describe('PUT Job Posting', () => {  

});

describe('POST Job Application', () => {  

});

describe('POST User Review', () => {  

});