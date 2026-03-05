import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateNoteBody {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;
}
