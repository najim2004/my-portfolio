import { ISkillCategory } from "@/models/skill-categories.model";
import { IEducation } from "../model/education.types";
import { IExperience } from "../model/experience.types";
import { ISkill } from "../model/skill.types";
import { IUser } from "../model/user.types";

export interface AboutData {
  user: Pick<
    IUser,
    "about" | "approach" | "profileImage" | "resumeUrl" | "hobbies"
  >;
  skills: ({ category: string; _id: string } & Omit<ISkill, "userId">)[];
  educations: ({ _id: string } & Omit<IEducation, "userId">)[];
  experiences: ({ _id: string } & Omit<IExperience, "userId">)[];
  skillCategories: ({ _id: string } & ISkillCategory)[];
}
