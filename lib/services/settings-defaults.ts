import { ISettings } from "@/models/Settings"
import { SettingsFormInput } from "@/lib/schemas/settings"

function splitCommas(val: string | string[] | undefined | null): string {
  if (!val) return ""
  if (Array.isArray(val)) return val.join(", ")
  return val as string
}

export function getSettingsDefaultValues(initialData?: ISettings | null): SettingsFormInput {
  if (!initialData) {
    return {
      assistant: { name: "", purpose: "", contact_recommendation: "" },
      personal_info: { full_name: "", email: "", phone: "", location: "", professional_title: "" },
      technical_skills: { specializations: "", core_technologies: "" },
      experience: { professional_experience: "", project_experience: "", focus: "" },
      experiences: [],
      education: { background: "", additional_info: "" },
      response_guidelines: {
        be_concise: true, be_informative: true, professional_tone: true,
        redirect_uncertain_queries: "", language: "English",
      },
      innovation: [],
      expertise: [],
      standards: [],
      testimonials: [],
      case_studies: [],
    } as unknown as SettingsFormInput
  }

  return {
    assistant: initialData.assistant || { name: "", purpose: "", contact_recommendation: "" },
    personal_info: initialData.personal_info || { full_name: "", email: "", phone: "", location: "", professional_title: "" },
    technical_skills: {
      specializations: splitCommas(initialData.technical_skills?.specializations),
      core_technologies: splitCommas(initialData.technical_skills?.core_technologies),
    },
    experience: initialData.experience || { professional_experience: "", project_experience: "", focus: "" },
    experiences: initialData.experiences?.map((exp) => ({
      year: exp.year || "",
      role: exp.role || "",
      company: exp.company || "",
      description: exp.description || "",
      technologies: splitCommas(exp.technologies),
    })) || [],
    education: initialData.education || { background: "", additional_info: "" },
    response_guidelines: initialData.response_guidelines || {
      be_concise: true, be_informative: true, professional_tone: true,
      redirect_uncertain_queries: "", language: "English",
    },
    innovation: (initialData.innovation || []).map(item => ({
      title: item.title || "", description: item.description || "",
      icon: item.icon || "", color: item.color || "",
    })),
    expertise: (initialData.expertise || []).map(exp => ({
      title: exp.title || "", description: exp.description || "",
      icon: exp.icon || "",
      skills: splitCommas(exp.skills),
      color: exp.color || "",
    })),
    standards: (initialData.standards || []).map(std => ({
      title: std.title || "", description: std.description || "",
      icon: std.icon || "", metrics: std.metrics || "",
      features: splitCommas(std.features),
    })),
    testimonials: (initialData.testimonials || []).map(t => ({
      name: t.name || "", role: t.role || "", content: t.content || "",
      avatar: t.avatar || "", color: t.color || "",
    })),
    case_studies: (initialData.case_studies || []).map((cs) => ({
      title: cs.title || "", description: cs.description || "",
      challenge: cs.challenge || "", solution: cs.solution || "",
      impact: cs.impact || "",
      technologies: splitCommas(cs.technologies),
      image: cs.image || "",
    })),
  } as unknown as SettingsFormInput
}
