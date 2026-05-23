import { GrainOverlay } from "@/components/org/GrainOverlay";
import { BatSwarm } from "@/components/org/BatSwarm";
import { IntroSection } from "@/components/org/IntroSection";
import { OrgReveal } from "@/components/org/OrgReveal";
import { ServicesSection } from "@/components/org/ServicesSection";
import { EntitiesSection } from "@/components/org/EntitiesSection";
import { ArchivesSection } from "@/components/org/ArchivesSection";
import { ContactSection } from "@/components/org/ContactSection";
import { OrgArchitecture } from "@/components/org/OrgArchitecture";
import { OrgOutro } from "@/components/org/OrgOutro";

export default function Home() {
  return (
    <main
      style={{
        background: "#050505",
        minHeight: "100vh",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      <GrainOverlay />
      <BatSwarm />

      <IntroSection />
      <OrgReveal />
      <ServicesSection />
      <EntitiesSection />
      <ArchivesSection />
      <ContactSection />
      <OrgArchitecture />
      <OrgOutro />
    </main>
  );
}
