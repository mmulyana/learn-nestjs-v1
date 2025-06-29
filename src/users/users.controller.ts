import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decolator/roles.decolator';
import { Role } from 'src/auth/enum/role.enum';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { RolesGuard } from 'src/auth/guard/role.guard';
import { UsersService } from './users.service';
import { User } from 'src/auth/entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  async getUsers(): Promise<User[]> {
    return await this.service.getUsers();
  }
}
