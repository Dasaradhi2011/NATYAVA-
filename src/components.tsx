import React from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { colors, radius, shadow } from "./theme";

type ButtonProps = {
  label: string;
  onPress?: () => void;
  variant?: "primary" | "glass" | "quiet";
  style?: ViewStyle;
};

export function Screen({ children, scroll = true }: { children: React.ReactNode; scroll?: boolean }) {
  const content = (
    <LinearGradient colors={["#101024", colors.black]} style={styles.screen}>
      <View style={styles.glowOne} />
      <View style={styles.glowTwo} />
      {children}
    </LinearGradient>
  );

  if (!scroll) return content;
  return (
    <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      {content}
    </ScrollView>
  );
}

export function Header({
  title,
  subtitle,
  right,
  onBack
}: {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  onBack?: () => void;
}) {
  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        {onBack ? (
          <Pressable style={styles.backButton} onPress={onBack}>
            <Text style={styles.backText}>Back</Text>
          </Pressable>
        ) : (
          <View style={styles.avatar} />
        )}
        <View>
          {subtitle ? <Text style={styles.small}>{subtitle}</Text> : null}
          <Text style={styles.headerTitle}>{title}</Text>
        </View>
      </View>
      {right ?? <Text style={styles.notification}>Notify</Text>}
    </View>
  );
}

export function GlassCard({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  return (
    <BlurView intensity={22} tint="dark" style={[styles.card, style]}>
      {children}
    </BlurView>
  );
}

export function PrimaryButton({ label, onPress, variant = "primary", style }: ButtonProps) {
  if (variant === "primary") {
    return (
      <Pressable onPress={onPress} style={({ pressed }) => [styles.buttonPress, pressed && styles.pressed, style]}>
        <LinearGradient colors={[colors.cyan, colors.blue, colors.purple]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.primaryButton}>
          <Text style={styles.primaryText}>{label}</Text>
        </LinearGradient>
      </Pressable>
    );
  }

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.secondaryButton, variant === "quiet" && styles.quietButton, pressed && styles.pressed, style]}>
      <Text style={styles.secondaryText}>{label}</Text>
    </Pressable>
  );
}

export function SearchBox({ placeholder = "Search any song..." }: { placeholder?: string }) {
  return (
    <View style={styles.searchBox}>
      <Text style={styles.searchIcon}>Search</Text>
      <TextInput placeholder={placeholder} placeholderTextColor={colors.muted} style={styles.searchInput} />
      <Text style={styles.voice}>Voice</Text>
    </View>
  );
}

export function Chip({ label, active = false, large = false }: { label: string; active?: boolean; large?: boolean }) {
  return (
    <View style={[styles.chip, active && styles.chipActive, large && styles.chipLarge]}>
      <Text style={[styles.chipText, active && styles.chipTextActive]}>{label}</Text>
    </View>
  );
}

export function SectionTitle({ title }: { title: string }) {
  return <Text style={styles.sectionTitle}>{title}</Text>;
}

export function LessonCard({
  title,
  meta,
  progress,
  onPress
}: {
  title: string;
  meta: string;
  progress?: number;
  onPress?: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.lessonCard, pressed && styles.pressed]}>
      <LinearGradient colors={["rgba(255,79,216,0.55)", "rgba(24,140,255,0.42)"]} style={styles.thumbnail}>
        <Dancer small />
      </LinearGradient>
      <Text style={styles.lessonTitle}>{title}</Text>
      <Text style={styles.lessonMeta}>{meta}</Text>
      {typeof progress === "number" ? <ProgressBar value={progress} /> : null}
    </Pressable>
  );
}

export function Dancer({ small = false }: { small?: boolean }) {
  return (
    <View style={[styles.dancer, small && styles.dancerSmall]}>
      <View style={styles.head} />
      <View style={styles.body} />
      <View style={[styles.limb, styles.armLeft]} />
      <View style={[styles.limb, styles.armRight]} />
      <View style={[styles.limb, styles.legLeft]} />
      <View style={[styles.limb, styles.legRight]} />
    </View>
  );
}

