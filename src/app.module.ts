import { Module } from "@nestjs/common";
import { UserModule } from "./infra/http/modules/user/user.module";
import { DatabaseModule } from "./infra/database/database.module";
import { AuthModule } from "./infra/http/modules/auth/auth.module";
import { APP_GUARD } from "@nestjs/core";
import { JwtAuthGuard } from "./infra/http/modules/auth/guards/jwt-auth.guard";
import { ProjectModule } from "./infra/http/modules/project/project.module";
import { StageModule } from "./infra/http/modules/stage/stage.module";
import { TaskModule } from "./infra/http/modules/task/task.module";
import { TagModule } from "./infra/http/modules/tag/tag.module";

@Module({
  imports: [
    UserModule,
    ProjectModule,
    StageModule,
    TaskModule,
    TagModule,
    DatabaseModule,
    AuthModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
