import { IsArray, IsBoolean, IsEnum, IsIn, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { boolean } from 'zod';


export class GetContactQueryDto {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  limit?: number = 10;

  @IsOptional()
  @IsString()
  searchValue?: string;

  @IsOptional()
  @IsArray()
  @Transform(({ value }) => {
    if (Array.isArray(value)) return value.map(Number);
    if (typeof value === 'string') return [Number(value)];
    return [];
  })
  tags?: number[];
 

  @IsOptional()
  @IsString()
  @Type(()=>String)
  deleted?:string

  // @IsOptional()
  // @IsBoolean()
  // @Type(()=>boolean)
  // favorite?:boolean

  @IsOptional()
  @IsString()
  @Type(()=>String)
  favorite?:string
}