export function ProgressBar({ value }: { value: number }) {
  return (
    <View style={styles.progressOuter}>
      <LinearGradient colors={[colors.purple, colors.cyan]} style={[styles.progressInner, { width: `${Math.max(0, Math.min(100, value))}%` }]} />
    </View>
  );
}

export function Metric({ label, value }: { label: string; value: number }) {
  return (
    <View style={styles.metric}>
      <Text style={styles.metricLabel}>{label}</Text>
      <ProgressBar value={value} />
      <Text style={styles.metricValue}>{value}%</Text>
    </View>
  );
}

export function SkeletonOverlay() {
  return (
    <View style={styles.skeleton}>
      {[styles.dotHead, styles.dotLeftArm, styles.dotRightArm, styles.dotLeftHand, styles.dotRightHand, styles.dotLeftFoot, styles.dotRightFoot].map((dotStyle, index) => (
        <View key={index} style={[styles.skeletonDot, dotStyle]} />
      ))}
    </View>
  );
}

export function EmptyCamera({ feedback = "Raise left arm higher" }: { feedback?: string }) {
  return (
    <GlassCard style={styles.camera}>
      <SkeletonOverlay />
      <View style={styles.feedbackBox}>
        <Text style={styles.feedbackText}>{feedback}</Text>
      </View>
    </GlassCard>
  );
}

