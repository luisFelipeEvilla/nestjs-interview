import { role } from "@prisma/client";
import {  ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty()
    readonly email: string;

    @ApiProperty()
    readonly name: string;

    @ApiProperty()
    readonly password: string;
    
    @ApiProperty({ enum: role, enumName: 'role'})
    readonly role: role;
    
    @ApiProperty()
    readonly enterprise_id: number;
}
