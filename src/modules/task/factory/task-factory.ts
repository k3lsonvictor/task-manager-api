import { Task } from "../entities/task";

type Override = Partial<Task>;

export const makeTask = ({ ...override }: Override) => {
  return new Task({
    id: "id-teste",
    description: "a description",
    title: "Default Project",
    stageId: "default-user-id",
    ...override,
  });
};
