import { CreateProjectUseCase } from "./create-project-use-case";
import { ProjectRepositoryInMemory } from "../../repositories/project-repository-in-memory";

let createProjectUseCase: CreateProjectUseCase;
let projectRepositoryInMemory: ProjectRepositoryInMemory;

describe("Create Project", () => {
  beforeEach(() => {
    projectRepositoryInMemory = new ProjectRepositoryInMemory();
    createProjectUseCase = new CreateProjectUseCase(projectRepositoryInMemory);
  });

  it("Should create a project successfully", async () => {
    const projectData = {
      name: "Test Project",
      description: "A test project description",
      userId: "user-123",
    };

    const project = await createProjectUseCase.execute(projectData);

    expect(project).toHaveProperty("id");
    expect(project.name).toBe(projectData.name);
    expect(project.description).toBe(projectData.description);
    expect(project.userId).toBe(projectData.userId);
    expect(projectRepositoryInMemory.projects).toContainEqual(project);
  });

  it("Should store the created project in the repository", async () => {
    const projectData = {
      name: "Stored Project",
      description: "Stored project description",
      userId: "user-456",
    };

    const project = await createProjectUseCase.execute(projectData);

    expect(projectRepositoryInMemory.projects.length).toBe(1);
    expect(projectRepositoryInMemory.projects[0]).toEqual(project);
  });
});
