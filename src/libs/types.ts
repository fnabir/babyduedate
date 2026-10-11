export type Method = "period" | "conception" | "due";

export interface MethodDetails {
  id: Method;
  label: string;
  field: string;
  hint: string;
}

export interface Milestone {
  week: number;
  description: string;
}

export type BabySize = {
  length_cm: number;
  weight_g: number;
  comparison: string;
  description: string;
};
