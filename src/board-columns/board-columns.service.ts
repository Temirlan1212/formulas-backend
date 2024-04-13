import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoardColumnDto } from './dto/create-board-column.dto';
import { UpdateBoardColumnDto } from './dto/update-board-column.dto';
import { PrismaService } from '../prisma/prisma.service';
import { PaginatorTypes, paginator } from '@nodeteam/nestjs-prisma-pagination';
import { BoardColumns, Prisma } from '@prisma/client';

const paginate: PaginatorTypes.PaginateFunction = paginator({ perPage: 1 });

@Injectable()
export class BoardColumnsService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createTodoDto: CreateBoardColumnDto) {
    return await this.prismaService.boardColumns.create({
      data: createTodoDto,
    });
  }

  async findAll({
    where,
    orderBy,
    page,
    perPage,
  }: {
    where?: Prisma.BoardColumnsWhereInput;
    orderBy?: Prisma.BoardColumnsOrderByWithRelationInput;
    page: number;
    perPage: number;
  }): Promise<PaginatorTypes.PaginatedResult<BoardColumns>> {
    return paginate(
      this.prismaService.boardColumns,
      {
        where,
        orderBy,
      },
      {
        perPage,
        page,
      },
    );
  }

  async findOne(id: string) {
    const todo = await this.prismaService.boardColumns.findUnique({
      where: { id: String(id) },
    });
    if (!todo) throw new NotFoundException('Todo Not Found');
    return todo;
  }

  async findOneByBoardId(id: string) {
    const todo = await this.prismaService.boardColumns.findFirst({
      where: { boardId: String(id) },
    });
    if (!todo) throw new NotFoundException('Todo Not Found');
    return todo;
  }

  async update(id: string, updateTodoDto: UpdateBoardColumnDto) {
    await this.validateOnTodoNotExist(id);
    await this.prismaService.boardColumns.update({
      where: { id: String(id) },
      data: updateTodoDto,
    });
    return updateTodoDto;
  }

  async updateByBoardId(id: string, updateTodoDto: UpdateBoardColumnDto) {
    await this.prismaService.boardColumns.updateMany({
      where: { boardId: String(id) },
      data: updateTodoDto,
    });

    return updateTodoDto;
  }

  async remove(id: string) {
    await this.validateOnTodoNotExist(id);
    await this.prismaService.boardColumns.delete({ where: { id } });
    return id;
  }

  private async validateOnTodoNotExist(id: string) {
    return await this.findOne(id);
  }
}
