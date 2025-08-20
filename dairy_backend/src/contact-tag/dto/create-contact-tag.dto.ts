import { IsArray, IsNumber, IsString } from "class-validator";

export class CreateContactTagDto {
    @IsArray()
    @IsNumber({}, { each: true })
    contactIds: number[]

    @IsArray()
    @IsString({ each: true })
    tags: string[]
}


