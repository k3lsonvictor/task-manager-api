/*
  Warnings:

  - You are about to drop the column `position` on the `Stage` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the `TaskAssignee` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "TaskAssignee" DROP CONSTRAINT "TaskAssignee_taskId_fkey";

-- DropForeignKey
ALTER TABLE "TaskAssignee" DROP CONSTRAINT "TaskAssignee_userId_fkey";

-- AlterTable
ALTER TABLE "Stage" DROP COLUMN "position";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "status";

-- DropTable
DROP TABLE "TaskAssignee";
