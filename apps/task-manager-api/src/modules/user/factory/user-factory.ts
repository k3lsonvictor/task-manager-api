import { User } from "../entities/user";

type Override = Partial<User>;

export const makeUser = ({ id, ...override }: Override) => {
  return new User(
    {
      email: 'email@gmail.com',
      name: 'Vitor',
      password: '123123',
      ...override,
    },
    id,
  );
};
