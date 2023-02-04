import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'hiren@gmail.com',
    required: true,
  })
  readonly email: string;

  @ApiProperty({
    example: 'password',
    required: true,
  })
  @Length(6)
  readonly password: string;
}
