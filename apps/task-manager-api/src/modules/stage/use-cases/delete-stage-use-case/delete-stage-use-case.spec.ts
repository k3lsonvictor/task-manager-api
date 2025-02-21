import { DeleteStagetUseCase } from "./delete-stage-use-case";
import { StageRepositoryInMemory } from "../../repositories/stage-repository-in-memory";
import { makeStage } from "../../factory/stage-factory";
import { NotFoundException } from "@nestjs/common";

describe("Delete Stage Use Case", () => {
  let deleteStageUseCase: DeleteStagetUseCase;
  let stageRepository: StageRepositoryInMemory;

  beforeEach(() => {
    stageRepository = new StageRepositoryInMemory();
    deleteStageUseCase = new DeleteStagetUseCase(stageRepository);
  });

  it("Should delete a stage successfully", async () => {
    // Cria um estágio no repositório
    const stageData = makeStage({ name: "Test Stage", projectId: "project-123" });
    await stageRepository.create(stageData);

    // Verifica se ele existe antes de deletar
    const existingStage = await stageRepository.findById(stageData.id);
    expect(existingStage).toBeTruthy();

    // Executa o caso de uso para deletar o estágio
    await deleteStageUseCase.execute({ stageId: stageData.id });

    // Verifica se ele foi realmente removido
    const deletedStage = await stageRepository.findById(stageData.id);
    expect(deletedStage).toBeNull();
  });

  it("Should throw NotFoundException if stage does not exist", async () => {
    await expect(
      deleteStageUseCase.execute({ stageId: "non-existent-id" })
    ).rejects.toThrow(new NotFoundException("Stage not found"));
  });
});
