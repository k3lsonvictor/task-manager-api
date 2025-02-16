// import { Injectable } from "@nestjs/common";
// import { StageRepository } from "../../repositories/stage-repository";
// import { TaskRepository } from "src/modules/task/repositories/task-repository";

// interface GetStagesRequest {
//   projectId: string;
// }

// @Injectable()
// export class GetStagesUseCase {
//   constructor(
//     private stageRepository: StageRepository,
//     private taskRepository: TaskRepository,
//   ) {}

//   async execute({ projectId }: GetStagesRequest) {
//     const stages = await this.stageRepository.findAll(projectId);
  
//     // Para cada stage, buscar os tasks associados e mapear para o formato resumido
//     const stagesWithBasicTasks = await Promise.all(
//       stages.map(async (stage) => {
//         const tasks = await this.taskRepository.findAll(stage.id);
//         return {
//           ...stage,
//           tasks: tasks, // Transformando os cards para o formato resumido
//         };
//       })
//     );
  
//     return stagesWithBasicTasks;
//   }
// }
