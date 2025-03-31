import { DeleteProjectUseCase } from './delete-project-use-case';
import { ProjectRepositoryInMemory } from '../../repositories/project-repository-in-memory';
import { makeProject } from '../../factory/project-factory';
import { NotFoundException } from '@nestjs/common';

let deleteProjectUseCase: DeleteProjectUseCase;
let projectRepositoryInMemory: ProjectRepositoryInMemory;

describe('Delete Project', () => {
  beforeEach(() => {
    projectRepositoryInMemory = new ProjectRepositoryInMemory();
    deleteProjectUseCase = new DeleteProjectUseCase(projectRepositoryInMemory);
  });

  it('Should delete a project successfully', async () => {
    const project = makeProject({ userId: 'user-123' });

    projectRepositoryInMemory.projects.push(project);

    await deleteProjectUseCase.execute({
      projectId: project.id,
      userId: 'user-123',
    });

    expect(projectRepositoryInMemory.projects.length).toBe(0);
  });

  it('Should throw NotFoundException when project does not exist', async () => {
    await expect(
      deleteProjectUseCase.execute({
        projectId: 'non-existent-project',
        userId: 'user-123',
      }),
    ).rejects.toThrow(NotFoundException);
  });

  it('Should throw NotFoundException when user does not have permission to delete', async () => {
    const project = makeProject({ userId: 'owner-user' });

    projectRepositoryInMemory.projects.push(project);

    await expect(
      deleteProjectUseCase.execute({
        projectId: project.id,
        userId: 'unauthorized-user',
      }),
    ).rejects.toThrow(NotFoundException);
  });
});
