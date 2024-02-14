import { role } from "@prisma/client";
import {  ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber, IsString, MinLength, minLength } from "class-validator";

export class CreateUserDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    readonly name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
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
