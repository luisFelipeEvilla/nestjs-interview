import { ApiProperty } from "@nestjs/swagger";
import { payment_type } from "@prisma/client";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class CreateEmployeeDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly name: string;

    @IsNotEmpty()
    @IsNotEmpty()
    @ApiProperty({ enum: payment_type, enumName: 'payment_type'})
    readonly payment_type: payment_type;

    @ApiProperty({ description: "Minimun payment rate is 12 for hourly and 480 for salary", example: {payment_rate: 12, payment_type: 'HOURLY'} })
    @IsNumber()
    readonly payment_rate: number;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty()
    readonly enterprise_id: number;
    
    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    readonly email: string;
}
