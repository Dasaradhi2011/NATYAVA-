import React, { useMemo, useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import {
  Chip,
  Dancer,
  EmptyCamera,
  GlassCard,
  Header,
  HorizontalRail,
  LessonCard,
  Metric,
  PrimaryButton,
  ProgressBar,
  Screen,
  SearchBox,
  SectionTitle
} from "./src/components";
import { badges, categories, lessons, practiceFeedback } from "./src/data";
import { colors, radius, shadow } from "./src/theme";
import { ScreenName } from "./src/types";

const tabs: { label: string; screen: ScreenName }[] = [
  { label: "Home", screen: "Home" },
  { label: "Learn", screen: "Search" },
  { label: "Practice", screen: "Practice" },
  { label: "Social", screen: "Community" },
  { label: "Profile", screen: "Profile" }
];

export default function App() {
  const [screen, setScreen] = useState<ScreenName>("Onboarding");
  const [onboardingStep, setOnboardingStep] = useState(0);

  const nav = useMemo(
    () => ({
      go: setScreen,
      back: () => setScreen("Home"),
      nextOnboarding: () => {
        if (onboardingStep < onboarding.length - 1) setOnboardingStep(onboardingStep + 1);
        else setScreen("Login");
      }
    }),
    [onboardingStep]
  );

  return (
    <SafeAreaView style={styles.app}>
      <StatusBar style="light" />
      <View style={styles.content}>
        {screen === "Onboarding" && <Onboarding index={onboardingStep} onNext={nav.nextOnboarding} />}
        {screen === "Login" && <AuthScreen go={nav.go} />}
        {screen === "Home" && <HomeScreen go={nav.go} />}
        {screen === "Search" && <SearchScreen go={nav.go} />}
        {screen === "Lesson" && <LessonScreen go={nav.go} />}
        {screen === "Coach" && <CoachScreen go={nav.go} />}
        {screen === "AR" && <ARScreen go={nav.go} />}
        {screen === "Practice" && <PracticeScreen go={nav.go} />}
        {screen === "Community" && <CommunityScreen go={nav.go} />}
        {screen === "Achievements" && <AchievementsScreen go={nav.go} />}
        {screen === "Avatar" && <AvatarScreen go={nav.go} />}
        {screen === "Kids" && <KidsScreen go={nav.go} />}
        {screen === "Profile" && <ProfileScreen go={nav.go} />}
        {screen === "Settings" && <SettingsScreen go={nav.go} />}
        {screen === "Admin" && <AdminScreen go={nav.go} />}
      </View>
      {screen !== "Onboarding" && screen !== "Login" ? <BottomNav current={screen} go={setScreen} /> : null}
    </SafeAreaView>
  );
}

const onboarding = [
  ["Learn Dance Like Never Before", "AI-powered dance learning using interactive 3D instructors."],
  ["Practice With AI Feedback", "Get posture correction and movement analysis."],
  ["Bring Dance Into Your Room", "Learn through augmented reality."],
  ["Track Your Growth", "Earn badges and level up."],
  ["Start Natyava", "Learn Any Dance. Anytime. Anywhere."]
];

function Onboarding({ index, onNext }: { index: number; onNext: () => void }) {
  const [title, copy] = onboarding[index];
  return (
    <Screen scroll={false}>
      <View style={styles.centerHero}>
        <GlassCard style={styles.onboardingStage}>
          <Dancer />
        </GlassCard>
        <Text style={styles.bigTitle}>{title}</Text>
        <Text style={styles.copy}>{copy}</Text>
        <View style={styles.dots}>
          {onboarding.map((_, dot) => <View key={dot} style={[styles.dot, dot === index && styles.dotActive]} />)}
        </View>
        <PrimaryButton label={index === onboarding.length - 1 ? "Get Started" : "Continue"} onPress={onNext} style={styles.fullWidth} />
      </View>
    </Screen>
  );
}

function AuthScreen({ go }: { go: (screen: ScreenName) => void }) {
  return (
    <Screen>
      <Text style={styles.brand}>Natyava</Text>
      <Text style={styles.bigTitle}>Welcome back</Text>
      <Text style={styles.copy}>Sign in with email, phone OTP, Google, Apple, or Face ID.</Text>
      <View style={styles.form}>
        <GlassCard style={styles.input}><Text style={styles.placeholder}>Email address</Text></GlassCard>
        <GlassCard style={styles.input}><Text style={styles.placeholder}>Password</Text></GlassCard>
        <PrimaryButton label="Login" onPress={() => go("Home")} />
        <PrimaryButton label="Create Account" variant="glass" onPress={() => go("Home")} />
        <PrimaryButton label="Continue with Google" variant="glass" onPress={() => go("Home")} />
        <PrimaryButton label="Continue with Apple" variant="glass" onPress={() => go("Home")} />
        <PrimaryButton label="Phone OTP Login" variant="glass" onPress={() => go("Home")} />
        <PrimaryButton label="Use Face ID" variant="quiet" onPress={() => go("Home")} />
      </View>
    </Screen>
  );
}

function HomeScreen({ go }: { go: (screen: ScreenName) => void }) {
  return (
    <Screen>
      <Header title="Good evening, Priya!" subtitle="Dance streak: 5 days" />
      <SearchBox />
      <Pressable onPress={() => go("Lesson")}>
        <LinearGradient colors={[colors.purple, colors.blue]} style={styles.heroBanner}>
          <View>
            <Text style={styles.heroTitle}>Learn Telugu Dance Now</Text>
            <Text style={styles.heroCopy}>Animated 3D instructor ready.</Text>
            <View style={styles.heroButton}><Text style={styles.heroButtonText}>Start Practice</Text></View>
          </View>
          <Dancer />
        </LinearGradient>
      </Pressable>

      <SectionTitle title="Trending Dances" />
      <HorizontalRail>
        {lessons.slice(0, 4).map((lesson) => (
          <LessonCard key={lesson.id} title={lesson.title} meta={`${lesson.difficulty} - ${lesson.duration}`} onPress={() => go("Lesson")} />
        ))}
      </HorizontalRail>

      <SectionTitle title="Categories" />
      <View style={styles.wrap}>{categories.map((item, index) => <Chip key={item} label={item} active={index === 1} large />)}</View>

      <SectionTitle title="Continue Learning" />
      <GlassCard style={styles.continueCard}>
        <Text style={styles.cardTitle}>Telugu Celebration</Text>
        <Text style={styles.copySmall}>Step 3 of 8</Text>
        <ProgressBar value={65} />
      </GlassCard>

      <Pressable onPress={() => go("Coach")} style={styles.floatingCoach}>
        <Text style={styles.floatingText}>AI Coach</Text>
      </Pressable>
    </Screen>
  );
}

function SearchScreen({ go }: { go: (screen: ScreenName) => void }) {
  return (
    <Screen>
      <Header title="Song Search" subtitle="Smart discovery" onBack={() => go("Home")} />
      <SearchBox />
      <View style={styles.wrap}>
        {["Language", "Difficulty", "Genre", "Duration", "Voice Search"].map((item, index) => <Chip key={item} label={item} active={index === 1} />)}
      </View>
      <SectionTitle title="Recommended For You" />
      {lessons.map((lesson) => (
        <GlassCard key={lesson.id} style={styles.listCard}>
          <View style={styles.listThumb}><Dancer small /></View>
          <View style={styles.listMain}>
            <Text style={styles.cardTitle}>{lesson.title}</Text>
            <Text style={styles.copySmall}>{lesson.category} - {lesson.difficulty} - {lesson.duration}</Text>
            <Text style={styles.copySmall}>Popularity {lesson.popularity}</Text>
          </View>
          <PrimaryButton label="Open" onPress={() => go("Lesson")} style={styles.smallButton} />
        </GlassCard>
      ))}
    </Screen>
  );
}

function LessonScreen({ go }: { go: (screen: ScreenName) => void }) {
  return (
    <Screen>
      <Header title="Telugu Dance" subtitle="Step 3 of 12" onBack={() => go("Home")} right={<Text style={styles.notification}>Settings</Text>} />
      <GlassCard style={styles.avatarStage}>
        <Dancer />
        <View style={styles.stageControls}><Chip label="Camera Angle" /><Chip label="Zoom" /></View>
      </GlassCard>
      <SectionTitle title="Controls" />
      <View style={styles.controlGrid}>
        {["Prev", "Play", "Pause", "Next", "Repeat", "0.5x Slow", "Mirror", "Angle"].map((item) => (
          <Pressable key={item} style={styles.roundButton}><Text style={styles.roundButtonText}>{item}</Text></Pressable>
        ))}
      </View>
      <SectionTitle title="Learning Mode" />
      <View style={styles.wrap}>{["Beginner", "Intermediate", "Advanced"].map((item, index) => <Chip key={item} label={item} active={index === 0} />)}</View>
      <SectionTitle title="Body Part Focus" />
      <View style={styles.wrap}>{["Arms", "Legs", "Footwork", "Full Body"].map((item, index) => <Chip key={item} label={item} active={index === 2} />)}</View>
      <GlassCard style={styles.continueCard}>
        <Text style={styles.cardTitle}>Progress Timeline</Text>
        <ProgressBar value={25} />
        <Text style={styles.copySmall}>Estimated: 8 min remaining</Text>
      </GlassCard>
      <View style={styles.twoButtons}>
        <PrimaryButton label="AI Coach" onPress={() => go("Coach")} style={styles.flexButton} />
        <PrimaryButton label="AR Mode" variant="glass" onPress={() => go("AR")} style={styles.flexButton} />
      </View>
    </Screen>
  );
}

function CoachScreen({ go }: { go: (screen: ScreenName) => void }) {
  return (
    <Screen>
      <Header title="AI Dance Coach" subtitle="Personal practice intelligence" onBack={() => go("Home")} />
      <GlassCard style={styles.promptCard}><Text style={styles.promptText}>How can I improve footwork?</Text></GlassCard>
      <GlassCard style={styles.answerCard}>
        <Text style={styles.cardTitle}>Coach Plan</Text>
        <Text style={styles.copy}>Practice heel-toe drills for 6 minutes, repeat Step 3 at 0.5x speed, then record a session for timing analysis.</Text>
      </GlassCard>
      <SectionTitle title="AI Provides" />
      <View style={styles.wrap}>{["Video references", "Practice drills", "Corrections", "Daily plans", "Skill assessment"].map((item) => <Chip key={item} label={item} />)}</View>
      <PrimaryButton label="Start Recommended Drill" onPress={() => go("Practice")} style={styles.topGap} />
    </Screen>
  );
}

function ARScreen({ go }: { go: (screen: ScreenName) => void }) {
  return (
    <Screen>
      <Header title="AR Mode" subtitle="Place dancer in your room" onBack={() => go("Lesson")} />
      <GlassCard style={styles.arStage}>
        <Text style={styles.copySmall}>Camera View</Text>
        <Dancer />
        <View style={styles.roomGrid} />
      </GlassCard>
      <View style={styles.controlGrid}>
        {["Place", "Resize", "Rotate", "Walk", "Zoom", "Record", "Screenshot", "Twin"].map((item) => (
          <Pressable key={item} style={styles.roundButton}><Text style={styles.roundButtonText}>{item}</Text></Pressable>
        ))}
      </View>
      <PrimaryButton label="Start Practice" onPress={() => go("Practice")} style={styles.topGap} />
    </Screen>
  );
}

function PracticeScreen({ go }: { go: (screen: ScreenName) => void }) {
  return (
    <Screen>
      <Header title="Practice Mode" subtitle="Camera-based analysis" onBack={() => go("Home")} />
      <EmptyCamera feedback={practiceFeedback[0]} />
      <Text style={styles.score}>Your Score: 78/100</Text>
      <Metric label="Accuracy" value={82} />
      <Metric label="Timing" value={68} />
      <Metric label="Rhythm" value={79} />
      <Metric label="Balance" value={73} />
      <SectionTitle title="Real-time Feedback" />
      {practiceFeedback.slice(1).map((item) => <GlassCard key={item} style={styles.feedbackRow}><Text style={styles.copySmall}>{item}</Text></GlassCard>)}
      <View style={styles.twoButtons}>
        <PrimaryButton label="Start" style={styles.flexButton} />
        <PrimaryButton label="Record" variant="glass" style={styles.flexButton} />
      </View>
    </Screen>
  );
}

function CommunityScreen({ go }: { go: (screen: ScreenName) => void }) {
  return (
    <Screen>
      <Header title="Community" subtitle="Creator dance feed" right={<Text style={styles.notification}>Upload</Text>} />
      <GlassCard style={styles.feedCard}>
        <Dancer />
        <View style={styles.feedCaption}>
          <Text style={styles.cardTitle}>@priya_dances</Text>
          <Text style={styles.copySmall}>#TeluguChallenge #Natyava</Text>
        </View>
        <View style={styles.feedActions}>
          {["Like", "Comment", "Share", "Follow"].map((item) => <Chip key={item} label={item} />)}
        </View>
      </GlassCard>
      <SectionTitle title="Trending Hashtags" />
      <View style={styles.wrap}>{["#Footwork", "#Kpop", "#Natyava30", "#Folk", "#Bollywood"].map((item) => <Chip key={item} label={item} />)}</View>
      <PrimaryButton label="Join Weekly Challenge" onPress={() => go("Practice")} style={styles.topGap} />
    </Screen>
  );
}

function AchievementsScreen({ go }: { go: (screen: ScreenName) => void }) {
  return (
    <Screen>
      <Header title="Achievements" subtitle="Level 18 dancer" onBack={() => go("Profile")} />
      <GlassCard style={styles.continueCard}>
        <Text style={styles.cardTitle}>XP Progress</Text>
        <ProgressBar value={72} />
        <Text style={styles.copySmall}>2,840 XP to Level 19</Text>
      </GlassCard>
      <View style={styles.badgeGrid}>{badges.map((badge) => <GlassCard key={badge} style={styles.badge}><Text style={styles.badgeText}>{badge}</Text></GlassCard>)}</View>
    </Screen>
  );
}

function AvatarScreen({ go }: { go: (screen: ScreenName) => void }) {
  return (
    <Screen>
      <Header title="Create Your Avatar" subtitle="AI avatar studio" onBack={() => go("Profile")} />
      <View style={styles.wrap}>{["Take Selfie", "Upload Photo", "Manual Create"].map((item, index) => <Chip key={item} label={item} active={index === 0} large />)}</View>
      <EmptyCamera feedback="Face front, good lighting" />
      <GlassCard style={styles.answerCard}>
        <Text style={styles.cardTitle}>Creating Your Digital Dance Twin...</Text>
        <ProgressBar value={58} />
      </GlassCard>
      <SectionTitle title="Before -> After" />
      <View style={styles.twoButtons}>
        <GlassCard style={styles.compareBox}><Text style={styles.cardTitle}>Photo</Text></GlassCard>
        <GlassCard style={styles.compareBox}><Dancer small /><Text style={styles.cardTitle}>3D Avatar</Text></GlassCard>
      </View>
      <View style={styles.wrap}>{["Regenerate", "Edit Avatar", "Save Avatar", "Use as My Dance Instructor"].map((item, index) => <Chip key={item} label={item} active={index === 3} />)}</View>
    </Screen>
  );
}

function KidsScreen({ go }: { go: (screen: ScreenName) => void }) {
  return (
    <Screen>
      <Header title="Kids Mode" subtitle="Coming soon" onBack={() => go("Home")} />
      <LinearGradient colors={["rgba(255,209,102,0.34)", "rgba(25,246,255,0.18)"]} style={styles.kidsHero}>
        <Dancer />
        <Text style={styles.heroTitle}>Kids Learning Adventures</Text>
      </LinearGradient>
      <SectionTitle title="Avatar Selection" />
      <View style={styles.wrap}>{["Cartoon Boy", "Cartoon Girl", "Friendly Robot", "Ninja Hero", "Space Explorer", "Fantasy Warrior", "Animal Mascot"].map((item) => <Chip key={item} label={item} large />)}</View>
      <GlassCard style={styles.popup}>
        <Text style={styles.countdown}>09:18</Text>
        <Text style={styles.cardTitle}>Special Character Avatars</Text>
        <Text style={styles.copySmall}>Coming Soon. Future Character Partnerships. More Fun Dance Instructors Are On The Way.</Text>
      </GlassCard>
    </Screen>
  );
}

function ProfileScreen({ go }: { go: (screen: ScreenName) => void }) {
  return (
    <Screen>
      <Header title="Priya" subtitle="Natyava Champion" />
      <GlassCard style={styles.profileCard}>
        <View style={styles.largeAvatar} />
        <View style={styles.profileStats}>
          <Text style={styles.cardTitle}>Level 18</Text>
          <Text style={styles.copySmall}>42 completed lessons</Text>
          <ProgressBar value={72} />
        </View>
      </GlassCard>
      {[
        ["Achievements", "Achievements"],
        ["Create AI Avatar", "Avatar"],
        ["Kids Mode", "Kids"],
        ["Settings", "Settings"],
        ["Admin Dashboard", "Admin"]
      ].map(([label, target]) => (
        <Pressable key={label} onPress={() => go(target as ScreenName)}>
          <GlassCard style={styles.menuRow}><Text style={styles.cardTitle}>{label}</Text><Text style={styles.copySmall}>Open</Text></GlassCard>
        </Pressable>
      ))}
    </Screen>
  );
}

function SettingsScreen({ go }: { go: (screen: ScreenName) => void }) {
  return (
    <Screen>
      <Header title="Settings" subtitle="Account preferences" onBack={() => go("Profile")} />
      {["Dark Mode", "Language Selection", "Notification Preferences", "Privacy Settings", "Connected Devices", "Account Management", "Subscription Status"].map((item) => (
        <GlassCard key={item} style={styles.menuRow}><Text style={styles.cardTitle}>{item}</Text><Text style={styles.copySmall}>Edit</Text></GlassCard>
      ))}
    </Screen>
  );
}

function AdminScreen({ go }: { go: (screen: ScreenName) => void }) {
  return (
    <Screen>
      <Header title="Admin Dashboard" subtitle="Product operations" onBack={() => go("Profile")} />
      <View style={styles.adminGrid}>
        {["Active Users 248K", "Daily Engagement 62%", "Top Songs 1.8M", "Revenue $1.2M"].map((item) => (
          <GlassCard key={item} style={styles.adminStat}><Text style={styles.cardTitle}>{item}</Text></GlassCard>
        ))}
      </View>
      {["Songs", "Users", "Challenges", "Reports", "Analytics"].map((item) => (
        <GlassCard key={item} style={styles.menuRow}><Text style={styles.cardTitle}>Manage {item}</Text><Text style={styles.copySmall}>Open</Text></GlassCard>
      ))}
    </Screen>
  );
}

function BottomNav({ current, go }: { current: ScreenName; go: (screen: ScreenName) => void }) {
  return (
    <View style={styles.bottomNav}>
      {tabs.map((tab) => {
        const active = current === tab.screen;
        return (
          <Pressable key={tab.label} onPress={() => go(tab.screen)} style={[styles.navItem, active && styles.navItemActive]}>
            <Text style={[styles.navText, active && styles.navTextActive]}>{tab.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  app: { flex: 1, backgroundColor: colors.black },
  content: { flex: 1 },
  centerHero: { flex: 1, alignItems: "center", justifyContent: "center", gap: 22 },
  onboardingStage: { width: "100%", height: 340, alignItems: "center", justifyContent: "center" },
  bigTitle: { color: colors.text, fontSize: 34, lineHeight: 38, fontWeight: "900", textAlign: "center" },
  copy: { color: colors.muted, fontSize: 16, lineHeight: 24 },
  copySmall: { color: colors.muted, fontSize: 12, lineHeight: 18, fontWeight: "700" },
  brand: { color: colors.cyan, fontSize: 42, fontWeight: "900", marginTop: 40, marginBottom: 18 },
  dots: { flexDirection: "row", gap: 8 },
  dot: { width: 9, height: 9, borderRadius: 5, backgroundColor: "rgba(255,255,255,0.2)" },
  dotActive: { width: 26, backgroundColor: colors.cyan },
  fullWidth: { width: "100%" },
  form: { gap: 12, marginTop: 30 },
  input: { minHeight: 52, justifyContent: "center", paddingHorizontal: 14 },
  placeholder: { color: colors.muted, fontWeight: "800" },
  heroBanner: { minHeight: 210, borderRadius: radius.lg, padding: 18, flexDirection: "row", alignItems: "center", justifyContent: "space-between", overflow: "hidden", ...shadow },
  heroTitle: { color: colors.text, fontSize: 26, lineHeight: 30, fontWeight: "900", maxWidth: 190 },
  heroCopy: { color: "rgba(255,255,255,0.76)", fontSize: 13, fontWeight: "700", marginTop: 8, marginBottom: 16 },
  heroButton: { alignSelf: "flex-start", minHeight: 36, borderRadius: radius.sm, backgroundColor: colors.cyan, justifyContent: "center", paddingHorizontal: 14 },
  heroButtonText: { color: "#061018", fontWeight: "900" },
  wrap: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  continueCard: { padding: 16, gap: 10, marginBottom: 14 },
  cardTitle: { color: colors.text, fontSize: 15, fontWeight: "900" },
  floatingCoach: { position: "absolute", right: 20, bottom: 26, minHeight: 48, borderRadius: 24, backgroundColor: colors.cyan, justifyContent: "center", paddingHorizontal: 16, ...shadow },
  floatingText: { color: "#061018", fontWeight: "900" },
  listCard: { minHeight: 98, padding: 12, marginBottom: 12, flexDirection: "row", alignItems: "center", gap: 12 },
  listThumb: { width: 70, height: 70, borderRadius: radius.sm, backgroundColor: "rgba(24,140,255,0.24)", alignItems: "center", justifyContent: "center", overflow: "hidden" },
  listMain: { flex: 1 },
  smallButton: { width: 74 },
  avatarStage: { height: 360, alignItems: "center", justifyContent: "center" },
  stageControls: { position: "absolute", left: 14, right: 14, bottom: 14, flexDirection: "row", justifyContent: "space-between" },
  controlGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  roundButton: { width: 76, height: 76, borderRadius: 38, borderWidth: 1, borderColor: "rgba(25,246,255,0.3)", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(255,255,255,0.08)" },
  roundButtonText: { color: colors.cyan, fontSize: 11, fontWeight: "900", textAlign: "center" },
  twoButtons: { flexDirection: "row", gap: 12, marginTop: 14 },
  flexButton: { flex: 1 },
  promptCard: { minHeight: 68, justifyContent: "center", padding: 16, marginBottom: 14 },
  promptText: { color: colors.text, fontSize: 18, fontWeight: "900" },
  answerCard: { padding: 16, gap: 12, marginBottom: 14 },
  topGap: { marginTop: 18 },
  arStage: { height: 430, alignItems: "center", justifyContent: "center", marginBottom: 18 },
  roomGrid: { position: "absolute", left: 30, right: 30, bottom: 58, height: 1, backgroundColor: "rgba(25,246,255,0.45)" },
  score: { color: colors.text, fontSize: 28, fontWeight: "900", marginBottom: 16 },
  feedbackRow: { padding: 12, marginBottom: 8 },
  feedCard: { height: 510, alignItems: "center", justifyContent: "center", marginBottom: 18 },
  feedCaption: { position: "absolute", left: 16, bottom: 22 },
  feedActions: { position: "absolute", right: 12, bottom: 90, gap: 10 },
  badgeGrid: { flexDirection: "row", flexWrap: "wrap", gap: 12 },
  badge: { width: "47%", minHeight: 104, padding: 14, justifyContent: "center", alignItems: "center" },
  badgeText: { color: colors.gold, textAlign: "center", fontWeight: "900" },
  compareBox: { flex: 1, minHeight: 130, alignItems: "center", justifyContent: "center", padding: 14 },
  kidsHero: { height: 260, borderRadius: radius.lg, alignItems: "center", justifyContent: "center", marginBottom: 18 },
  popup: { padding: 18, gap: 8, marginTop: 18, alignItems: "center" },
  countdown: { color: colors.gold, fontSize: 36, fontWeight: "900" },
  profileCard: { padding: 16, flexDirection: "row", alignItems: "center", gap: 16, marginBottom: 16 },
  largeAvatar: { width: 82, height: 82, borderRadius: 41, backgroundColor: colors.cyan },
  profileStats: { flex: 1, gap: 8 },
  menuRow: { minHeight: 64, padding: 14, marginBottom: 10, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  adminGrid: { flexDirection: "row", flexWrap: "wrap", gap: 12, marginBottom: 16 },
  adminStat: { width: "47%", minHeight: 96, padding: 14, justifyContent: "center" },
  bottomNav: { minHeight: 74, borderTopWidth: 1, borderTopColor: colors.line, backgroundColor: "rgba(5,5,13,0.94)", flexDirection: "row", alignItems: "center", justifyContent: "space-around", paddingHorizontal: 10 },
  navItem: { flex: 1, minHeight: 46, borderRadius: radius.sm, alignItems: "center", justifyContent: "center" },
  navItemActive: { backgroundColor: "rgba(25,246,255,0.14)" },
  navText: { color: colors.muted, fontSize: 11, fontWeight: "900" },
  navTextActive: { color: colors.cyan }
});
