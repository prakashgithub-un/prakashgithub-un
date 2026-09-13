// Labels only — adjust these as the actual APIM policy configuration evolves.
// Nothing here should be read as a claim about a specific enabled mechanism
// beyond what's listed.

export const apimCapabilitiesSummary = [
  "Authentication",
  "Authorization",
  "Rate Limiting",
  "Request Validation",
  "Logging",
];

export const apimCapabilitiesFull = [
  "Authentication",
  "Authorization",
  "Rate Limiting",
  "Throttling",
  "Request Validation",
  "Response Transformation",
  "API Policies",
  "Monitoring / Logging",
  "API Governance",
];

export interface BackendSystem {
  id: string;
  system: string;
  hosting: string;
}

export const backendSystems: BackendSystem[] = [
  { id: "azure", system: "Azure", hosting: "Self-Hosted" },
  { id: "onprem", system: "On-Prem", hosting: "Self-Hosted" },
  { id: "aws", system: "AWS", hosting: "Self-Hosted" },
];

export const engineeringEmphasis = [
  "Hybrid architecture",
  "Centralized API management",
  "Security boundary",
  "Legacy application protection",
  "Consistent API policies",
  "Governance",
  "Traffic control",
  "Observability",
  "Backend abstraction",
];

export const gatewayTechnologies = [
  "Azure API Management",
  "Azure",
  "AWS",
  "On-Premises",
  "Self-Hosted Applications",
  "API Security",
  "API Policies",
  "Authentication",
  "Authorization",
  "Rate Limiting",
  "Monitoring",
];
