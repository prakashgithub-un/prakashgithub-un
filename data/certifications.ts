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
    credentialUrl: "https://www.credly.com/badges/cb27634e-f722-4b10-a749-f0e22f36c28f/linked_in_profile",
  },
  {
    id: "opus-technical-specialist",
    name: "Opus Technical Specialist",
    issuer: "Opus",
    category: "Technical Specialization",
    year: "",
    credentialId: "",
    credentialUrl: "https://academy.opus.com/certificate/technical?name=Prakash%20M",
  },
];
