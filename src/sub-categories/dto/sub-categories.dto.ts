import { ArrayMinSize, IsArray, IsBoolean, IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, MaxLength, Min, MinLength } from "class-validator";

export class SubCategoryDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  name: string;

  @IsString()
  @MinLength(3)
  @MaxLength(100)
  @IsOptional()
  description: string;

  @IsEmpty()
  creatorId: string;

  @IsNumber()
  @IsOptional()
  classification: number;
}

export class SubCategoryPatchDto {
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(100)
  name: string;

  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(100)
  description: string;

  @IsNumber()
  @IsOptional()
  classification: number;
}