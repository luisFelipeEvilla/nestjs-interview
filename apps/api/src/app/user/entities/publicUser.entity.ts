import { ApiProperty } from "@nestjs/swagger";

export class PublicUser {
    @ApiProperty()
    id: number;

    @ApiProperty()
    email: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    role: string;

    @ApiProperty()
    enterprise_id: number;
}