import { payment_type } from "@prisma/client";

export class CreateEmployeeDto {
    readonly name: string;
    readonly payment_type: payment_type;
    readonly enterprise_id: number;
    readonly email: string;
}
