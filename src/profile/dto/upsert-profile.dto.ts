import { IsNotEmpty, IsString } from "class-validator"

export class UpsertProfileDto{
  @IsNotEmpty()
  @IsString()
  bio: string
}