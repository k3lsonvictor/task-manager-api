import { NotFoundException, ForbiddenException } from '@nestjs/common';
import { makeProject } from 'src/modules/project/factory/project-factory';
import { ProjectRepositoryInMemory } from 'src/modules/project/repositories/project-repository-in-memory';
import { EditProjectUseCase } from 'src/modules/project/use-cases/edit-project-use-case/edit-project-use-case';

describe('Edit Project Use Case', () => {
  let editProjectUseCase: EditProjectUseCase;
  let projectRepository: ProjectRepositoryInMemory;

  beforeEach(() => {
    projectRepository = new ProjectRepositoryInMemory();
    editProjectUseCase = new EditProjectUseCase(projectRepository);
  });

  it('Should edit a project successfully', async () => {
    // Cria um projeto no repositório
    const projectData = makeProject({
      name: 'Initial Name',
      description: 'Initial Desc',
      userId: 'user-123',
    });
    await projectRepository.create(projectData);

    // Edita o projeto
    const updatedProject = await editProjectUseCase.execute({
      projectId: projectData.id,
      userId: 'user-123',
      name: 'Updated Name',
      description: 'Updated Desc',
    });

    // Verifica se os dados foram atualizados
    expect(updatedProject.name).toBe('Updated Name');
    expect(updatedProject.description).toBe('Updated Desc');

    // Confirma que as mudanças foram salvas no repositório
    const storedProject = await projectRepository.findById(projectData.id);
    expect(storedProject?.name).toBe('Updated Name');
    expect(storedProject?.description).toBe('Updated Desc');
  });

  it('Should throw NotFoundException if project does not exist', async () => {
    await expect(
      editProjectUseCase.execute({
        projectId: 'non-existent-id',
        userId: 'user-123',
        name: 'New Name',
      }),
    ).rejects.toThrow(new NotFoundException('Project not found'));
  });

  it('Should throw ForbiddenException if user does not own the project', async () => {
    // Cria um projeto com um dono específico
    const projectData = makeProject({ userId: 'user-123' });
    await projectRepository.create(projectData);

    // Tenta editar com outro usuário
    await expect(
      editProjectUseCase.execute({
        projectId: projectData.id,
        userId: 'user-456', // Usuário diferente
        name: 'New Name',
      }),
    ).rejects.toThrow(
      new ForbiddenException('You do not have permission to edit this project'),
    );
  });
});
