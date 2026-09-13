import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Experience } from "@/components/Experience";
import { TechStack } from "@/components/TechStack";
import { Capabilities } from "@/components/Capabilities";
import { Projects } from "@/components/Projects";
import { InfrastructurePlayground } from "@/components/InfrastructurePlayground";
import { Metrics } from "@/components/Metrics";
import { GithubActivity } from "@/components/GithubActivity";
import { Architecture } from "@/components/Architecture";
import { Education } from "@/components/Education";
import { CurrentlyExploring } from "@/components/CurrentlyExploring";
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
        <TechStack />
        <Capabilities />
        <Projects />
        <InfrastructurePlayground />
        <Metrics />
        <GithubActivity />
        <Architecture />
        <Education />
        <CurrentlyExploring />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
