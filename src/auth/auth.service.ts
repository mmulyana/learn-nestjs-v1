import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async registerUser(registerDto: RegisterDto): Promise<{ message: string }> {
    const hashPassword = await bcrypt.hash(registerDto.password, 10);

    const userEmail = await this.userRepository.findOneBy({
      email: registerDto.email,
    });
    const userName = await this.userRepository.findOneBy({
      name: registerDto.name,
    });

    if (userEmail) {
      throw new ConflictException('Email is already exists');
    }
    if (userName) {
      throw new ConflictException('Name is already exists');
    }

    const newUser = this.userRepository.create({
      ...registerDto,
      password: hashPassword,
    });

    await this.userRepository.save(newUser);

    return {
      message: 'Register success',
    };
  }

  async loginUser(loginDto: LoginDto): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { email: loginDto.email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credential');
    }

    if (!(await bcrypt.compare(loginDto.password, user.password))) {
      throw new UnauthorizedException('Invalid credential');
    }

    const payload = { id: user.id, email: user.email, role: user.role };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async getUser(id: string): Promise<any> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) return null;

    const { password, ...data } = user;

    return data;
  }
}
