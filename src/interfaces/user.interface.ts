export interface user {
  email: string;
  name: string;
  password: string;
}

export interface signup extends user {
  passwordCheck: string;
}
