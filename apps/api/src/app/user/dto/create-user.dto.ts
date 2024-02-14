import { role } from "@prisma/client";

export class CreateUserDto {
    readonly email: string;
    readonly name: string;
    readonly password: string;
    readonly role: role;
    readonly enterprise_id: number;
}
