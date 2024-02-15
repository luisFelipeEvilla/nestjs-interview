//src/auth/entity/auth.entity.ts
import { ApiProperty } from '@nestjs/swagger';
import { PublicUser } from '../../user/entities/publicUser.entity';

export class AuthEntity {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  user: PublicUser;
}