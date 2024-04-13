import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  Query,
} from '@nestjs/common';
import { CreateBoardColumnDto } from './dto/create-board-column.dto';
import { UpdateBoardColumnDto } from './dto/update-board-column.dto';
import { BoardColumnsService } from './board-columns.service';

@Controller('board-columns')
export class BoardColumnsController {
  constructor(private readonly boardColumnsService: BoardColumnsService) {}

  @Post()
  create(@Body(ValidationPipe) createBoardColumnDto: CreateBoardColumnDto) {
    return this.boardColumnsService.create(createBoardColumnDto);
  }

  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('perPage') perPage: number = 10,
  ) {
    return this.boardColumnsService.findAll({
      orderBy: { createdAt: 'desc' },
      perPage,
      page,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.boardColumnsService.findOne(id);
  }

  @Get('boardId/:id')
  findOneByBoardId(@Param('id') id: string) {
    return this.boardColumnsService.findOneByBoardId(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateBoardColumnDto: UpdateBoardColumnDto,
  ) {
    return this.boardColumnsService.update(id, updateBoardColumnDto);
  }

  @Patch('boardId/:id')
  updateByBoardId(
    @Param('id') id: string,
    @Body(ValidationPipe) updateBoardColumnDto: UpdateBoardColumnDto,
  ) {
    return this.boardColumnsService.updateByBoardId(id, updateBoardColumnDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.boardColumnsService.remove(id);
  }
}
