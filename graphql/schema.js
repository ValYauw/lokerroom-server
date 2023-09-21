const typeDefs = `#graphql

  # Enumerations
  enum Gender {
    Male
    Female
  }
  enum ApplicationStatus {
    Diterima
    Ditolak
    Diproses
  }
  enum EmploymentStatus {
    Bekerja
    Berhenti
  }
  enum JobPostingStatus {
    Aktif
    Tidak Aktif
    Terpenuhi
  }


  # Object Type buat Query 
  type EducationLevel {
    id: Int 
    education: String
    priority: Int
  }
  type User {
    id: Int 
    name: String
    email: String
    telephone: String
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
    email: String
    telephone: String
    address: String
    imgUrl: String
    educationLevel: EducationLevel
    gender: Gender
    dateOfBirth: Date
    profileDescription: String
    password: String
    appliedJobs: [JobApplication]
    postedJobs: [JobPosting]
    receivedReviews: [Review]
  }
  type JobApplication {
    id: Int
    jobPosting: JobPosting
    applicationStatus: ApplicationStatus
    employmentStatus: EmploymentStatus
    dateOfJobTermination: Date
  }
  type JobPosting {
    id: Int
    title: String
    description: String
    address: String
    minSalary: Int
    maxSalary: Int
    employer: User
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
    body: String
    rating: Int
  }


  # Response setelah mutation
  type Response {
    access_token: String
    message: String
  }


  # Input Types buat Mutation
  input loginCredentials {
    email: String
    telephone: String
    password: String
  }
  input registerDetails {
    name: String
    email: String
    telephone: String
    password: String
    address: String
    educationId: Int
    gender: Gender
    dateOfBirth: Date
  }
  input newJobPosting {
    title: String
    description: String
    address: String
    minSalary: Int
    maxSalary: Int
    requiredGender: Gender
    maxAge: Int
    requiredEducation: Int
    status: JobPostingStatus
    isUrgent: Boolean
  }
  input newReview {
    userId: Int
    jobPostingId: Int
    body: String
    rating: Int
  }

  # Schema Query dan Mutation
  type Query {
    me: Me
    user(id: Int!): User
    users(pageNumber: Int): [User]
    jobPostingById(id: Int!): JobPosting
    jobPostings(
      requiredGender: Gender, 
      maxAge: Int, 
      minEducation: EducationLevel, 
      location: String, 
      isUrgent: Boolean,
      pageNumber: Int
    ): [JobPosting]
  }
  type Mutation {
    register(registerDetails: registerDetails): Response
    login(loginCredentials: loginCredentials): Response
    addNewJobPosting(newJobPosting: newJobPosting): JobPosting
    editJobPosting(newJobPosting: newJobPosting): JobPosting
    applyToJob(id: Int): JobApplication
    addReview(newReview: newReview): Review
  }
`;

export default typeDefs;