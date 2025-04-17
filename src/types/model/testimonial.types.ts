export interface ITestimonial {
  status: "PENDING" | "APPROVED" | "REJECTED";
  name: string;
  email: string;
  avatar?: string;
  position: string;
  company: string;
  message: string;
  createdAt: Date;
}
