export type UserData = {
  validUser: {
    name: string;
    email: string;
    password: string;
  };
  invalidUser: {
    email: string;
    password: string;
  };
};
