import { ApiProperty } from "@nestjs/swagger";
import { role } from "@prisma/client";

export class User {
    @ApiProperty()
    id: number;

    @ApiProperty()
    email: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    password: string;

    @ApiProperty()
    role: role;

    @ApiProperty()
    enterprise_id: number;
    
    @ApiProperty()
    enterprise: {
        id: number;
        name: string;
    };
}