import { IsArray, IsString } from "class-validator"
import { CreatePhoneNumberDto } from "src/phone-number/dto/create-phone-number.dto"

export class CreateContactDto {
    @IsString()
    firstName: string

    @IsString()
    lastName: string

    @IsString()
    nickName: string

    @IsString()
    email: string

    @IsArray()
    @IsString({ each: true })
    phoneNumbers: string[]

    @IsArray()
    @IsString({ each: true })
    tags: string[]

}