export function HorizontalRail({ children }: { children: React.ReactNode }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.rail}>
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: colors.black },
  scrollContent: { minHeight: "100%" },
  screen: { minHeight: 812, padding: 20, paddingTop: 58, overflow: "hidden" },
  glowOne: { position: "absolute", width: 210, height: 210, borderRadius: 105, backgroundColor: "rgba(91,34,255,0.28)", top: -50, left: -70 },
  glowTwo: { position: "absolute", width: 180, height: 180, borderRadius: 90, backgroundColor: "rgba(25,246,255,0.16)", top: 22, right: -54 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 18 },
  headerLeft: { flexDirection: "row", alignItems: "center", gap: 12, flex: 1 },
  avatar: { width: 42, height: 42, borderRadius: 21, backgroundColor: colors.cyan, borderWidth: 2, borderColor: "rgba(255,255,255,0.28)" },
  backButton: { minHeight: 36, paddingHorizontal: 12, borderRadius: radius.sm, borderWidth: 1, borderColor: colors.line, justifyContent: "center" },
  backText: { color: colors.text, fontWeight: "800", fontSize: 12 },
  small: { color: colors.muted, fontSize: 12, fontWeight: "700" },
  headerTitle: { color: colors.text, fontSize: 22, fontWeight: "900" },
  notification: { color: colors.cyan, fontWeight: "900", fontSize: 12 },
  card: { borderRadius: radius.md, borderWidth: 1, borderColor: colors.line, backgroundColor: colors.panel, overflow: "hidden" },
  buttonPress: { borderRadius: radius.sm },
  primaryButton: { minHeight: 48, borderRadius: radius.sm, alignItems: "center", justifyContent: "center", paddingHorizontal: 18, ...shadow },
  primaryText: { color: colors.text, fontSize: 15, fontWeight: "900" },
  secondaryButton: { minHeight: 46, borderRadius: radius.sm, borderWidth: 1, borderColor: colors.line, alignItems: "center", justifyContent: "center", paddingHorizontal: 16, backgroundColor: "rgba(255,255,255,0.08)" },
  quietButton: { backgroundColor: "transparent" },
  secondaryText: { color: colors.text, fontWeight: "800" },
  pressed: { opacity: 0.72, transform: [{ scale: 0.99 }] },
  searchBox: { height: 50, borderRadius: radius.sm, borderWidth: 1, borderColor: colors.line, backgroundColor: "rgba(255,255,255,0.08)", flexDirection: "row", alignItems: "center", gap: 8, paddingHorizontal: 12, marginBottom: 18 },
  searchIcon: { color: colors.cyan, fontSize: 12, fontWeight: "900" },
  searchInput: { color: colors.text, flex: 1, fontSize: 15, fontWeight: "700" },
  voice: { color: colors.muted, fontSize: 12, fontWeight: "800" },
  chip: { minHeight: 34, borderRadius: 17, borderWidth: 1, borderColor: "rgba(25,246,255,0.28)", paddingHorizontal: 12, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(255,255,255,0.07)" },
  chipLarge: { minHeight: 48, borderRadius: radius.sm, paddingHorizontal: 16 },
  chipActive: { backgroundColor: colors.cyan },
  chipText: { color: colors.text, fontSize: 12, fontWeight: "900" },
  chipTextActive: { color: "#041018" },
  sectionTitle: { color: colors.text, fontSize: 15, fontWeight: "900", marginTop: 22, marginBottom: 12, textTransform: "uppercase" },
  lessonCard: { width: 148, minHeight: 188, borderRadius: radius.md, borderWidth: 1, borderColor: colors.line, backgroundColor: "rgba(255,255,255,0.08)", padding: 10, marginRight: 12 },
  thumbnail: { height: 92, borderRadius: radius.sm, alignItems: "center", justifyContent: "center", marginBottom: 10, overflow: "hidden" },
  lessonTitle: { color: colors.text, fontSize: 14, fontWeight: "900" },
  lessonMeta: { color: colors.muted, fontSize: 11, fontWeight: "700", marginTop: 5, marginBottom: 8 },
  dancer: { width: 92, height: 138, alignItems: "center", justifyContent: "center" },
  dancerSmall: { transform: [{ scale: 0.72 }] },
  head: { width: 28, height: 28, borderRadius: 14, backgroundColor: "#f8d8c4", marginBottom: 4 },
  body: { width: 22, height: 58, borderRadius: 12, backgroundColor: colors.cyan },
  limb: { position: "absolute", width: 13, height: 54, borderRadius: 7 },
  armLeft: { backgroundColor: colors.pink, top: 45, left: 16, transform: [{ rotate: "42deg" }] },
  armRight: { backgroundColor: colors.cyan, top: 37, right: 13, transform: [{ rotate: "-48deg" }] },
  legLeft: { backgroundColor: colors.blue, bottom: 0, left: 32, transform: [{ rotate: "15deg" }] },
  legRight: { backgroundColor: colors.pink, bottom: 3, right: 28, transform: [{ rotate: "-20deg" }] },
  progressOuter: { height: 8, borderRadius: 4, backgroundColor: "rgba(255,255,255,0.12)", overflow: "hidden", flex: 1 },
  progressInner: { height: "100%", borderRadius: 4 },
  metric: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 10 },
  metricLabel: { width: 70, color: colors.muted, fontSize: 12, fontWeight: "800" },
  metricValue: { width: 38, color: colors.text, fontSize: 12, fontWeight: "900", textAlign: "right" },
  camera: { height: 380, justifyContent: "center", alignItems: "center", marginBottom: 18, backgroundColor: "rgba(24,140,255,0.12)" },
  skeleton: { width: 130, height: 190 },
  skeletonDot: { position: "absolute", width: 12, height: 12, borderRadius: 6, backgroundColor: colors.green, shadowColor: colors.green, shadowOpacity: 1, shadowRadius: 10 },
  dotHead: { left: 58, top: 0 },
  dotLeftArm: { left: 30, top: 54 },
  dotRightArm: { right: 30, top: 54 },
  dotLeftHand: { left: 12, top: 112 },
  dotRightHand: { right: 12, top: 112 },
  dotLeftFoot: { left: 42, bottom: 0 },
  dotRightFoot: { right: 42, bottom: 0 },
  feedbackBox: { position: "absolute", left: 18, right: 18, bottom: 18, minHeight: 44, borderRadius: radius.sm, backgroundColor: "rgba(5,5,13,0.7)", alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: colors.line },
  feedbackText: { color: colors.cyan, fontWeight: "900" },
  rail: { paddingRight: 18 }
});
