// import { StageRepositoryInMemory } from "../../repositories/stage-repository-in-memory";
// import { DeleteStagetUseCase } from "./delete-stage-use-case";

// let deleteStageUseCase: DeleteStagetUseCase;
// let stageRepositoryInMemory: StageRepositoryInMemory;

// describe("Delete Stage", () => {
//   beforeEach(() => {
//     stageRepositoryInMemory = new StageRepositoryInMemory();
//     deleteStageUseCase = new DeleteStagetUseCase(stageRepositoryInMemory);
//   });

//   it('should delete stage when valid stageId and projectId are provided', async () => {
//     const stageRepository = {
//       findById: jest.fn().mockResolvedValue({ id: 'stage-1', projectId: 'project-1' }),
//       delete: jest.fn().mockResolvedValue(undefined)
//     } as unknown as StageRepositoryInMemory;

//     const deleteStageUseCase = new DeleteStagetUseCase(stageRepository);

//     await deleteStageUseCase.execute({ stageId: 'stage-1', projectId: 'project-1' });

//     expect(stageRepository.findById).toHaveBeenCalledWith('stage-1');
//     expect(stageRepository.delete).toHaveBeenCalledWith('stage-1');
//   });

//   it('should throw NotFoundException when stage does not exist', async () => {
//     const stageRepository = {
//       findById: jest.fn().mockResolvedValue(null),
//       delete: jest.fn()
//     } as unknown as StageRepositoryInMemory;

//     const deleteStageUseCase = new DeleteStagetUseCase(stageRepository);

//     await expect(
//       deleteStageUseCase.execute({ stageId: 'invalid-id', projectId: 'project-1' })
//     ).rejects.toThrow();

//     expect(stageRepository.findById).toHaveBeenCalledWith('invalid-id');
//     expect(stageRepository.delete).not.toHaveBeenCalled();
//   });
// });