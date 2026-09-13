// Central, editable profile configuration.
// Leave fields empty until you have the real values — nothing here is invented.
export const profile = {
  name: "Prakash",
  initials: "PR",
  role: "DevOps Engineer | Cloud Infrastructure | Kubernetes | Automation",
  roleLong: "DevOps Engineer / Cloud Engineer",
  careerDirection: "Senior DevOps Engineer / Cloud Engineer / Platform Engineer",
  location: "India",
  status: "OPEN TO OPPORTUNITIES",

  // Fill these in when ready — left blank intentionally.
  github: "https://github.com/prakashgithub-un",
  githubUsername: "prakashgithub-un",
  linkedin: "https://www.linkedin.com/in/prakashin/",
  email: "prakashmanioutbox@gmail.com",
  resume: "",
  portfolio: "",

  headline: ["BUILDING", "CLOUD INFRASTRUCTURE", "THAT SCALES."],
  headlineHighlights: ["Cloud", "Infrastructure", "Automation"],
  headlineLabel: "DEVOPS • CLOUD • KUBERNETES • AUTOMATION",
  positioning:
    "I build, automate and operate reliable cloud infrastructure across AWS, Azure and Kubernetes environments.",
  subheadline:
    "DevOps Engineer focused on cloud infrastructure, Kubernetes, Infrastructure as Code, CI/CD, observability and automation, with a growing focus on cloud architecture, security, platform engineering and scalable production systems.",

  about: [
    "I'm a DevOps Engineer focused on transforming infrastructure into automated, observable and reliable systems.",
    "My experience spans AWS, Azure, Kubernetes, Terraform, CI/CD and observability. I enjoy solving infrastructure problems, improving deployment workflows and designing systems that are easier to operate and scale.",
    "My engineering journey is increasingly focused on cloud architecture, platform engineering, security, advanced Kubernetes and automation.",
  ],
} as const;

export const coreExpertise = [
  "AWS",
  "Azure",
  "GCP",
  "Kubernetes",
  "Docker",
  "Terraform",
  "GitHub Actions",
  "Jenkins",
  "CI/CD",
  "Infrastructure as Code",
  "Cloud Infrastructure",
  "Observability",
  "Cloud FinOps",
  "Linux",
  "Networking",
  "Automation",
] as const;

export const metrics = [
  { value: "250+", label: "APIs Migrated" },
  { value: "5+", label: "Years in Infrastructure / DevOps" },
  { value: "3", label: "Cloud Platforms" },
  { value: "Multiple", label: "Production Environments" },
  { value: "Terraform", label: "Infrastructure as Code" },
] as const;

export const education = [
  {
    degree: "Bachelor of Engineering",
    field: "Civil Engineering",
    school: "Kongu Engineering College",
    period: "2016 – 2019",
  },
  {
    degree: "MBA",
    field: "Logistics & Supply Chain Management",
    school: "University of Madras",
    period: "2022 – 2024",
  },
] as const;
