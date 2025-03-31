import { GetProjectUseCase } from './get-project-use-case';
import { ProjectRepositoryInMemory } from '../../repositories/project-repository-in-memory';
import { makeProject } from '../../factory/project-factory';

describe('Get Project Use Case', () => {
  let getProjectUseCase: GetProjectUseCase;
  let projectRepository: ProjectRepositoryInMemory;

  beforeEach(() => {
    projectRepository = new ProjectRepositoryInMemory();
    getProjectUseCase = new GetProjectUseCase(projectRepository);
  });

  it('Should return the project when user has permission', async () => {
    // 🔹 Criando um projeto no repositório em memória
    const project = makeProject({});

    await projectRepository.create(project);

    // 🔹 Chamando o use case com o mesmo userId do dono do projeto
    const result = await getProjectUseCase.execute({
      projectId: project.id,
      userId: project.userId,
    });

    expect(result).toEqual(project);
  });

  it('Should throw an error if the project does not exist', async () => {
    await expect(
      getProjectUseCase.execute({
        projectId: 'non-existent',
        userId: 'user-123',
      }),
    ).rejects.toThrow('Project not found');
  });

  it('Should throw an error if user does not have permission to access the project', async () => {
    // 🔹 Criando um projeto no repositório com um userId diferente
    const project = makeProject({
      name: 'Project Name',
      description: 'Project Description',
    });

    await projectRepository.create(project);

    // 🔹 Tentando acessar o projeto com outro userId
    await expect(
      getProjectUseCase.execute({
        projectId: project.id,
        userId: 'user-999', // Usuário sem permissão
      }),
    ).rejects.toThrow('No permition for recover the project');
  });
});
