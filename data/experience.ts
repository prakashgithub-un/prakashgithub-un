export interface ExperienceEntry {
  id: string;
  company: string;
  title: string;
  period: string;
  focus: string[];
  highlight?: { value: string; label: string };
}

// Ordered most-recent first. Dates verified — do not alter without confirming with source.
export const experience: ExperienceEntry[] = [
  {
    id: "grethena",
    company: "GRETHENA SOLUTIONS",
    title: "DevOps Engineer",
    period: "Nov 2025 – Present",
    focus: [
      "Cloud infrastructure",
      "DevOps",
      "Automation",
      "Kubernetes",
      "CI/CD",
      "Infrastructure as Code",
    ],
  },
  {
    id: "xerago",
    company: "XERAGO",
    title: "Cloud & DevOps Engineer",
    period: "Jun 2025 – Nov 2025",
    focus: [
      "AWS",
      "Azure",
      "On-prem infrastructure",
      "Azure API Management",
      "AKS",
      "ACR",
      "Jenkins",
      "CI/CD",
    ],
    highlight: { value: "250+", label: "APIs migrated" },
  },
  {
    id: "canvendor",
    company: "CANVENDOR SOFTWARE SOLUTIONS",
    title: "DevOps Engineer",
    period: "Feb 2024 – Jun 2025",
    focus: [
      "Docker",
      "Kubernetes",
      "K3s",
      "AKS",
      "CI/CD",
      "Prometheus",
      "Grafana",
      "Jaeger",
    ],
  },
  {
    id: "moulton",
    company: "MOULTON TECHNOLOGIES",
    title: "AWS DevOps Engineer",
    period: "Jan 2024 – Feb 2024",
    focus: ["AWS infrastructure", "Kubernetes", "KOPS", "Infrastructure automation"],
  },
  {
    id: "faben",
    company: "FABEN INDIA",
    title: "Infrastructure Executive",
    period: "Oct 2019 – Jun 2023",
    focus: [
      "AWS infrastructure",
      "Terraform",
      "Jenkins",
      "Infrastructure operations",
      "Cloud infrastructure management",
    ],
  },
];
