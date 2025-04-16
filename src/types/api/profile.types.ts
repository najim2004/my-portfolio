import { IEducation } from "../model/education.types";
import { IExperience } from "../model/experience.types";
import { IService } from "../model/service.types";
import { ISkill } from "../model/skill.types";
import { IUser } from "../model/user.types";

export interface PortfolioEducation extends Omit<IEducation, "userId"> {
  _id: string;
}

export interface PortfolioExperience extends Omit<IExperience, "userId"> {
  _id: string;
}

export interface PortfolioSkill extends Omit<ISkill, "userId"> {
  _id: string;
}

export interface PortfolioService extends Omit<IService, "userId"> {
  _id: string;
}

export interface PortfolioData {
  user: { _id: string } & Pick<
    IUser,
    | "fullName"
    | "titles"
    | "email"
    | "phone"
    | "location"
    | "isFreelancer"
    | "profileImage"
    | "resumeUrl"
    | "about"
    | "approach"
    | "socialLinks"
  >;
  education: PortfolioEducation[];
  experience: PortfolioExperience[];
  skills: PortfolioSkill[];
  services: PortfolioService[];
}
