"use client";
import TutorialHeader from "@/components/TutorialHeader";
import TutorialProgress from "@/components/TutorialProgress";
import TutorialContent from "@/components/TutorialContent";
import TutorialFooter from "@/components/TutorialFooter";
import useTutorial from "@/hooks/useTutorial";
import "./Tutor.css";
export default function Page() {
  const tutorial = useTutorial();
  return <main className={`container ${tutorial.state.effect}`} id="tutorialContainer">
    <TutorialHeader />
    <TutorialProgress tutorial={tutorial} />
    <TutorialContent tutorial={tutorial} />
    <TutorialFooter />
  </main>;
}
