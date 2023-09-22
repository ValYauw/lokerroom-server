const UserController = require('../controllers/userController');
const JobController = require('../controllers/jobController');

const router = require('express').Router();

const authentication = require('../middleware/authentication');
const authorization = require('../middleware/authorization');

router.get('/', (req, res) => {
  res.send('Welcome to the API entrypoint');
});
router.post('/login', UserController.login);
router.post('/register', UserController.register);
router.get('/users', UserController.getUsers);
router.get('/users/:id', UserController.getUserById);
router.get('/job-postings', JobController.getJobPostings);

router.use(authentication);

router.get('/user', UserController.getLoggedInUserDetails);
router.get('/user/reviews', UserController.getLoggedInUserReviews);
router.get('/user/job-applications', UserController.getLoggedInUserJobApplications);
router.get('/user/job-postings', UserController.getLoggedInUserJobPostings);
router.patch('/user', UserController.editLoggedInUserDetails);

router.post('/job-postings', JobController.addJobPosting);
router.put('/job-postings/:id', authorization, JobController.updateJobPostingDetails);
router.patch('/job-postings/:id', authorization, JobController.updateJobPostingStatus);

router.post('/job-postings/:id/application', JobController.applyToJob);
router.patch('/job-postings/:id/application/:appId', authorization, JobController.processJobApplication);

router.post('/users/:id/review', UserController.addReview);

module.exports = router;
