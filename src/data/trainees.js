// Trainee records. Skills are derived from each trainee's program, so the
// dataset stays internally consistent across dashboards, tables and the
// skill-gap analysis workflow. All names and figures are fictional.
export const TRAINEES = [
  { id: "tr-01", name: "Rahul Sharma", gender: "M", age: 24, state: "Delhi NCR", programId: "prog-aiml",
    skills: ["Python", "SQL", "Machine Learning", "Pandas"], trainingProgress: 100, status: "Completed", certified: true,
    employmentStatus: "Employed", employerId: "emp-1", jobRoleId: "job-data-analyst", salaryLPA: 5.2,
    joiningDate: "2025-03-10", retentionMonths: 7, targetJobId: "job-data-scientist" },

  { id: "tr-02", name: "Priya Singh", gender: "F", age: 23, state: "Delhi NCR", programId: "prog-webdev",
    skills: ["JavaScript", "React", "Node.js", "SQL"], trainingProgress: 100, status: "Completed", certified: true,
    employmentStatus: "Employed", employerId: "emp-2", jobRoleId: "job-frontend-dev", salaryLPA: 4.8,
    joiningDate: "2025-04-02", retentionMonths: 6, targetJobId: "job-fullstack-dev" },

  { id: "tr-03", name: "Amit Kumar", gender: "M", age: 26, state: "Rajasthan", programId: "prog-analytics",
    skills: ["SQL", "Excel"], trainingProgress: 65, status: "In Training", certified: false,
    employmentStatus: "Seeking", employerId: null, jobRoleId: null, salaryLPA: null,
    joiningDate: null, retentionMonths: null, targetJobId: "job-data-analyst" },

  { id: "tr-04", name: "Neha Verma", gender: "F", age: 25, state: "Uttar Pradesh", programId: "prog-aiml",
    skills: ["Python", "SQL", "Machine Learning", "Pandas"], trainingProgress: 100, status: "Completed", certified: true,
    employmentStatus: "Employed", employerId: "emp-6", jobRoleId: "job-junior-data-scientist", salaryLPA: 5.6,
    joiningDate: "2025-02-14", retentionMonths: 8, targetJobId: "job-data-scientist" },

  { id: "tr-05", name: "Karan Mehta", gender: "M", age: 27, state: "Karnataka", programId: "prog-cloud",
    skills: ["AWS", "Azure", "Cloud Computing", "Docker"], trainingProgress: 100, status: "Completed", certified: true,
    employmentStatus: "Employed", employerId: "emp-4", jobRoleId: "job-cloud-engineer", salaryLPA: 7.8,
    joiningDate: "2025-01-20", retentionMonths: 9, targetJobId: "job-devops-engineer" },

  { id: "tr-06", name: "Ananya Gupta", gender: "F", age: 22, state: "Maharashtra", programId: "prog-analytics",
    skills: ["SQL", "Excel", "Power BI", "Data Visualization"], trainingProgress: 100, status: "Completed", certified: true,
    employmentStatus: "Employed", employerId: "emp-3", jobRoleId: "job-bi-analyst", salaryLPA: 5.0,
    joiningDate: "2025-05-05", retentionMonths: 4, targetJobId: "job-bi-developer" },

  { id: "tr-07", name: "Vikram Rathore", gender: "M", age: 24, state: "Bihar", programId: "prog-marketing",
    skills: ["Digital Marketing", "SEO"], trainingProgress: 80, status: "In Training", certified: false,
    employmentStatus: "Seeking", employerId: null, jobRoleId: null, salaryLPA: null,
    joiningDate: null, retentionMonths: null, targetJobId: "job-digital-marketer" },

  { id: "tr-08", name: "Sneha Reddy", gender: "F", age: 26, state: "Telangana", programId: "prog-cyber",
    skills: ["Cybersecurity", "SQL"], trainingProgress: 100, status: "Completed", certified: true,
    employmentStatus: "Employed", employerId: "emp-5", jobRoleId: "job-security-analyst", salaryLPA: 6.6,
    joiningDate: "2025-03-28", retentionMonths: 6, targetJobId: "job-security-analyst" },

  { id: "tr-09", name: "Arjun Nair", gender: "M", age: 23, state: "Haryana", programId: "prog-webdev",
    skills: ["JavaScript", "React", "Node.js"], trainingProgress: 100, status: "Completed", certified: true,
    employmentStatus: "Seeking", employerId: null, jobRoleId: null, salaryLPA: null,
    joiningDate: null, retentionMonths: null, targetJobId: "job-fullstack-dev" },

  { id: "tr-10", name: "Pooja Yadav", gender: "F", age: 25, state: "Punjab", programId: "prog-bi",
    skills: ["Power BI", "Excel", "SQL"], trainingProgress: 100, status: "Completed", certified: true,
    employmentStatus: "Employed", employerId: "emp-9", jobRoleId: "job-bi-developer", salaryLPA: 5.9,
    joiningDate: "2025-06-01", retentionMonths: 3, targetJobId: "job-bi-developer" },

  { id: "tr-11", name: "Rohit Chauhan", gender: "M", age: 28, state: "Uttar Pradesh", programId: "prog-aiml",
    skills: ["Python", "SQL", "Machine Learning", "Deep Learning", "TensorFlow"], trainingProgress: 100, status: "Completed", certified: true,
    employmentStatus: "Employed", employerId: "emp-12", jobRoleId: "job-ml-engineer", salaryLPA: 7.9,
    joiningDate: "2025-02-18", retentionMonths: 8, targetJobId: "job-ml-engineer" },

  { id: "tr-12", name: "Simran Kaur", gender: "F", age: 22, state: "Punjab", programId: "prog-marketing",
    skills: ["Digital Marketing", "SEO", "Data Visualization"], trainingProgress: 100, status: "Completed", certified: true,
    employmentStatus: "Employed", employerId: "emp-7", jobRoleId: "job-digital-marketer", salaryLPA: 3.8,
    joiningDate: "2025-04-22", retentionMonths: 5, targetJobId: "job-digital-marketer" },

  { id: "tr-13", name: "Manish Tiwari", gender: "M", age: 29, state: "Delhi NCR", programId: "prog-cloud",
    skills: ["AWS", "Cloud Computing", "Docker"], trainingProgress: 100, status: "Completed", certified: true,
    employmentStatus: "Employed", employerId: "emp-10", jobRoleId: "job-cloud-engineer", salaryLPA: 7.3,
    joiningDate: "2025-01-30", retentionMonths: 9, targetJobId: "job-devops-engineer" },

  { id: "tr-14", name: "Kavita Joshi", gender: "F", age: 24, state: "Rajasthan", programId: "prog-analytics",
    skills: ["SQL", "Excel", "Power BI"], trainingProgress: 100, status: "Completed", certified: true,
    employmentStatus: "Seeking", employerId: null, jobRoleId: null, salaryLPA: null,
    joiningDate: null, retentionMonths: null, targetJobId: "job-data-analyst" },

  { id: "tr-15", name: "Deepak Malhotra", gender: "M", age: 27, state: "Maharashtra", programId: "prog-cyber",
    skills: ["Cybersecurity", "Cloud Computing"], trainingProgress: 70, status: "In Training", certified: false,
    employmentStatus: "Seeking", employerId: null, jobRoleId: null, salaryLPA: null,
    joiningDate: null, retentionMonths: null, targetJobId: "job-security-analyst" },

  { id: "tr-16", name: "Ritu Bansal", gender: "F", age: 23, state: "Delhi NCR", programId: "prog-aiml",
    skills: ["Python", "SQL", "Pandas"], trainingProgress: 55, status: "In Training", certified: false,
    employmentStatus: "Seeking", employerId: null, jobRoleId: null, salaryLPA: null,
    joiningDate: null, retentionMonths: null, targetJobId: "job-data-scientist" },

  { id: "tr-17", name: "Suresh Pillai", gender: "M", age: 30, state: "Karnataka", programId: "prog-webdev",
    skills: ["JavaScript", "React", "Node.js", "SQL"], trainingProgress: 100, status: "Completed", certified: true,
    employmentStatus: "Employed", employerId: "emp-8", jobRoleId: "job-backend-dev", salaryLPA: 6.0,
    joiningDate: "2025-03-15", retentionMonths: 6, targetJobId: "job-backend-dev" },

  { id: "tr-18", name: "Anjali Deshmukh", gender: "F", age: 26, state: "Haryana", programId: "prog-bi",
    skills: ["Power BI", "Excel", "Data Visualization"], trainingProgress: 100, status: "Completed", certified: true,
    employmentStatus: "Employed", employerId: "emp-3", jobRoleId: "job-bi-analyst", salaryLPA: 4.9,
    joiningDate: "2025-05-18", retentionMonths: 4, targetJobId: "job-bi-analyst" },

  { id: "tr-19", name: "Harsh Vardhan", gender: "M", age: 21, state: "Uttar Pradesh", programId: "prog-marketing",
    skills: ["Digital Marketing", "SEO"], trainingProgress: 100, status: "Completed", certified: true,
    employmentStatus: "Not Placed", employerId: null, jobRoleId: null, salaryLPA: null,
    joiningDate: null, retentionMonths: null, targetJobId: "job-seo-specialist" },

  { id: "tr-20", name: "Meera Iyer", gender: "F", age: 25, state: "Maharashtra", programId: "prog-analytics",
    skills: ["SQL", "Excel", "Power BI", "Data Visualization"], trainingProgress: 100, status: "Completed", certified: true,
    employmentStatus: "Employed", employerId: "emp-9", jobRoleId: "job-bi-analyst", salaryLPA: 5.1,
    joiningDate: "2025-02-25", retentionMonths: 7, targetJobId: "job-bi-analyst" },

  { id: "tr-21", name: "Aditya Bhatt", gender: "M", age: 26, state: "Telangana", programId: "prog-cloud",
    skills: ["AWS", "Azure", "Docker"], trainingProgress: 100, status: "Completed", certified: true,
    employmentStatus: "Seeking", employerId: null, jobRoleId: null, salaryLPA: null,
    joiningDate: null, retentionMonths: null, targetJobId: "job-cloud-engineer" },

  { id: "tr-22", name: "Nisha Kapoor", gender: "F", age: 24, state: "Punjab", programId: "prog-aiml",
    skills: ["Python", "SQL", "Machine Learning", "Pandas", "TensorFlow"], trainingProgress: 100, status: "Completed", certified: true,
    employmentStatus: "Employed", employerId: "emp-6", jobRoleId: "job-data-engineer", salaryLPA: 7.1,
    joiningDate: "2025-01-12", retentionMonths: 9, targetJobId: "job-data-engineer" },

  { id: "tr-23", name: "Farhan Ali", gender: "M", age: 28, state: "Delhi NCR", programId: "prog-cyber",
    skills: ["Cybersecurity", "SQL", "Cloud Computing"], trainingProgress: 100, status: "Completed", certified: true,
    employmentStatus: "Employed", employerId: "emp-5", jobRoleId: "job-security-analyst", salaryLPA: 6.8,
    joiningDate: "2025-04-10", retentionMonths: 5, targetJobId: "job-security-analyst" },

  { id: "tr-24", name: "Divya Menon", gender: "F", age: 22, state: "Bihar", programId: "prog-webdev",
    skills: ["JavaScript", "React"], trainingProgress: 60, status: "In Training", certified: false,
    employmentStatus: "Seeking", employerId: null, jobRoleId: null, salaryLPA: null,
    joiningDate: null, retentionMonths: null, targetJobId: "job-frontend-dev" },
];

export const getTraineeById = (id) => TRAINEES.find((t) => t.id === id);
