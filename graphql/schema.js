const typeDefs = `#graphql

  # Enumerations
  enum Gender {
    Male
    Female
  }
  enum ApplicationStatus {
    Accepted
    Rejected
    Processing
  }
  enum JobPostingStatus {
    Active
    Inactive
    Filled
  }


  # Object Type buat Query 
  type EducationLevel {
    id: Int 
    education: String
    priority: Int
  }
  type Category {
    id: Int
    name: String
  }
  type User {
    id: Int 
    name: String
    telephone: String
    email: String
    address: String
    imgUrl: String
    educationLevel: EducationLevel
    gender: Gender
    dateOfBirth: Date
    profileDescription: String
    receivedReviews: [Review]
  }
  type Me {
    id: Int 
    name: String
    telephone: String
    email: String
    address: String
    imgUrl: String
    educationLevel: EducationLevel
    gender: Gender
    dateOfBirth: Date
    profileDescription: String
    appliedJobs: [JobApplication]
    postedJobs: [JobPosting]
    receivedReviews: [Review]
  }
  type JobApplication {
    id: Int
    jobPosting: JobPosting
    applicationStatus: ApplicationStatus
    isEmployed: Boolean
    startDateOfEmployment: Date
    endDateOfEmployment: Date
  }
  type JobPosting {
    id: Int
    title: String
    description: String
    address: String
    category: Category
    minSalary: Int
    maxSalary: Int
    author: User
    requiredGender: Gender
    maxAge: Int
    requiredEducation: EducationLevel
    status: JobPostingStatus
    isUrgent: Boolean
  }
  type Review {
    id: Int
    employer: User
    user: User
    jobPosting: JobPosting
    content: String
    rating: Int
  }


  # Response setelah mutation
  type Response {
    access_token: String
    message: String
  }


  # Input Types buat Mutation
  input loginCredentials {
    telephone: String
    email: String
    password: String
  }
  input registerDetails {
    name: String
    telephone: String
    email: String
    password: String
    address: String
    educationId: Int
    gender: Gender
    dateOfBirth: Date
    profileDescription: String
  }
  input userDetails {
    name: String
    address: String
    imgUrl: String
    educationId: Int
    gender: Gender
    dateOfBirth: Date
    profileDescription: String
  }
  input newJobPosting {
    title: String
    description: String
    address: String
    categoryId: Int
    minSalary: Int
    maxSalary: Int
    requiredGender: Gender
    maxAge: Int
    requiredEducation: Int
    isUrgent: Boolean
  }
  input newReview {
    userId: Int
    jobPostingId: Int
    content: String
    rating: Int
  }

  # Schema Query dan Mutation
  type Query {
    me: Me
    user(id: Int!): User
    users(pageNumber: Int): [User]
    jobPostingById(id: Int!): JobPosting
    jobPostings(
      gender: Gender, 
      maxAge: Int, 
      categoryId: Int,
      maxEducation: EducationLevel, 
      location: String, 
      isUrgent: Boolean,
      pageNumber: Int
    ): [JobPosting]
  }
  type Mutation {
    register(registerDetails: registerDetails): Response
    login(loginCredentials: loginCredentials): Response
    editUserDetails(userDetails: userDetails): Response
    addNewJobPosting(newJobPosting: newJobPosting): JobPosting
    editJobPosting(newJobPosting: newJobPosting): JobPosting
    applyToJob(id: Int): JobApplication
    acceptJobApplication(id: Int): Response
    rejectJobApplication(id: Int): Response
    endEmploymentForJobApplication(id: Int): Response
    addReview(newReview: newReview): Review
  }
`;

export default typeDefs;