import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length, IsEmail } from 'class-validator';

export class regiterDataDto {
  @ApiProperty({
    example: 'hiren',
    required: false,
  })
  readonly firstName: string;

  @ApiProperty({
    example: 'patel',
    required: false,
  })
  readonly lastName: string;

  @ApiProperty({
    example: 'hiren@gmail.com',
    required: false,
  })
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @ApiProperty({
    example: 'password',
    required: true,
  })
  @Length(6)
  readonly password: string;
}
