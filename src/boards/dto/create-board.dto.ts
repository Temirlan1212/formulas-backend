import { PickType } from '@nestjs/mapped-types';
import { BoardsEntity } from '../entities/board.entity';

export class CreateBoardDto extends PickType(BoardsEntity, ['title']) {}
