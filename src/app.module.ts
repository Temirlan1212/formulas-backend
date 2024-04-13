import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BoardsModule } from './boards/boards.module';
import { BoardColumnModule } from './board-column/board-column.module';
import { BoardColumnsModule } from './board-columns/board-columns.module';

@Module({
  imports: [PrismaModule, AuthModule, UsersModule, BoardsModule, BoardColumnModule, BoardColumnsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
