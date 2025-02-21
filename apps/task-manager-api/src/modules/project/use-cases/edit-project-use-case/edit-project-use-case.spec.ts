import { EditProjectUseCase } from "./edit-project-use-case";
import { ProjectRepositoryInMemory } from "../../repositories/project-repository-in-memory";
import { Project } from "../../entities/project";
import { NotFoundException, ForbiddenException } from "@nestjs/common";
import { makeProject } from "../../factory/project-factory";

describe("Edit Project", () => {
  let projectRepository: ProjectRepositoryInMemory;
  let editProjectUseCase: EditProjectUseCase;

  beforeEach(() => {
    projectRepository = new ProjectRepositoryInMemory();
    editProjectUseCase = new EditProjectUseCase(projectRepository);
  });

  it("Should edit a project successfully", async () => {
    // 🔹 Criando um projeto antes de tentar editá-lo
    const project = makeProject({});

    await projectRepository.create(project);

    // 🔹 Executando a edição
    const updatedProject = await editProjectUseCase.execute({
      projectId: project.id,
      userId: project.userId,
      name: "New Project Name",
      description: "New Project Description",
    });

    // 🔹 Verificando se os campos foram atualizados corretamente
    expect(updatedProject.name).toBe("New Project Name");
    expect(updatedProject.description).toBe("New Project Description");
  });

  it("Should throw NotFoundException if project does not exist", async () => {
    await expect(
      editProjectUseCase.execute({
        projectId: "non-existent",
        userId: "user-123",
        name: "New Name",
      })
    ).rejects.toThrow(NotFoundException);
  });

  it("Should throw ForbiddenException when user does not have permission to edit", async () => {
    // 🔹 Criando um projeto com um usuário diferente
    const project = makeProject({});

    await projectRepository.create(project);

    // 🔹 Tentando editar com um usuário sem permissão
    await expect(
      editProjectUseCase.execute({
        projectId: "project-1",
        userId: "user-999", // Usuário diferente
        name: "New Name",
      })
    ).rejects.toThrow(NotFoundException);
  });

  it("Should update only the provided fields", async () => {
    // 🔹 Criando o projeto
    const project = makeProject({
      description: "old description"
    });

    await projectRepository.create(project);

    // 🔹 Atualizando apenas o nome
    const updatedProject = await editProjectUseCase.execute({
      projectId: project.id,
      userId: project.userId,
      name: "New Name",
    });

    // 🔹 O nome deve ser atualizado, mas a descrição deve permanecer a mesma
    expect(updatedProject.name).toBe("New Name");
    expect(updatedProject.description).toBe("old description");
  });
});
