// Leave `date` empty until known — nothing here is invented.
export interface Post {
  id: string;
  title: string;
  platform: "LinkedIn";
  date: string;
  topics: string[];
  excerpt: string;
  url: string;
  visual: "ai-infrastructure" | "observability";
}

export const posts: Post[] = [
  {
    id: "lenovo-ai-infrastructure",
    title: "Lenovo × AI Infrastructure",
    platform: "LinkedIn",
    date: "",
    topics: ["AI", "Technology", "Innovation", "AI Infrastructure"],
    excerpt:
      "A great Friday evening at the Lenovo event — a good mix of technology, AI, and catching up with friends. Interesting to see Lenovo's focus beyond laptops, with servers, AI infrastructure, and practical AI use cases.",
    url: "https://lnkd.in/p/gSUQgRzJ",
    visual: "ai-infrastructure",
  },
  {
    id: "datadog-live-chennai",
    title: "Datadog Live Chennai",
    platform: "LinkedIn",
    date: "",
    topics: ["DevOps", "SRE", "AI", "Agentic AI"],
    excerpt:
      "Attended Datadog Live Chennai and explored how Agentic AI could change the future of DevOps and SRE — including the possibility of AI handling operational work while engineers focus on more innovative problems.",
    url: "https://www.linkedin.com/posts/prakashin_datadoglivechennai-devops-sre-activity-7376674417952788480-qQyu",
    visual: "observability",
  },
];
