// Job roles that trainees are matched against, and the employers posting them.
export const JOB_ROLES = [
  { id: "job-data-scientist", title: "Data Scientist", sector: "Technology", avgSalaryLPA: 7.2, demand: "high",
    requiredSkills: ["Python", "SQL", "Machine Learning", "TensorFlow", "AWS", "Power BI"] },
  { id: "job-data-analyst", title: "Data Analyst", sector: "Analytics", avgSalaryLPA: 5.0, demand: "high",
    requiredSkills: ["SQL", "Excel", "Power BI", "Data Visualization"] },
  { id: "job-ml-engineer", title: "ML Engineer", sector: "Technology", avgSalaryLPA: 7.8, demand: "high",
    requiredSkills: ["Python", "Machine Learning", "Deep Learning", "TensorFlow", "Docker"] },
  { id: "job-frontend-dev", title: "Frontend Developer", sector: "Technology", avgSalaryLPA: 5.4, demand: "medium",
    requiredSkills: ["JavaScript", "React", "SQL"] },
  { id: "job-fullstack-dev", title: "Full-Stack Developer", sector: "Technology", avgSalaryLPA: 6.3, demand: "high",
    requiredSkills: ["JavaScript", "React", "Node.js", "SQL"] },
  { id: "job-cloud-engineer", title: "Cloud Engineer", sector: "Infrastructure", avgSalaryLPA: 7.5, demand: "high",
    requiredSkills: ["AWS", "Azure", "Cloud Computing", "Docker"] },
  { id: "job-security-analyst", title: "Security Analyst", sector: "Security", avgSalaryLPA: 6.6, demand: "high",
    requiredSkills: ["Cybersecurity", "Cloud Computing", "SQL"] },
  { id: "job-bi-analyst", title: "BI Analyst", sector: "Analytics", avgSalaryLPA: 4.9, demand: "medium",
    requiredSkills: ["Power BI", "Excel", "SQL", "Data Visualization"] },
  { id: "job-digital-marketer", title: "Digital Marketing Executive", sector: "Marketing", avgSalaryLPA: 3.8, demand: "medium",
    requiredSkills: ["Digital Marketing", "SEO", "Data Visualization"] },
  { id: "job-devops-engineer", title: "DevOps Engineer", sector: "Infrastructure", avgSalaryLPA: 7.9, demand: "high",
    requiredSkills: ["Docker", "AWS", "Cloud Computing", "Java"] },
  { id: "job-backend-dev", title: "Backend Developer", sector: "Technology", avgSalaryLPA: 6.0, demand: "medium",
    requiredSkills: ["Node.js", "SQL", "Java"] },
  { id: "job-data-engineer", title: "Data Engineer", sector: "Technology", avgSalaryLPA: 7.1, demand: "high",
    requiredSkills: ["Python", "SQL", "AWS", "Cloud Computing"] },
  { id: "job-qa-engineer", title: "QA Engineer", sector: "Technology", avgSalaryLPA: 4.6, demand: "low",
    requiredSkills: ["Java", "SQL"] },
  { id: "job-seo-specialist", title: "SEO Specialist", sector: "Marketing", avgSalaryLPA: 3.6, demand: "low",
    requiredSkills: ["SEO", "Digital Marketing"] },
  { id: "job-bi-developer", title: "BI Developer", sector: "Analytics", avgSalaryLPA: 5.7, demand: "medium",
    requiredSkills: ["Power BI", "SQL", "Python", "Data Visualization"] },
  { id: "job-junior-data-scientist", title: "Junior Data Scientist", sector: "Technology", avgSalaryLPA: 5.8, demand: "high",
    requiredSkills: ["Python", "SQL", "Machine Learning", "Pandas"] },
];

export const getJobById = (id) => JOB_ROLES.find((j) => j.id === id);

export const EMPLOYERS = [
  { id: "emp-1", name: "XYZ Technologies", sector: "Technology", location: "Gurugram, HR", openRoleIds: ["job-data-analyst", "job-data-scientist"] },
  { id: "emp-2", name: "ABC Labs", sector: "Technology", location: "Noida, UP", openRoleIds: ["job-frontend-dev", "job-fullstack-dev"] },
  { id: "emp-3", name: "Northbridge Analytics", sector: "Analytics", location: "Delhi NCR", openRoleIds: ["job-bi-analyst", "job-bi-developer"] },
  { id: "emp-4", name: "CloudNine Systems", sector: "Infrastructure", location: "Bengaluru, KA", openRoleIds: ["job-cloud-engineer", "job-devops-engineer"] },
  { id: "emp-5", name: "SecureNet Solutions", sector: "Security", location: "Pune, MH", openRoleIds: ["job-security-analyst"] },
  { id: "emp-6", name: "Vertex Data Works", sector: "Technology", location: "Hyderabad, TG", openRoleIds: ["job-data-engineer", "job-ml-engineer"] },
  { id: "emp-7", name: "Reach Digital Co.", sector: "Marketing", location: "Jaipur, RJ", openRoleIds: ["job-digital-marketer", "job-seo-specialist"] },
  { id: "emp-8", name: "Skyline Softworks", sector: "Technology", location: "Chandigarh, PB", openRoleIds: ["job-backend-dev", "job-qa-engineer"] },
  { id: "emp-9", name: "Insightful BI Pvt Ltd", sector: "Analytics", location: "Lucknow, UP", openRoleIds: ["job-bi-developer", "job-bi-analyst"] },
  { id: "emp-10", name: "Quanta Cloud Labs", sector: "Infrastructure", location: "Delhi NCR", openRoleIds: ["job-cloud-engineer", "job-data-engineer"] },
  { id: "emp-11", name: "Modernist Retail Group", sector: "Marketing", location: "Patna, BR", openRoleIds: ["job-digital-marketer"] },
  { id: "emp-12", name: "Alta Systems", sector: "Technology", location: "Mohali, PB", openRoleIds: ["job-junior-data-scientist", "job-ml-engineer"] },
];

export const getEmployerById = (id) => EMPLOYERS.find((e) => e.id === id);
