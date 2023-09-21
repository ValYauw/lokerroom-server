const entrypoints = {

  login: '/login',
  register: '/register',

  users: (pageNumber = 1) => `/users?p=${pageNumber}`,
  user: (id) => `/users/${id}`,

  me: '/user',
  myReviews: '/user/reviews',
  myJobApplications: '/user/job-applications',
  myJobPostings: '/user/job-postings',

  // TODO: Testing
  jobPostings: '/job-postings',
  jobPosting: (id) => `/job-postings/${id}`,

  applyToJob: (id) => `/job-postings/${id}/apply`,
  reviewUser: (id) => `/users/${id}/review`,

}

export default entrypoints;