import { IBlog } from "../model/blog.types";
import { IProject } from "../model/project.types";
import { IService } from "../model/service.types";
import { ISkill } from "../model/skill.types";
import { ITestimonial } from "../model/testimonial.types";
import { IUser } from "../model/user.types";

export interface ProjectType
  extends Pick<
    IProject,
    | "title"
    | "slug"
    | "description"
    | "technologies"
    | "liveLink"
    | "githubLink"
    | "image"
  > {
  _id: string;
}

export interface BlogType
  extends Pick<
    IBlog,
    "publishedAt" | "readTime" | "title" | "excerpt" | "slug" | "image"
  > {
  _id: string;
  authorName: string;
}

export interface HomeData {
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
  projects: ProjectType[];
  blogs: BlogType[];
  services: Omit<IService, "userId">[];
  testimonials?: ({ _id: string } & ITestimonial)[];
  skills: { category: string } & Omit<ISkill, "userId">[];
}
