export type StepParams = {
  phone: string;
  password: string;
  steps: number;
}

export type StepResponse = {
  code: string;
  message: string;
  mess: string;
  user_id: string;
  mobile: string;
  steps: string;
  time: string;
}

export type FormValue = {
  user: string;
  password: string;
  step: string;
} 