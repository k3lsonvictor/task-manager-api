import { UserRepositoryInMemory } from "../../repositories/user-repository-in-memory";
import { GetUserUseCase } from "./get-user-use-case";
import { NotFoundException } from "@nestjs/common";
import { User } from "../../entities/user";
import { makeUser } from "../../factory/user-factory";

describe("Get User Use Case", () => {
  let getUserUseCase: GetUserUseCase;
  let userRepository: UserRepositoryInMemory;

  beforeEach(() => {
    userRepository = new UserRepositoryInMemory();
    getUserUseCase = new GetUserUseCase(userRepository);
  });

  it("Should return a user successfully", async () => {
    const user = makeUser({});

    await userRepository.create(user);

    const foundUser = await getUserUseCase.execute({ id: user.id });

    expect(foundUser).toBeDefined();
    expect(foundUser.id).toBe(user.id);
    expect(foundUser.name).toBe(user.name);
    expect(foundUser.email).toBe(user.email);
  });

  it("Should throw NotFoundException if user does not exist", async () => {
    await expect(getUserUseCase.execute({ id: "non-existent-id" })).rejects.toThrow(
      NotFoundException
    );
  });
});
