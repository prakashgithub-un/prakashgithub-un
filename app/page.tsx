import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { Certifications } from "@/components/Certifications";
import { SkillMatrix } from "@/components/SkillMatrix";
import { KubernetesLab } from "@/components/KubernetesLab";
import { InfrastructureAsCode } from "@/components/InfrastructureAsCode";
import { CICD } from "@/components/CICD";
import { Security } from "@/components/Security";
import { CloudArchitecture } from "@/components/CloudArchitecture";
import { SystemDesignLab } from "@/components/SystemDesignLab";
import { AutomationLab } from "@/components/AutomationLab";
import { PlatformEngineering } from "@/components/PlatformEngineering";
import { Observability } from "@/components/Observability";
import { FinOps } from "@/components/FinOps";
import { HybridApiGateway } from "@/components/HybridApiGateway";
import { Projects } from "@/components/Projects";
import { Metrics } from "@/components/Metrics";
import { Roadmap } from "@/components/Roadmap";
import { Posts } from "@/components/Posts";
import { GithubActivity } from "@/components/GithubActivity";
import { CurrentlyDeveloping } from "@/components/CurrentlyDeveloping";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Certifications />
        <SkillMatrix />
        <KubernetesLab />
        <InfrastructureAsCode />
        <CICD />
        <Security />
        <CloudArchitecture />
        <SystemDesignLab />
        <AutomationLab />
        <PlatformEngineering />
        <Observability />
        <FinOps />
        <HybridApiGateway />
        <Projects />
        <Metrics />
        <Roadmap />
        <Posts />
        <GithubActivity />
        <CurrentlyDeveloping />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
