import type { DiagramEdge, DiagramNode } from "./projects";

// Highly-available reference architecture used by the Cloud Architecture section.
export const cloudArchitectureNodes: DiagramNode[] = [
  { id: "users", label: "USERS", x: 50, y: 4 },
  { id: "dns-cdn", label: "DNS / CDN", x: 50, y: 15 },
  { id: "waf-lb", label: "WAF / LB", x: 50, y: 26 },
  { id: "k8s-a", label: "Kubernetes A", x: 30, y: 39 },
  { id: "k8s-b", label: "Kubernetes B", x: 70, y: 39 },
  { id: "app", label: "APPLICATION\nLAYER", x: 50, y: 52 },
  { id: "database", label: "Database", x: 20, y: 66 },
  { id: "cache", label: "Cache", x: 50, y: 66 },
  { id: "queue", label: "Queue", x: 80, y: 66 },
  { id: "storage", label: "Storage", x: 20, y: 80 },
  { id: "observability", label: "OBSERVABILITY", x: 70, y: 80 },
  { id: "metrics", label: "Metrics", x: 58, y: 92 },
  { id: "logs", label: "Logs", x: 70, y: 92 },
  { id: "traces", label: "Traces", x: 82, y: 92 },
];

export const cloudArchitectureEdges: DiagramEdge[] = [
  { from: "users", to: "dns-cdn" },
  { from: "dns-cdn", to: "waf-lb" },
  { from: "waf-lb", to: "k8s-a" },
  { from: "waf-lb", to: "k8s-b" },
  { from: "k8s-a", to: "app" },
  { from: "k8s-b", to: "app" },
  { from: "app", to: "database" },
  { from: "app", to: "cache" },
  { from: "app", to: "queue" },
  { from: "database", to: "storage" },
  { from: "cache", to: "observability" },
  { from: "queue", to: "observability" },
  { from: "observability", to: "metrics" },
  { from: "observability", to: "logs" },
  { from: "observability", to: "traces" },
];

export interface FlowStep {
  label: string;
  sublabel?: string;
}

export type FlowStage = FlowStep | FlowStep[];

export interface SystemDesignScenario {
  id: string;
  label: string;
  requirements: string[];
  flow: FlowStage[];
  scaling: string;
  security: string;
  observability: string;
  cost: string;
  tradeoffs: string;
}

