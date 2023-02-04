import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenService } from 'src/access-token/access-token.service';

@Injectable()
export class AuthService {
  async register(registerDto) {
    const { email } = registerDto;

    const emailExist = await this.userRepository.findOne({ where: { email } });
    if (emailExist) {
      throw new BadRequestException(
        "There's already an account associated with this email.",
      );
    }
    await this.userRepository.save(this.userRepository.create(registerDto));
  }

  async validateUser(email, password) {
    const emailExist = await this.userRepository.findOne({
      where: { email: email },
    });

    if (emailExist && (await bcrypt.compare(password, emailExist.password))) {
      return emailExist;
    }
    return null;
  }

  /**
   * Login service
   * @param loginDto
   * @returns
   */
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const data = await this.validateUser(email, password);
    if (data) {
      const payload = { id: data.id, email: email };
      const token = this.jwtService.sign(payload);

      await this.accessTokenSevice.insert({
        user: data,
        id: token,
        createdAt: new Date(),
        expiresAt: null,
      });

      return {
        user: data,
        accessToken: token,
      };
    }
    return { message: 'Please Enter a valid Email & Password' };
  }

  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
    private jwtService: JwtService,
    private accessTokenSevice: AccessTokenService,
  ) {}
}
