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
const categories = [
  { name: 'Labour', createdAt: dummyDate, updatedAt: dummyDate },
  { name: 'Office', createdAt: dummyDate, updatedAt: dummyDate }
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
    CategoryId: 2,
    minSalary: 100_000,
    maxSalary: 300_000,
    AuthorId: 1,
    requiredGender: 'Male',
    maxAge: 30,
    requiredEducation: null,
    status: 'Filled',
    isUrgent: false
  },
  {
    title: "Janitor",
    description: "Job Posting 2",
    address: "Jakarta",
    CategoryId: 1,
    minSalary: 100_000,
    maxSalary: 300_000,
    AuthorId: 1,
    requiredGender: 'Male',
    maxAge: null,
    requiredEducation: null,
    status: 'Filled',
    isUrgent: false
  },
  {
    title: "Accountant",
    description: "Job Posting 3",
    address: "Jakarta",
    CategoryId: 2,
    minSalary: 100_000,
    maxSalary: 300_000,
    AuthorId: 1,
    requiredGender: null,
    maxAge: null,
    requiredEducation: null,
    status: 'Active',
    isUrgent: false
  },
  {
    title: "Gamer",
    description: "Job Posting 4",
    address: "Jakarta",
    CategoryId: 2,
    minSalary: 100_000,
    maxSalary: 300_000,
    AuthorId: 1,
    requiredGender: null,
    maxAge: null,
    requiredEducation: null,
    status: 'Active',
    isUrgent: false
  }
];
const jobApplications = [
  {
    UserId: 2,
    JobPostingId: 1,
    applicationStatus: "Accepted",
    isEmployed: false,
    startDateOfEmployment: new Date("01-01-2010"),
    endDateOfEmployment: new Date("01-05-2010")
  },
  {
    UserId: 2,
    JobPostingId: 2,
    applicationStatus: "Accepted",
    isEmployed: true,
    startDateOfEmployment: new Date("01-05-2010"),
    endDateOfEmployment: null
  },
  {
    UserId: 2,
    JobPostingId: 3,
    applicationStatus: "Processing",
    isEmployed: null,
    startDateOfEmployment: null,
    endDateOfEmployment: null
  },
  {
    UserId: 2,
    JobPostingId: 4,
    applicationStatus: "Rejected",
    isEmployed: null,
    startDateOfEmployment: null,
    endDateOfEmployment: null
  }
];
const reviews = [
  {
    EmployerId: 1,
    UserId: 2,
    JobPostingId: 1,
    content: "Etika kerja yang jelek",
    rating: 2
  },
  {
    EmployerId: 1,
    UserId: 2,
    JobPostingId: 2,
    content: "Perlu bekerja lebih keras",
    rating: 3
  }
]
/* 
 * END SEED DATA
 */

beforeAll(async () => {
  await sequelize.queryInterface.bulkInsert('EducationLevels', educationLevels);
  await sequelize.queryInterface.bulkInsert('Categories', categories);
  await sequelize.queryInterface.bulkInsert('Users', users.map(el => {
    return {...el, password: encrypt(el.password)}
  }));
  await sequelize.queryInterface.bulkInsert('JobPostings', jobPostings);
  await sequelize.queryInterface.bulkInsert('JobApplications', jobApplications);
  await sequelize.queryInterface.bulkInsert('Reviews', reviews);
})

afterAll(async () => {
  ['EducationLevels', 'Categories', 'Users', 'JobPostings', 'JobApplications', 'Reviews'].forEach(async (tableName) => {
    await sequelize.queryInterface.bulkDelete(tableName, null, {
      restartIdentity: true,
      cascade: true,
      truncate: true
    });
  });
})

describe('GET User without authentication', () => {

  it('should successfully fetch multiple users', async () => {
    const response = await request(app)
      .get(entrypoints.users())
    expect(response.statusCode).toBe(200);

    const fetchedUsers = response.body;
    expect(fetchedUsers.length).toBe(2);
    expect(fetchedUsers[0].name).toBeDefined();
    expect(fetchedUsers[0].telephone).toBeDefined();
    expect(fetchedUsers[0].email).toBeDefined();
    expect(fetchedUsers[0].address).toBeDefined();
    expect(fetchedUsers[0].imgUrl).toBeDefined();
    expect(fetchedUsers[0].educationLevel).toBeDefined();
    expect(fetchedUsers[0].gender).toBeDefined();
    expect(fetchedUsers[0].dateOfBirth).toBeDefined();
    expect(fetchedUsers[0].profileDescription).toBeDefined();
    expect(fetchedUsers[0].receivedReviews).toBeDefined();
    // Limit 3 reviews per user when fetching multiple users
    expect(fetchedUsers[0].receivedReviews.length).toBeLessThanOrEqual(3);

    expect(fetchedUsers[0].password).toBeUndefined();
    expect(fetchedUsers[0].appliedJobs).toBeUndefined();
    expect(fetchedUsers[0].postedJobs).toBeUndefined();

  });

  it('should successfully fetch Donal Bebek\'s profile', async () => {
    const response = await request(app)
      .get(entrypoints.user(2))
    expect(response.statusCode).toBe(200);
    
    const fetchedUser = response.body;
    const { 
      name, email, telephone, address, imgUrl, 
      educationLevel, gender, dateOfBirth, 
      profileDescription, receivedReviews 
    } = fetchedUser;
    expect(name).toBeDefined();
    expect(telephone).toBeDefined();
    expect(email).toBeDefined();
    expect(address).toBeDefined();
    expect(imgUrl).toBeDefined();
    expect(educationLevel).toBeDefined();
    expect(gender).toBeDefined();
    expect(dateOfBirth).toBeDefined();
    expect(profileDescription).toBeDefined();
    expect(receivedReviews).toBeDefined();
    expect(receivedReviews.length).toBe(2);

    expect(fetchedUser.password).toBeUndefined();
    expect(fetchedUser.appliedJobs).toBeUndefined();
    expect(fetchedUser.postedJobs).toBeUndefined();

  });

  it('should fail to fetch non-existent user profile', async () => {
    const response = await request(app)
      .get(entrypoints.user(200))
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBeDefined();
  });

  it('should fail to fetch invalid user profile', async () => {
    const response = await request(app)
      .get(entrypoints.user('abcd'))
    expect(response.statusCode).toBe(404);
    expect(response.body.message).toBeDefined();
  });

})

