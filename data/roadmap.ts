export interface RoadmapStage {
  label: string;
  status: "current" | "upcoming" | "target";
}

// Direction of growth, not a claim of completed expertise — see SkillLevel in data/skills.ts.
export const roadmapStages: RoadmapStage[] = [
  { label: "DEVOPS ENGINEERING", status: "current" },
  { label: "ADVANCED KUBERNETES", status: "upcoming" },
  { label: "CLOUD ARCHITECTURE", status: "upcoming" },
  { label: "DEVSECOPS", status: "upcoming" },
  { label: "SYSTEM DESIGN", status: "upcoming" },
  { label: "PLATFORM ENGINEERING", status: "upcoming" },
  { label: "SENIOR DEVOPS / PLATFORM ENGINEER", status: "target" },
];
