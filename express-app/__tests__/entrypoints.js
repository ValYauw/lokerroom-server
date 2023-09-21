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
  jobPostings: (pageNumber = 1, {requiredGender, maxAge, minEducation, location, isUrgent} = {}) => {
    let query = '';
    if (requiredGender) query += `&gender=${requiredGender}`;
    if (maxAge) query += `&maxAge=${maxAge}`;
    if (minEducation) query += `&minEducation=${minEducation}`;
    if (location) query += `&location=${location}`;
    if (isUrgent) query += `&isUrgent=${isUrgent}`;
    return `/job-postings?p=${pageNumber}${query}`
  },
  jobPosting: (id) => `/job-postings/${id}`,

  applyToJob: (id) => `/job-postings/${id}/apply`,
  reviewUser: (id) => `/users/${id}/review`,

}

export default entrypoints;