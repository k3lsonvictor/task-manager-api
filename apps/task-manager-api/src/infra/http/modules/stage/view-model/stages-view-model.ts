export class StagesViewModel {
  static toHttp({
    id,
    name,
    createdAt,
    projectId,
    tasks,
  }: {
    id: string;
    name: string;
    createdAt: Date;
    projectId: string;
    tasks: any[]; // Ajuste conforme a estrutura real de tasks
  }) {
    return {
      id,
      name,
      createdAt,
      projectId,
      tasks: tasks.map((task) => ({
        id: task.id,
        title: task.title, // Ajuste conforme a estrutura real de tasks
        position: task.position,
        stageId: task.stageId      
      })),
    };
  }
}
