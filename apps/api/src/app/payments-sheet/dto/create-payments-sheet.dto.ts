import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class CreatePaymentsSheetDto {
    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    enterprise_id: number;
}
