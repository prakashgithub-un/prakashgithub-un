// Skill maturity levels — used everywhere a skill/topic needs an honest label.
// "production": shipped and operated in a real job.
// "developing": actively being built up, not yet production-proven.
// "interest": an area of engineering interest, not yet hands-on.
export type SkillLevel = "production" | "developing" | "interest";

export interface CloudSkillGroup {
  platform: string;
  level: SkillLevel;
  items: string[];
}

export const cloudSkillMatrix: CloudSkillGroup[] = [
  {
    platform: "AWS",
    level: "production",
    items: ["EC2", "VPC", "IAM", "ALB", "Route53", "S3", "CloudWatch", "EKS", "Cost Explorer"],
  },
  {
    platform: "Azure",
    level: "production",
    items: ["AKS", "ACR", "API Management", "Application Gateway", "Azure Storage", "Azure Cost Management"],
  },
  {
    platform: "GCP",
    level: "developing",
    items: ["GCP infrastructure", "Billing", "BigQuery"],
  },
];

export const kubernetesTree = [
  "Cluster Architecture",
  "Networking",
  "Ingress / Gateway API",
  "RBAC",
  "NetworkPolicy",
  "Helm",
  "HPA / VPA",
  "Cluster Autoscaling",
  "Observability",
  "Security",
  "Troubleshooting",
];

export const kubernetesExperience = {
  production: ["Docker", "Kubernetes", "K3s", "AKS", "KOPS"],
  advanced: [
    "Kubernetes networking",
    "CNI",
    "CoreDNS",
    "RBAC",
    "NetworkPolicy",
    "Gateway API",
    "Cluster upgrades",
    "Advanced troubleshooting",
    "Resource optimization",
    "HPA / VPA",
    "Autoscaling",
  ],
};

export const iacConcepts = [
  "Reusable modules",
  "Environment separation",
  "Remote state",
  "Variables",
  "Outputs",
  "Dependency management",
  "Terraform validation",
  "Infrastructure testing",
  "Governance",
];

export const iacStrengths = [
  "Reusable, versioned modules shared across projects — no copy-pasted resource blocks per environment.",
  "Clean separation between staging and production, each with its own state and variables.",
  "Remote state management so infrastructure changes stay safe under concurrent, collaborative work.",
  "Validation and plan review built into the deployment pipeline, not run ad hoc from a laptop.",
];

export const cicdExperience = {
  production: ["GitHub Actions", "Jenkins", "Docker", "ACR", "ECR", "Kubernetes"],
  advanced: [
    "Deployment strategies",
    "Rollback",
    "Blue/Green",
    "Canary",
    "GitOps",
    "Environment promotion",
    "Secrets management",
  ],
};

export const securityConcepts = [
  "IAM",
  "Least privilege",
  "Secrets Management",
  "Vault",
  "AWS IAM",
  "Azure Entra ID",
  "Trivy",
  "Checkov",
  "Snyk",
  "OPA",
  "Gatekeeper",
  "Kyverno",
  "Security Hub",
  "Defender for Cloud",
];

export const architectureConcepts = [
  "High availability",
  "Fault tolerance",
  "Disaster recovery",
  "RTO",
  "RPO",
  "Scalability",
  "Cost optimization",
  "Security",
  "Multi-account architecture",
  "Multi-subscription architecture",
];

export const observabilityConcepts = ["Metrics", "Logs", "Traces", "Alerts", "SLOs", "SLIs", "Incident response"];

export const observabilityTech = ["Prometheus", "Grafana", "Loki", "Jaeger", "CloudWatch", "Datadog"];

export const finopsConcepts = [
  "Cost visibility",
  "Budgeting",
  "Forecasting",
  "Resource optimization",
  "Idle resource detection",
  "Multi-cloud cost comparison",
];

export const platformEngineeringFocus = [
  "Developer experience",
  "Self-service infrastructure",
  "Reusable Terraform modules",
  "Golden paths",
  "Kubernetes platforms",
  "CI/CD platforms",
  "Environment automation",
  "Observability",
];

export interface AutomationNode {
  id: string;
  system: string;
  step: string;
  description: string;
  code: string;
}

// Feeds the Automation Engine visualization — one node per system.
export const automationNodes: AutomationNode[] = [
  {
    id: "aws",
    system: "AWS",
    step: "Health Check",
    description: "Sweeps EC2/ALB target health across a region and flags anything unhealthy.",
    code: `import boto3

def unhealthy_targets(region: str):
    elbv2 = boto3.client("elbv2", region_name=region)
    groups = elbv2.describe_target_groups()["TargetGroups"]

    for group in groups:
        health = elbv2.describe_target_health(
            TargetGroupArn=group["TargetGroupArn"]
        )
        for t in health["TargetHealthDescriptions"]:
            if t["TargetHealth"]["State"] != "healthy":
                yield group["TargetGroupName"], t`,
  },
  {
    id: "kubernetes",
    system: "Kubernetes",
    step: "Workload Analysis",
    description: "Scans workloads across every namespace and flags anything stuck outside a healthy state.",
    code: `from kubernetes import client, config

config.load_kube_config()
v1 = client.CoreV1Api()

pods = v1.list_pod_for_all_namespaces().items
stuck = [
    p for p in pods
    if p.status.phase not in ("Running", "Succeeded")
]

for p in stuck:
    print(f"{p.metadata.namespace}/{p.metadata.name}: {p.status.phase}")`,
  },
  {
    id: "finops",
    system: "FinOps",
    step: "Cost Analysis",
    description: "Pulls daily cost-by-service from AWS Cost Explorer for trend tracking.",
    code: `import boto3
from datetime import date, timedelta

ce = boto3.client("ce")
end = date.today()
start = end - timedelta(days=7)

response = ce.get_cost_and_usage(
    TimePeriod={"Start": str(start), "End": str(end)},
    Granularity="DAILY",
    Metrics=["UnblendedCost"],
    GroupBy=[{"Type": "DIMENSION", "Key": "SERVICE"}],
)`,
  },
];

export interface DevelopingCategory {
  title: string;
  items: string[];
}

export const currentlyDeveloping: DevelopingCategory[] = [
  {
    title: "Advanced Kubernetes",
    items: ["Networking", "CNI", "Gateway API", "Security", "Cluster operations", "Advanced troubleshooting"],
  },
  {
    title: "Cloud Architecture",
    items: ["HA", "DR", "RTO/RPO", "Scalability", "Multi-account / subscription design"],
  },
  {
    title: "DevSecOps",
    items: ["Security scanning", "IAM", "Secrets", "Policy as Code", "Runtime security"],
  },
  {
    title: "System Design",
    items: ["Distributed systems", "Scalability", "Reliability", "Trade-offs"],
  },
  {
    title: "Python Automation",
    items: ["Cloud APIs", "Kubernetes APIs", "Infrastructure automation"],
  },
  {
    title: "Platform Engineering",
    items: ["Internal developer platforms", "Golden paths", "Self-service infrastructure"],
  },
];
