import mongoose, { Schema, models, model } from "mongoose";

/**
 * A single "Resume" document holds everything shown on the resume page
 * AND everything used to render the downloadable PDF. Your admin panel
 * reads/writes this one document; the PDF route always renders whatever
 * is currently in the database, so it's never out of sync.
 */

const SkillGroupSchema = new Schema(
    {
        label: { type: String, required: true },   // e.g. "Frontend"
        items: { type: String, required: true },   // comma-separated string
    },
    { _id: false }
);

const ProjectSchema = new Schema(
    {
        title: { type: String, required: true },
        desc: { type: String, required: true },
        tags: { type: [String], default: [] },
        stack: { type: String, default: "" },
    },
    { _id: false }
);

const EducationSchema = new Schema(
    {
        title: { type: String, required: true },   // e.g. "HSC — Science"
        institute: { type: String, required: true },
    },
    { _id: false }
);

const ResumeSchema = new Schema(
    {
        name: { type: String, required: true },
        role: { type: String, required: true },
        location: { type: String, default: "" },
        email: { type: String, default: "" },
        phone: { type: String, default: "" },
        github: { type: String, default: "" },
        portfolio: { type: String, default: "" },
        linkedin: { type: String, default: "" },

        summary: { type: [String], default: [] }, // one string per paragraph

        skills: { type: [SkillGroupSchema], default: [] },
        projects: { type: [ProjectSchema], default: [] },
        education: { type: [EducationSchema], default: [] },

        competencies: { type: [String], default: [] },
        softSkills: { type: [String], default: [] },
        languages: { type: [String], default: [] },

        updatedAt: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

export default models.Resume || model("Resume", ResumeSchema);