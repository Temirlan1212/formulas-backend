import { Module } from '@nestjs/common';
import { BoardColumnsService } from './board-columns.service';
import { BoardColumnsController } from './board-columns.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [BoardColumnsController],
  providers: [BoardColumnsService, PrismaService],
})
export class BoardColumnsModule {}
