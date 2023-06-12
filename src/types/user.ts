export type LoginUser = {
  email: string;
  password: string;
};

export type User = {
  id?: string | number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
