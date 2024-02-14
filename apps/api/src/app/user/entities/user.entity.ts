import { ApiProperty } from "@nestjs/swagger";

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
    role: string;

    @ApiProperty()
    enterprise_id: number;
    
    @ApiProperty()
    enterprise: {
        id: number;
        name: string;
        address: string;
    };
}