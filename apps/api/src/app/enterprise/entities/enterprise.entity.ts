import { ApiProperty } from "@nestjs/swagger";

export class Enterprise {
    id: number;
    
    @ApiProperty()
    name: string;
}