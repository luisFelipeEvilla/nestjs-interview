import { ApiProperty } from "@nestjs/swagger";

export class PaymentsSheet {
    @ApiProperty()
    id: string;

    @ApiProperty()
    enterpriseId: string;

    @ApiProperty()
    created_at: Date;
}
