import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Users } from './users.entity';

@Injectable()
export class UsersService {
  // eslint-disable-next-line @typescript-eslint/ban-types
  async findOne(where: Object) {
    return this.userRepository.findOne(where);
  }

  constructor(
    @InjectRepository(Users)
    private userRepository: Repository<Users>,
  ) {}
}