describe('GET my details with authentication', () => {

  let access_token;
  beforeAll(async () => {
    const response = await request(app)
      .post(entrypoints.login)
      .send({
        telephone: users[1].telephone,
        password: users[1].password
      });
    access_token = response.body.access_token;
  })

  it('should get user details for Donal Bebek', async () => {

    const response = await request(app)
      .get(entrypoints.me)
      .set('access_token', access_token);

    expect(response.statusCode).toBe(200);

    const { 
      id, name, email, telephone, address, imgUrl, educationLevel, 
      gender, dateOfBirth, profileDescription
    } = response.body;
    expect(id).toBe(2);
    expect(name).toBe(users[1].name);
    expect(telephone).toBe(users[1].telephone);
    expect(email).toBe(users[1].email);
    expect(address).toBe(users[1].address);
    expect(imgUrl).toBe(users[1].imgUrl);
    expect(educationLevel.id).toBe(users[1].EducationId);
    expect(educationLevel.name).toBe(educationLevels[users[1].EducationId - 1].education);
    expect(gender).toBe(users[1].gender);
    expect(dateOfBirth).toBe(users[1].dateOfBirth);
    expect(profileDescription).toBe(users[1].profileDescription);
    
  });

  it('should get jobs that Donal Bebek has applied to', async () => {
    const response = await request(app)
      .get(entrypoints.myJobApplications)
      .set('access_token', access_token);

    expect(response.statusCode).toBe(200);

    const { appliedJobs } = response.body;
    expect(appliedJobs.length).toBe(4);
    expect(appliedJobs[0].jobPosting).toBeDefined();
    expect(appliedJobs[0].applicationStatus).toBeDefined();
    expect(appliedJobs[0].isEmployed).toBeDefined();
    expect(appliedJobs[0].startDateOfEmployment).toBeDefined();
    expect(appliedJobs[0].endDateOfEmployment).toBeDefined();
    
  });

  it('should get reviews that Donal Bebek has received', async () => {

    const response = await request(app)
      .get(entrypoints.myReviews)
      .set('access_token', access_token);

    expect(response.statusCode).toBe(200);

    const { receivedReviews } = response.body;
    expect(receivedReviews.length).toBe(2);
    expect(receivedReviews[0].employer).toBeDefined();
    expect(receivedReviews[0].user).toBeDefined();
    expect(receivedReviews[0].jobPosting).toBeDefined();
    expect(receivedReviews[0].content).toBeDefined();
    expect(receivedReviews[0].rating).toBeDefined();
    
  });

  it('should get jobs that Gober Bebek has posted', async () => {

    const loginResponse = await request(app)
      .post(entrypoints.login)
      .send({
        telephone: users[0].telephone, 
        password: users[0].password
      });
    const access_token = loginResponse.body.access_token;
    const response = await request(app)
      .get(entrypoints.myJobPostings)
      .set('access_token', access_token);

    expect(response.statusCode).toBe(200);

    const { postedJobs } = response.body;
    expect(postedJobs.length).toBe(4);
    expect(postedJobs[0].title).toBeDefined();
    expect(postedJobs[0].description).toBeDefined();
    expect(postedJobs[0].address).toBeDefined();
    expect(postedJobs[0].category).toBeDefined();
    expect(postedJobs[0].minSalary).toBeDefined();
    expect(postedJobs[0].maxSalary).toBeDefined();
    expect(postedJobs[0].author).toBeDefined();
    expect(postedJobs[0].requiredGender).toBeDefined();
    expect(postedJobs[0].maxAge).toBeDefined();
    expect(postedJobs[0].requiredEducation).toBeDefined();
    expect(postedJobs[0].status).toBeDefined();
    expect(postedJobs[0].isUrgent).toBeDefined();
    
  });

  it('should fail to get user details without authentication', async () => {
    const response = await request(app)
      .get(entrypoints.me);
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBeDefined();
  });

  it('should fail to get user\'s posted jobs without authentication', async () => {
    const response = await request(app)
      .get(entrypoints.myJobPostings);
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBeDefined();
  });

  it('should fail to get user\'s applied jobs without authentication', async () => {
    const response = await request(app)
      .get(entrypoints.myJobApplications);
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBeDefined();
  });

  it('should fail to get user details with invalid token', async () => {
    const response = await request(app)
      .get(entrypoints.me)
      .set('access_token', 'asal');
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBeDefined();
  });

  it('should fail to get user\'s posted jobs with invalid token', async () => {
    const response = await request(app)
      .get(entrypoints.myJobPostings)
      .set('access_token', 'asal');
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBeDefined();
  });

  it('should fail to get user\'s applied jobs with invalid token', async () => {
    const response = await request(app)
      .get(entrypoints.myJobApplications)
      .set('access_token', 'asal');
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBeDefined();
  });

})