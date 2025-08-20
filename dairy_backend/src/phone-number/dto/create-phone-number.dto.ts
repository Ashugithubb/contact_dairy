import { IsArray, IsString } from "class-validator";

export class CreatePhoneNumberDto {
    @IsArray()
    phoneNumber:string[]
}
