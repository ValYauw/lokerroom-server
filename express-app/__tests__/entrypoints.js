const entrypoints = {
  
  // POST
  login: '/login',
  register: '/register',

  // GET
  users: (pageNumber = 1) => `/users?p=${pageNumber}`,
  user: (id) => `/users/${id}`,

  // GET (my own details)
  me: '/user',
  myReviews: '/user/reviews',
  myJobApplications: '/user/job-applications',
  myJobPostings: '/user/job-postings',

  // GET
  jobPostings: ({pageNumber = 1, requiredGender, maxAge, categoryId, education, location, isUrgent} = {}) => {
    let query = '';
    if (requiredGender) query += `&gender=${requiredGender}`;
    if (maxAge) query += `&maxAge=${maxAge}`;
    if (categoryId) query += `&categoryId=${categoryId}`
    if (education) query += `&education=${education}`;
    if (location) query += `&location=${location}`;
    if (isUrgent) query += `&isUrgent=${isUrgent}`;
    return `/job-postings?p=${pageNumber}${query}`
  },
  jobPosting: (id) => `/job-postings/${id}`,
  
  // POST
  addJobPosting: '/job-postings',
  
  // PUT
  editJobPosting: (id) => `/job-posting/${id}`,

  // POST, PATCH
  applyToJob: (id) => `/job-postings/${id}/application`,

  // POST
  reviewUser: (id) => `/users/${id}/review`,

}

module.exports = entrypoints;