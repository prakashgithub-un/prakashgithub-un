// Leave year/credentialId/credentialUrl empty until you have the real values —
// nothing here is invented.
export interface Certification {
  id: string;
  name: string;
  issuer: string;
  category: string;
  year: string;
  credentialId: string;
  credentialUrl: string;
}

export const certifications: Certification[] = [
  {
    id: "aws-saa",
    name: "AWS Certified Solutions Architect – Associate",
    issuer: "Amazon Web Services",
    category: "Cloud Architecture",
    year: "",
    credentialId: "",
    credentialUrl: "",
  },
  {
    id: "opus-technical-specialist",
    name: "Opus Technical Specialist",
    issuer: "Opus",
    category: "Technical Specialization",
    year: "",
    credentialId: "",
    credentialUrl: "",
  },
];
