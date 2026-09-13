export interface DiagramNode {
  id: string;
  label: string;
  x: number; // percentage
  y: number; // percentage
}

export interface DiagramEdge {
  from: string;
  to: string;
}

export interface DiagramColumn {
  id: string;
  label: string;
  x: number;
  nodes: { id: string; label: string; y: number }[];
}

export interface Project {
  id: string;
  index: string;
  name: string;
  title: string;
  description: string;
  technologies: string[];
  highlight?: string;
  diagram: {
    nodes: DiagramNode[];
    edges: DiagramEdge[];
  };
}

export const projects: Project[] = [
  {
    id: "bfi-cloud",
    index: "PROJECT 01",
    name: "BFI CLOUD INFRASTRUCTURE",
    title: "Infrastructure as Code — AWS",
    description:
      "Production and staging infrastructure provisioned through Terraform with environment separation and automated GitHub Actions deployments.",
    technologies: [
      "AWS",
      "Terraform",
      "EC2",
      "ALB",
      "Route53",
      "GitHub Actions",
      "CloudWatch",
      "Docker",
      "PM2",
    ],
    diagram: {
      nodes: [
        { id: "internet", label: "INTERNET", x: 50, y: 4 },
        { id: "route53", label: "Route53", x: 50, y: 18 },
        { id: "alb", label: "AWS ALB", x: 50, y: 32 },
        { id: "prod", label: "PRODUCTION\nEC2 ARM", x: 25, y: 48 },
        { id: "staging", label: "STAGING\nEC2 ARM", x: 75, y: 48 },
        { id: "docker-prod", label: "Docker", x: 25, y: 64 },
        { id: "docker-staging", label: "Docker", x: 75, y: 64 },
        { id: "pm2-prod", label: "PM2 Apps", x: 25, y: 78 },
        { id: "pm2-staging", label: "PM2 Apps", x: 75, y: 78 },
        { id: "cw-prod", label: "CloudWatch", x: 25, y: 92 },
        { id: "cw-staging", label: "CloudWatch", x: 75, y: 92 },
      ],
      edges: [
        { from: "internet", to: "route53" },
        { from: "route53", to: "alb" },
        { from: "alb", to: "prod" },
        { from: "alb", to: "staging" },
        { from: "prod", to: "docker-prod" },
        { from: "staging", to: "docker-staging" },
        { from: "docker-prod", to: "pm2-prod" },
        { from: "docker-staging", to: "pm2-staging" },
        { from: "pm2-prod", to: "cw-prod" },
        { from: "pm2-staging", to: "cw-staging" },
      ],
    },
  },
  {
    id: "finops",
    index: "PROJECT 02",
    name: "CLOUD FINOPS PLATFORM",
    title: "Centralized Multi-Cloud Cost Visibility",
    description: "Centralized multi-cloud cost visibility and optimization platform.",
    technologies: [
      "AWS Cost Explorer",
      "Azure Cost Management",
      "GCP Billing",
      "BigQuery",
      "Terraform",
    ],
    diagram: {
      nodes: [
        { id: "aws", label: "AWS", x: 15, y: 15 },
        { id: "azure", label: "Azure", x: 15, y: 38 },
        { id: "gcp", label: "GCP", x: 15, y: 61 },
        { id: "saas", label: "SaaS", x: 15, y: 84 },
        { id: "cost-data", label: "CENTRALIZED\nCOST DATA", x: 50, y: 50 },
        { id: "bigquery", label: "BigQuery", x: 78, y: 50 },
        { id: "dashboard", label: "FINOPS\nDASHBOARD", x: 78, y: 80 },
      ],
      edges: [
        { from: "aws", to: "cost-data" },
        { from: "azure", to: "cost-data" },
        { from: "gcp", to: "cost-data" },
        { from: "saas", to: "cost-data" },
        { from: "cost-data", to: "bigquery" },
        { from: "bigquery", to: "dashboard" },
      ],
    },
  },
  {
    id: "k8s-observability",
    index: "PROJECT 03",
    name: "KUBERNETES OBSERVABILITY",
    title: "Metrics, Logs & Traces Pipeline",
    description:
      "Unified observability stack surfacing metrics, logs and traces from Kubernetes workloads into a single Grafana pane.",
    technologies: ["Kubernetes", "Prometheus", "Loki", "Jaeger", "Grafana"],
    diagram: {
      nodes: [
        { id: "k8s", label: "KUBERNETES", x: 50, y: 8 },
        { id: "prometheus", label: "Prometheus", x: 20, y: 42 },
        { id: "loki", label: "Loki", x: 50, y: 42 },
        { id: "jaeger", label: "Jaeger", x: 80, y: 42 },
        { id: "grafana", label: "Grafana", x: 50, y: 80 },
      ],
      edges: [
        { from: "k8s", to: "prometheus" },
        { from: "k8s", to: "loki" },
        { from: "k8s", to: "jaeger" },
        { from: "prometheus", to: "grafana" },
        { from: "loki", to: "grafana" },
        { from: "jaeger", to: "grafana" },
      ],
    },
  },
  {
    id: "api-migration",
    index: "PROJECT 04",
    name: "API MIGRATION",
    title: "Legacy to Cloud-Native API Platform",
    description: "Migration of legacy and on-prem APIs into a managed, automated Azure platform.",
    highlight: "250+ APIs migrated",
    technologies: ["AWS", "Azure", "Azure API Management", "AKS", "ACR", "Jenkins"],
    diagram: {
      nodes: [
        { id: "legacy", label: "LEGACY /\nON-PREM", x: 50, y: 6 },
        { id: "apim", label: "API MANAGEMENT", x: 50, y: 26 },
        { id: "azure", label: "AZURE", x: 50, y: 46 },
        { id: "aks", label: "AKS", x: 50, y: 66 },
        { id: "cicd", label: "AUTOMATED CI/CD", x: 50, y: 86 },
      ],
      edges: [
        { from: "legacy", to: "apim" },
        { from: "apim", to: "azure" },
        { from: "azure", to: "aks" },
        { from: "aks", to: "cicd" },
      ],
    },
  },
];

