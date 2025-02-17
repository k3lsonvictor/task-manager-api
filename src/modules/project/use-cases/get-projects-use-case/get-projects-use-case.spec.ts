import { GetProjectsUseCase } from "./get-projects-use-case";
import { ProjectRepositoryInMemory } from "../../repositories/project-repository-in-memory";
import { makeProject } from "../../factory/project-factory";

describe("Get Projects Use Case", () => {
  let getProjectsUseCase: GetProjectsUseCase;
  let projectRepository: ProjectRepositoryInMemory;

  beforeEach(() => {
    projectRepository = new ProjectRepositoryInMemory();
    getProjectsUseCase = new GetProjectsUseCase(projectRepository);
  });

  it("Should return all projects of the user", async () => {
    // 🔹 Criando projetos para um usuário específico
    const project1 = makeProject({});

    const project2 = makeProject({
      id: "id-test-2",
      name: "Project 2",
      description: "Description 2",
    });

    await projectRepository.create(project1);
    await projectRepository.create(project2);

    // 🔹 Buscando os projetos do usuário
    const projects = await getProjectsUseCase.execute(project1.userId);

    expect(projects).toHaveLength(2);
    expect(projects).toEqual([project1, project2]);
  });

  it("Should return an empty array if the user has no projects", async () => {
    // 🔹 Buscando projetos para um usuário sem projetos
    const projects = await getProjectsUseCase.execute("user-999");

    expect(projects).toEqual([]);
  });
});
