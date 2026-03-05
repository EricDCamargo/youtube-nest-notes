import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class EditNoteBody {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;
}
