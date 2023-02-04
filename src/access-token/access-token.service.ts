import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccessToken } from './access-token.entity';

@Injectable()
export class AccessTokenService {

    async insert(data) {
        this.accessTokenRepo.save(
            this.accessTokenRepo.create({
                ...data
            }))
    }



    constructor(
        @InjectRepository(AccessToken)
        private accessTokenRepo: Repository<AccessToken>
    ) { }

}
