import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import { UpsertProfileDto } from './dto/upsert-profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async updateProfile(userId: string, payload: UpsertProfileDto) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['profile'],
    });

    if (!user) {
      throw new NotFoundException('User tidak ada');
    }

    if (user.profile) {
      Object.assign(user.profile, payload);
      await this.profileRepository.save(user.profile);
    } else {
      const newProfile = this.profileRepository.create({
        ...payload,
        user: user,
      });
      await this.profileRepository.save(newProfile);
    }

    return {
      message: 'Profile berhasil diperbarui',
    };
  }
}
