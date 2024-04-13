import { BoardColumns as BoardColumnsModule, Prisma } from '@prisma/client';

export class BoardColumnEntity implements BoardColumnsModule {
  boardId: string;
  columns: Prisma.JsonValue;
  id: string;
  createdAt: Date;
  updatedAt: Date;
}
