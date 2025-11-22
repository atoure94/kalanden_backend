import { Body, Controller, Get, Param, Post, Patch, Delete } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserResponseDto, CreateUserDto, UpdateUserDto } from './user.dto';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get()
  @ApiOperation({ summary: 'Liste des utilisateurs' })
  @ApiResponse({ type: [UserResponseDto] })
  findAll() {
    return this.usersService.findAll();
  }

  @Get('/phone/:phone')
  @ApiOperation({ summary: 'Trouver un utilisateur par numéro' })
  @ApiResponse({ type: UserResponseDto })
  findOne(@Param('phone') phone: string) {
    return this.usersService.findOneByPhone(phone);
  }

  @Post()
  @ApiOperation({ summary: 'Créer un utilisateur' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({ type: UserResponseDto })
  createUser(@Body() data: CreateUserDto) {
    return this.usersService.createUser(data);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Modifier un utilisateur' })
  @ApiResponse({ type: UserResponseDto })
  updateUser(@Param('id') id: number, @Body() data: UpdateUserDto) {
    return this.usersService.updateUser(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un utilisateur' })
  deleteUser(@Param('id') id: number) {
    return this.usersService.deleteUser(id);
  }
}
