import { role } from "@prisma/client";
import {  ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUserDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly password: string;
    
    @ApiProperty({ enum: role, enumName: 'role'})
    @IsNotEmpty()
    @IsString()
    readonly role: role;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    readonly enterprise_id: number;
}
