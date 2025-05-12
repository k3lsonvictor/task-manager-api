-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_tagId_fkey";

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE SET NULL ON UPDATE CASCADE;
