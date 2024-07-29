import { Controller, Post, Body, Patch, UseGuards, Request, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Patch('/favorites/add')
  favoriteAdd(@Body() body, @Request() request) {
    return this.usersService.addFavorite(request.user.userId, body.id);
  }

  @UseGuards(AuthGuard)
  @Patch('/favorites/remove')
  favoriteRemove(@Body() body, @Request() request) {
    return this.usersService.removeFavorite(request.user.userId, body.id);
  }
}
