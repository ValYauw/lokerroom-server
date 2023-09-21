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

describe('GET Multiple Job Postings', () => {  

  it('should successfully fetch multiple postings', async () => {
    const response = await request(app)
      .get(entrypoints.jobPostings())
    expect(response.statusCode).toBe(200);

    const fetchedPostings = response.body;
    expect(fetchedPostings.length).toBe(2);
    // expect(fetchedPostings[0].name).toBeDefined();
    // expect(fetchedPostings[0].email).toBeDefined();
    // expect(fetchedPostings[0].telephone).toBeDefined();
    // expect(fetchedPostings[0].address).toBeDefined();
    // expect(fetchedPostings[0].imgUrl).toBeDefined();
    // expect(fetchedPostings[0].educationLevel).toBeDefined();
    // expect(fetchedPostings[0].gender).toBeDefined();
    // expect(fetchedPostings[0].dateOfBirth).toBeDefined();
    // expect(fetchedPostings[0].profileDescription).toBeDefined();
    // expect(fetchedPostings[0].receivedReviews).toBeDefined();

    // expect(fetchedPostings[0].password).toBeUndefined();
    // expect(fetchedPostings[0].appliedJobs).toBeUndefined();
    // expect(fetchedPostings[0].postedJobs).toBeUndefined();

  });

  it('should successfully filter job postings based on gender', async () => {
    const response = await request(app)
      .get(entrypoints.jobPostings())
    expect(response.statusCode).toBe(200);
  })

});

describe('GET One Job Posting', () => {  

  it('should successfully get a posting by Id', async () => {
    const response = await request(app)
      .get(entrypoints.jobPosting(1))
    expect(response.statusCode).toBe(200);

    const { 
      title, description, address, 
      minSalary, maxSalary, employer, 
      requiredGender, maxAge, requiredEducation,
      status, isUrgent
    } = response.body;
    expect(title).toBeDefined();
    expect(description).toBeDefined();
    expect(address).toBeDefined();
    expect(minSalary).toBeDefined();
    expect(maxSalary).toBeDefined();
    expect(employer).toBeDefined();
    expect(requiredGender).toBeDefined();
    expect(maxAge).toBeDefined();
    expect(requiredEducation).toBeDefined();
    expect(status).toBeDefined();
    expect(isUrgent).toBeDefined();

  });

  it('should fail to get a non-existent posting', async () => {
    const response = await request(app)
      .get(entrypoints.jobPosting(200))
    expect(response.statusCode).toBe(404);
  });

  it('should fail to get a posting with an invalid Id', async () => {
    const response = await request(app)
      .get(entrypoints.jobPosting("abcd"))
    expect(response.statusCode).toBe(404);
  });

});

describe('POST Job Posting', () => {  

});

describe('PUT Job Posting', () => {  

});

describe('POST Job Application', () => {  

});

describe('POST User Review', () => {  

});