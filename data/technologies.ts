export interface Technology {
  name: string;
  category: string;
  related?: string;
}

export interface TechCategory {
  id: string;
  name: string;
  color: string;
  items: Technology[];
}

export const techCategories: TechCategory[] = [
  {
    id: "cloud",
    name: "CLOUD",
    color: "#3b82f6",
    items: [
      { name: "AWS", category: "Cloud", related: "BFI Cloud Infrastructure" },
      { name: "Azure", category: "Cloud", related: "API Migration" },
      { name: "GCP", category: "Cloud", related: "Cloud FinOps Platform" },
    ],
  },
  {
    id: "containers",
    name: "CONTAINERS",
    color: "#22d3ee",
    items: [
      { name: "Docker", category: "Containers", related: "BFI Cloud Infrastructure" },
      { name: "Kubernetes", category: "Containers", related: "Kubernetes Observability" },
      { name: "K3s", category: "Containers", related: "Canvendor Platform" },
      { name: "AKS", category: "Containers", related: "API Migration" },
      { name: "EKS", category: "Containers", related: "Kubernetes Observability" },
    ],
  },
  {
    id: "iac",
    name: "INFRASTRUCTURE AS CODE",
    color: "#34d399",
    items: [
      { name: "Terraform", category: "Infrastructure as Code", related: "BFI Cloud Infrastructure" },
    ],
  },
  {
    id: "cicd",
    name: "CI/CD",
    color: "#fbbf24",
    items: [
      { name: "GitHub Actions", category: "CI/CD", related: "BFI Cloud Infrastructure" },
      { name: "Jenkins", category: "CI/CD", related: "API Migration" },
    ],
  },
  {
    id: "observability",
    name: "OBSERVABILITY",
    color: "#818cf8",
    items: [
      { name: "Prometheus", category: "Observability", related: "Kubernetes Observability" },
      { name: "Grafana", category: "Observability", related: "Kubernetes Observability" },
      { name: "Loki", category: "Observability", related: "Kubernetes Observability" },
      { name: "Jaeger", category: "Observability", related: "Kubernetes Observability" },
      { name: "CloudWatch", category: "Observability", related: "BFI Cloud Infrastructure" },
      { name: "Datadog", category: "Observability" },
    ],
  },
  {
    id: "automation",
    name: "AUTOMATION",
    color: "#f472b6",
    items: [
      { name: "Bash", category: "Automation" },
      { name: "Python", category: "Automation" },
      { name: "JavaScript", category: "Automation" },
      { name: "Node.js", category: "Automation" },
    ],
  },
  {
    id: "networking",
    name: "NETWORKING",
    color: "#60a5fa",
    items: [
      { name: "NGINX", category: "Networking" },
      { name: "Apache", category: "Networking" },
      { name: "Load Balancers", category: "Networking", related: "BFI Cloud Infrastructure" },
      { name: "API Management", category: "Networking", related: "API Migration" },
      { name: "DNS", category: "Networking", related: "BFI Cloud Infrastructure" },
    ],
  },
];

export const capabilities = [
  {
    id: "cloud-infra",
    title: "CLOUD INFRASTRUCTURE",
    description:
      "Design and manage production-ready infrastructure across AWS, Azure and GCP.",
  },
  {
    id: "iac",
    title: "INFRASTRUCTURE AS CODE",
    description:
      "Terraform-driven infrastructure with reusable modules and environment separation.",
  },
  {
    id: "k8s",
    title: "KUBERNETES PLATFORMS",
    description:
      "Deploy and operate containerized workloads using Kubernetes, AKS, EKS and K3s.",
  },
  {
    id: "cicd",
    title: "CI/CD AUTOMATION",
    description:
      "Build automated pipelines for testing, containerization and reliable deployments.",
  },
  {
    id: "observability",
    title: "OBSERVABILITY",
    description:
      "Monitoring, logging and tracing using Prometheus, Grafana, Loki, Jaeger, CloudWatch and Datadog.",
  },
] as const;
