import { IsString } from 'class-validator';

export class CreateAuthorDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}

export class UpdateAuthorDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}
