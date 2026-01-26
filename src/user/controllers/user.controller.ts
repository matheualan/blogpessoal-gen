import { Body, Controller, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { UserService } from "../services/user.service";
import { Usuario } from "../entities/usuario.entity";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";

@Controller('/usuarios')
export class UserController {

    constructor(private readonly userService: UserService){ }

    @UseGuards(JwtAuthGuard)
    @Get('/all')
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Usuario[]>{
        return this.userService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Usuario>{
        return this.userService.findById(id)
    }

    @Post('/cadastrar')
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() user: Usuario): Promise<Usuario>{
        return this.userService.create(user)
    }

    @UseGuards(JwtAuthGuard)
    @Put('/atualizar')
    @HttpCode(HttpStatus.OK)
    async update(@Body() user: Usuario): Promise<Usuario>{
        return this.userService.update(user)
    }

}