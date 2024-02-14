import { ApiProperty } from "@nestjs/swagger";
import { payment_type } from "@prisma/client";

export class Employee {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    email: string;

    @ApiProperty({ enum: payment_type, enumName: 'payment_type'})
    payment_type: payment_type;
    
    @ApiProperty()
    enterprise: {
        id: number;
        name: string;
    };
}

