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
    tasks: {
      id: string;
      title: string; // Ajuste conforme a estrutura real de tasks
      position: number;
      stageId: string;
      tag: {
        id: string;
        name: string;
        color: string;
      } | null;
    }[];
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
        stageId: task.stageId,
        tag: task.tag,
      })),
    };
  }
}
