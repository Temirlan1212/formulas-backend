import { Boards as BoardsModule } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';

export class BoardsEntity implements BoardsModule {
  @IsNotEmpty({
    message: 'Title should not be empty',
  })
  title: string;
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
