import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CategoryDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  description: string;

  @IsArray()
  @IsOptional()
  subCategories: string[] = [];

  @IsNumber()
  @IsOptional()
  classification: number;
}

export class CategoryPatchDto {
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

  @IsArray()
  @ArrayMinSize(1)
  @IsOptional()
  subCategories: string[];

  @IsNumber()
  @IsOptional()
  classification: number;
}