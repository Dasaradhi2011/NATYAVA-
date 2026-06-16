export type Lesson = {
  id: string;
  title: string;
  category: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  popularity: string;
  progress?: number;
};

export const categories = [
  "Hip Hop",
  "Telugu",
  "Bollywood",
  "Classical",
  "K-pop",
  "Contemporary",
  "Folk"
];

export const lessons: Lesson[] = [
  { id: "telugu-01", title: "Telugu Celebration", category: "Telugu", difficulty: "Beginner", duration: "8 min", popularity: "4.9", progress: 65 },
  { id: "bolly-01", title: "Bollywood Groove", category: "Bollywood", difficulty: "Beginner", duration: "12 min", popularity: "4.8" },
  { id: "kpop-01", title: "K-pop Fire Combo", category: "K-pop", difficulty: "Intermediate", duration: "15 min", popularity: "4.7" },
  { id: "hiphop-01", title: "Hip Hop Footwork", category: "Hip Hop", difficulty: "Intermediate", duration: "10 min", popularity: "4.6" },
  { id: "classic-01", title: "Classical Hands", category: "Classical", difficulty: "Advanced", duration: "18 min", popularity: "4.9" }
];

export const badges = [
  "First Dance",
  "7 Day Streak",
  "30 Day Streak",
  "Dance Master",
  "Rhythm Expert"
];

export const practiceFeedback = [
  "Raise left arm higher",
  "Move faster",
  "Keep posture straight",
  "Footwork: left foot higher"
];
