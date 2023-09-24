const axios = require('axios');
const REST_API_SERVICE_URL = process.env.REST_API_SERVICE_URL;
// const { dateScalar } = require('./scalars');

const { getRequestedTopLevelFields } = require('./utils/graphql');

const resolvers = {
  // Date: dateScalar,

  Query: {

    categories: async () => {
      const { data } = await axios.get(`${REST_API_SERVICE_URL}/categories`);
      return data;
    },
    educationLevels: async () => {
      const { data } = await axios.get(`${REST_API_SERVICE_URL}/education-levels`);
      return data;
    },
    user: async (_, args) => {
      const { userId } = args;
      const { data } = await axios.get(`${REST_API_SERVICE_URL}/users/${userId || 0}`);
      return data;
    },
    users: async (_, args) => {
      const { pageNumber } = args;
      const { data: fetched } = await axios.get(`${REST_API_SERVICE_URL}/users?p=${pageNumber || 1}`);
      const { numPages, data } = fetched;
      return data;
    },
    jobPosting: async (_, args) => {
      const { jobPostingId } = args;
      const { data } = await axios.get(`${REST_API_SERVICE_URL}/job-postings/${jobPostingId}`);
      return data;
    },
    jobPostings: async (_, args) => {
      const { gender, maxAge, categoryId, educationId, location, isUrgent, pageNumber } = args;
      let query = `?p=${pageNumber || 1}`;
      if (gender) query += `&gender=${gender}`;
      if (maxAge) query += `&maxAge=${maxAge}`;
      if (categoryId) query += `&categoryId=${categoryId}`;
      if (educationId) query += `&education=${educationId}`;
      if (location) query += `&location=${location}`;
      if (isUrgent) query += `&isUrgent=true`;
      const { data: fetched } = await axios.get(`${REST_API_SERVICE_URL}/job-postings${query}`);
      const { numPages, data } = fetched;
      return data;
    },
  
    me: async (_, args, context, info) => {

      const { access_token } = context;

      const requestedFields = getRequestedTopLevelFields(info);
      const fetchCalls = ['/user'];
      for (let field of requestedFields) {
        switch (field) {
          case "postedJobs":
            fetchCalls.push('/user/job-postings');
            break;
          case "appliedJobs":
            fetchCalls.push('/user/job-applications');
            break;
          case "receivedReviews":
            fetchCalls.push('/user/reviews');
            break;
        }
      }

      const [ { data }, ...arr] = await Promise.all(fetchCalls.map(route => {
        console.log(`${REST_API_SERVICE_URL}${route}`);
        return axios.get(`${REST_API_SERVICE_URL}${route}`, {
          headers: { access_token }
        })
      }));
      
      for (let res of arr) {
        switch (res.request.path) {
          case '/user/job-postings':
            data.postedJobs = res.data;
            break;
          case '/user/job-applications':
            data.appliedJobs = res.data;
            break;
          case '/user/reviews':
            data.receivedReviews = res.data;
            break;
        }
      }
      
      return data;
    }

  }

}

module.exports = resolvers;