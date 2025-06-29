import {
  Body,
  Controller,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { AuthGuard } from 'src/auth/guard/auth.guard';
import { UpsertProfileDto } from './dto/upsert-profile.dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly service: ProfileService) {}

  @UseGuards(AuthGuard)
  @Post()
  async updateProfile(@Request() req, @Body() payload: UpsertProfileDto) {
    return await this.service.updateProfile(req.user.id, payload);
  }
}
