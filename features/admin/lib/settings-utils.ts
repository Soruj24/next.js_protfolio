import { DEFAULT_SETTINGS } from "@/features/admin/data/settings-defaults";
import type { SettingsState } from "@/features/admin/types/settings";

export function deepMerge<T>(target: T, source: unknown): T {
  const output = { ...target };
  const sourceObj = source as Record<string, unknown>;
  for (const key in sourceObj) {
    if (sourceObj[key] && typeof sourceObj[key] === "object" && !Array.isArray(sourceObj[key])) {
      (output as Record<string, unknown>)[key] = deepMerge(
        (target as Record<string, unknown>)[key] as Record<string, unknown>,
        sourceObj[key] as Record<string, unknown>
      );
    } else if (sourceObj[key] !== undefined) {
      (output as Record<string, unknown>)[key] = sourceObj[key];
    }
  }
  return output;
}

export function serializeSettings(data: Record<string, unknown>): SettingsState {
  const result = { ...DEFAULT_SETTINGS };
  const safe = data || {};
  const profile = (safe.profile || {}) as Record<string, unknown>;
  const personal = (safe.personal_info || {}) as Record<string, unknown>;
  const portfolio = (safe.portfolio || {}) as Record<string, unknown>;
  const seo = (safe.seo || {}) as Record<string, unknown>;
  const social = (safe.social_links || []) as Record<string, unknown>[];
  const theme = (safe.theme || {}) as Record<string, unknown>;
  const security = (safe.security || {}) as Record<string, unknown>;
  const notifications = (safe.notifications || {}) as Record<string, unknown>;
  const language = (safe.language || {}) as Record<string, unknown>;
  const dataSection = (safe.data || {}) as Record<string, unknown>;
  const experiences = (safe.experiences || []) as Record<string, unknown>[];
  const expertise = (safe.expertise || []) as Record<string, unknown>[];
  const standards = (safe.standards || []) as Record<string, unknown>[];
  const testimonials = (safe.testimonials || []) as Record<string, unknown>[];
  const caseStudies = (safe.case_studies || []) as Record<string, unknown>[];
  const responseGuidelines = (safe.response_guidelines || {}) as Record<string, unknown>;
  const innovation = (safe.innovation || []) as Record<string, unknown>[];
  const technicalSkills = (safe.technical_skills || {}) as Record<string, unknown>;
  const experience = (safe.experience || {}) as Record<string, unknown>;
  const education = (safe.education || {}) as Record<string, unknown>;
  const educations = (safe.educations || []) as Record<string, unknown>[];
  const heroTypingRoles = (safe.hero_typing_roles || []) as string[];
  const navItems = (safe.nav_items || []) as Record<string, unknown>[];
  const services = (safe.services || []) as Record<string, unknown>[];
  const faqs = (safe.faqs || []) as Record<string, unknown>[];

  const pickDefined = (obj: Record<string, unknown>) =>
    Object.fromEntries(Object.entries(obj).filter(([_, v]) => v !== undefined && v !== null));

  result.profile = { ...DEFAULT_SETTINGS.profile, ...pickDefined(profile), availability: (profile.availability as SettingsState["profile"]["availability"]) || "available" };
  result.personal_info = { ...DEFAULT_SETTINGS.personal_info, ...pickDefined(personal) };
  result.portfolio = { ...DEFAULT_SETTINGS.portfolio, ...pickDefined(portfolio) };
  result.seo = { ...DEFAULT_SETTINGS.seo, ...pickDefined(seo), twitter_card: (seo.twitter_card as "summary" | "summary_large_image") || "summary_large_image" };
  result.social_links = Array.isArray(social)
    ? social.map((s) => ({ platform: (s.platform as string) || "", url: (s.url as string) || "", username: (s.username as string) || "", visible: s.visible !== false }))
    : [];
  result.theme = { ...DEFAULT_SETTINGS.theme, ...pickDefined(theme), mode: (theme.mode as "dark" | "light" | "system") || "dark" };
  result.security = { ...DEFAULT_SETTINGS.security, ...Object.fromEntries(Object.entries(security).filter(([k, v]) => v !== undefined && v !== null && k !== "api_keys" && k !== "last_password_change")) };
  result.notifications = { ...DEFAULT_SETTINGS.notifications, ...pickDefined(notifications) };
  result.language = { ...DEFAULT_SETTINGS.language, ...pickDefined(language), time_format: (language.time_format as "12h" | "24h") || "12h" };
  result.data = { ...DEFAULT_SETTINGS.data, ...pickDefined(dataSection), backup_frequency: (dataSection.backup_frequency as "daily" | "weekly" | "monthly" | "never") || "weekly" };
  result.experiences = experiences.map((e) => ({
    year: (e.year as string) || "",
    role: (e.role as string) || "",
    company: (e.company as string) || "",
    description: (e.description as string) || "",
    technologies: Array.isArray(e.technologies) ? e.technologies.map((t) => (t as string) || "") : ((e.technologies as string) || "").split(",").map((t) => t.trim()).filter(Boolean),
  }));
  result.expertise = expertise.map((e) => ({
    title: (e.title as string) || "",
    description: (e.description as string) || "",
    icon: (e.icon as string) || "",
    skills: Array.isArray(e.skills) ? e.skills.map((s) => (s as string) || "") : ((e.skills as string) || "").split(",").map((s) => s.trim()).filter(Boolean),
    color: (e.color as string) || "",
  }));
  result.standards = standards.map((s) => ({
    title: (s.title as string) || "",
    description: (s.description as string) || "",
    icon: (s.icon as string) || "",
    metrics: (s.metrics as string) || "",
    features: Array.isArray(s.features) ? s.features.map((f) => (f as string) || "") : ((s.features as string) || "").split(",").map((f) => f.trim()).filter(Boolean),
  }));
  result.testimonials = testimonials.map((t) => ({
    name: (t.name as string) || "",
    role: (t.role as string) || "",
    content: (t.content as string) || "",
    avatar: (t.avatar as string) || "",
    color: (t.color as string) || "",
  }));
  result.case_studies = caseStudies.map((cs) => ({
    title: (cs.title as string) || "",
    description: (cs.description as string) || "",
    challenge: (cs.challenge as string) || "",
    solution: (cs.solution as string) || "",
    impact: (cs.impact as string) || "",
    technologies: Array.isArray(cs.technologies) ? cs.technologies.map((t) => (t as string) || "") : ((cs.technologies as string) || "").split(",").map((t) => t.trim()).filter(Boolean),
    image: (cs.image as string) || "",
  }));
  result.response_guidelines = {
    ...DEFAULT_SETTINGS.response_guidelines,
    ...pickDefined(responseGuidelines),
    redirect_uncertain_queries: (responseGuidelines.redirect_uncertain_queries as string) || DEFAULT_SETTINGS.response_guidelines.redirect_uncertain_queries,
    language: (responseGuidelines.language as string) || DEFAULT_SETTINGS.response_guidelines.language,
  };
  result.innovation = innovation.map((i) => ({
    title: (i.title as string) || "",
    description: (i.description as string) || "",
    icon: (i.icon as string) || "",
    color: (i.color as string) || "",
  }));
  result.technical_skills = {
    specializations: Array.isArray(technicalSkills.specializations) ? technicalSkills.specializations.map((s) => (s as string) || "") : ((technicalSkills.specializations as string) || "").split(",").map((s) => s.trim()).filter(Boolean),
    core_technologies: Array.isArray(technicalSkills.core_technologies) ? technicalSkills.core_technologies.map((t) => (t as string) || "") : ((technicalSkills.core_technologies as string) || "").split(",").map((t) => t.trim()).filter(Boolean),
  };
  result.experience = { ...DEFAULT_SETTINGS.experience, ...pickDefined(experience) };
  result.education = { ...DEFAULT_SETTINGS.education, ...pickDefined(education) };
  result.educations = educations.map((e) => ({
    degree: (e.degree as string) || "",
    institution: (e.institution as string) || "",
    period: (e.period as string) || "",
    description: (e.description as string) || "",
  }));
  result.hero_typing_roles = Array.isArray(heroTypingRoles) ? heroTypingRoles : [];
  result.nav_items = navItems.map((n) => ({
    id: (n.id as string) || "",
    label: (n.label as string) || "",
    icon: (n.icon as string) || "",
    visible: n.visible !== false,
  }));
  result.services = services.map((s) => ({
    id: (s.id as string) || "",
    title: (s.title as string) || "",
    description: (s.description as string) || "",
    features: Array.isArray(s.features) ? s.features.map((f) => (f as string) || "") : [],
    gradient: (s.gradient as string) || "from-cyan-500 to-blue-500",
  }));
  result.faqs = faqs.map((f) => ({
    question: (f.question as string) || "",
    answer: (f.answer as string) || "",
    category: (f.category as string) || "general",
  }));
  return result;
}