export const systemDesignScenarios: SystemDesignScenario[] = [
  {
    id: "high-traffic-api",
    label: "High Traffic API",
    requirements: ["Low-latency reads", "Elastic burst capacity", "Zero-downtime deploys"],
    flow: [
      { label: "Users" },
      { label: "CDN" },
      { label: "WAF" },
      { label: "Load Balancer" },
      { label: "Kubernetes" },
      { label: "Services" },
      [{ label: "Cache" }, { label: "Database" }],
      [{ label: "Queue" }, { label: "Workers" }],
      { label: "Observability" },
    ],
    scaling: "Horizontal pod autoscaling on request latency and queue depth, fronted by a CDN to absorb read-heavy bursts.",
    security: "WAF at the edge, least-privilege IAM between services, network policies isolating the data tier.",
    observability: "Request-level tracing through the load balancer and services, with SLOs on p99 latency.",
    cost: "Cache hit ratio directly controls database load and compute spend — the first lever to pull.",
    tradeoffs: "Caching improves latency but introduces staleness that has to be bounded deliberately.",
  },
  {
    id: "kubernetes-platform",
    label: "Kubernetes Platform",
    requirements: ["Multi-team tenancy", "Consistent golden paths", "Safe self-service"],
    flow: [
      { label: "Developers" },
      { label: "Internal Platform" },
      [{ label: "Templates" }, { label: "CI/CD" }, { label: "Environments" }],
      { label: "Kubernetes" },
      [{ label: "Logging" }, { label: "Metrics" }, { label: "Security" }],
    ],
    scaling: "Namespace-per-team isolation with cluster autoscaling and resource quotas to keep noisy neighbors contained.",
    security: "RBAC and NetworkPolicy as the tenancy boundary, policy-as-code enforcing baseline standards on every deploy.",
    observability: "Shared Grafana/Loki/Jaeger stack with per-team dashboards carved out of common data.",
    cost: "Bin-packing via resource requests/limits and autoscaling to avoid paying for idle capacity.",
    tradeoffs: "Standardized golden paths speed teams up but reduce flexibility for edge-case workloads.",
  },
  {
    id: "multi-cloud",
    label: "Multi-Cloud",
    requirements: ["Avoid vendor lock-in", "Regional resilience", "Unified operations"],
    flow: [
      [{ label: "AWS" }, { label: "Azure" }, { label: "GCP" }],
      { label: "Common Abstraction Layer" },
      { label: "Terraform Modules" },
      [{ label: "Networking" }, { label: "Compute" }, { label: "Data" }],
      { label: "Unified Observability" },
    ],
    scaling: "Workload placement driven by latency-to-user and per-region capacity, not a single provider's limits.",
    security: "A consistent identity and policy model layered on top of each provider's native IAM.",
    observability: "One pane of glass aggregating metrics/logs from every cloud rather than three separate stacks.",
    cost: "Cross-cloud pricing comparison becomes a routing input, not just a reporting exercise.",
    tradeoffs: "Abstraction buys portability but costs you each provider's most advanced native features.",
  },
  {
    id: "cicd-platform",
    label: "CI/CD Platform",
    requirements: ["Fast feedback", "Safe rollbacks", "Auditable deployments"],
    flow: [
      { label: "Developer" },
      { label: "GitHub" },
      [{ label: "Test" }, { label: "Build" }, { label: "Scan" }],
      { label: "Container Registry" },
      { label: "Deployment" },
      { label: "Kubernetes" },
      { label: "Monitoring" },
    ],
    scaling: "Parallelized test/build/scan stages and cached dependencies to keep pipeline duration flat as the repo grows.",
    security: "Dependency and container scanning gates before anything reaches the registry.",
    observability: "Deployment markers correlated with metrics so a bad release is visible within minutes.",
    cost: "Ephemeral CI runners sized to the job, not a permanently-on build fleet.",
    tradeoffs: "Canary/blue-green rollouts add safety but roughly double the infrastructure needed during a deploy.",
  },
  {
    id: "finops-platform",
    label: "FinOps Platform",
    requirements: ["Cross-cloud cost visibility", "Attribution by team", "Actionable optimization"],
    flow: [
      [{ label: "AWS" }, { label: "Azure" }, { label: "GCP" }, { label: "SaaS" }],
      { label: "Cost Data" },
      { label: "BigQuery" },
      { label: "FinOps Engine" },
      [{ label: "Trends" }, { label: "Forecast" }, { label: "Optimization" }],
    ],
    scaling: "Daily incremental ingestion per provider rather than full historical reprocessing.",
    security: "Read-only, scoped billing access — no write permissions ever needed for cost data.",
    observability: "Budget alerts wired the same way as production incident alerts, not a separate afterthought.",
    cost: "The platform's own footprint has to stay a rounding error next to the savings it surfaces.",
    tradeoffs: "Real-time cost data is expensive to build — daily granularity is usually the right trade for the value.",
  },
  {
    id: "highly-available-app",
    label: "Highly Available Application",
    requirements: ["Defined RTO/RPO", "No single point of failure", "Predictable failover"],
    flow: [
      { label: "Users" },
      { label: "DNS / CDN" },
      { label: "WAF / LB" },
      [{ label: "Kubernetes A" }, { label: "Kubernetes B" }],
      { label: "Application Layer" },
      [{ label: "Database" }, { label: "Cache" }, { label: "Queue" }],
      { label: "Observability" },
    ],
    scaling: "Active-active across two availability zones, with load balancing that fails over without manual steps.",
    security: "Every layer least-privileged independently so a single compromised component doesn't cascade.",
    observability: "Synthetic checks continuously validating the failover path itself, not just steady-state health.",
    cost: "Redundancy is deliberately sized against a stated RTO/RPO, not applied uniformly everywhere.",
    tradeoffs: "Multi-AZ (or multi-region) resilience is bought with real duplicated infrastructure cost.",
  },
];
