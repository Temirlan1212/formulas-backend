import { PickType } from '@nestjs/mapped-types';
import { BoardColumnEntity } from '../entities/board-column.entity';

export class CreateBoardColumnDto extends PickType(BoardColumnEntity, [
  'columns',
  'boardId',
]) {}
