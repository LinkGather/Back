interface user {
  email: string;
  name: string;
  password: string;
}

interface signup extends user {
  passwordCheck: string;
}
