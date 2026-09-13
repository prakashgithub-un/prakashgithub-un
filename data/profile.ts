// Central, editable profile configuration.
// Leave fields empty until you have the real values — nothing here is invented.
export const profile = {
  name: "Prakashraj",
  initials: "PR",
  role: "DevOps Engineer",
  roleLong: "DevOps Engineer / Cloud Engineer",
  location: "India",
  status: "OPEN TO OPPORTUNITIES",

  // Fill these in when ready — left blank intentionally.
  github: "https://github.com/prakashgithub-un",
  githubUsername: "prakashgithub-un",
  linkedin: "https://linkedin.com/prakashin",
  email: "prakashmanioutbox@gmail.com",
  resume: "",

  headline: ["BUILDING", "CLOUD INFRASTRUCTURE", "THAT SCALES."],
  headlineHighlights: ["Cloud", "Infrastructure", "Automation"],
  subheadline:
    "DevOps Engineer focused on building reliable cloud infrastructure, automated delivery pipelines, Kubernetes platforms, observability systems and scalable engineering workflows.",

  about: [
    "I'm a DevOps Engineer passionate about turning complex infrastructure into reliable, automated and scalable systems.",
    "My experience spans cloud platforms, Kubernetes, CI/CD, Infrastructure as Code, monitoring and cloud cost optimization.",
    "I enjoy solving infrastructure problems, improving deployment workflows and building platforms that allow development teams to ship faster and more reliably.",
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

export const currentlyExploring = [
  "Kubernetes",
  "Cloud FinOps",
  "Platform Engineering",
  "AI Infrastructure",
  "Cloud Security",
  "Observability",
  "Infrastructure Automation",
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
