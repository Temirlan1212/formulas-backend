import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Messages } from '../core/consts';
import { PaginatorTypes, paginator } from '@nodeteam/nestjs-prisma-pagination';
import { Boards, Prisma } from '@prisma/client';

const paginate: PaginatorTypes.PaginateFunction = paginator({ perPage: 1 });

@Injectable()
export class BoardsService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createTodoDto: CreateBoardDto) {
    await this.validateOnTodoExist(createTodoDto);
    return await this.prismaService.boards.create({
      data: createTodoDto,
    });
  }

  async findAll({
    where,
    orderBy,
    page,
    perPage,
  }: {
    where?: Prisma.BoardsWhereInput;
    orderBy?: Prisma.BoardsOrderByWithRelationInput;
    page: number;
    perPage: number;
  }): Promise<PaginatorTypes.PaginatedResult<Boards>> {
    return paginate(
      this.prismaService.boards,
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
    const todo = await this.prismaService.boards.findUnique({
      where: { id: String(id) },
    });
    if (!todo) throw new NotFoundException('Todo Not Found');
    return todo;
  }

  async update(id: string, updateTodoDto: UpdateBoardDto) {
    await this.validateOnTodoNotExist(id);
    await this.prismaService.boards.update({
      where: { id: String(id) },
      data: updateTodoDto,
    });
    return updateTodoDto;
  }

  async remove(id: string) {
    await this.validateOnTodoNotExist(id);
    await this.prismaService.boards.delete({ where: { id } });
    return id;
  }

  private async validateOnTodoNotExist(id: string) {
    return await this.findOne(id);
  }

  private async validateOnTodoExist({ title }: CreateBoardDto) {
    const todo = await this.prismaService.boards.findFirst({
      where: { title },
    });

    if (todo)
      throw new HttpException(
        Messages['SUCH_Boards_ALREADY_EXISTS'],
        HttpStatus.BAD_REQUEST,
      );
  }
}
