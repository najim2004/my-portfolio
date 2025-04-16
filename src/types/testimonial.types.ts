export enum Status {
  PENDING,
  APPROVED,
  REJECTED,
}
export interface ITestimonial {
  status: Status;
  name: string;
  email: string;
  avatar?: string;
  position: string;
  company: string;
  message: string;
  createdAt: Date;
}
