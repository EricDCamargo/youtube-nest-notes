import { HttpStatus } from '@nestjs/common';
import { AppException } from 'src/exceptions/appException';

interface NoteWithoutPermissonExceptionProps {
  actionName: string;
}

export class NoteWithoutPermissonException extends AppException {
  constructor({ actionName }: NoteWithoutPermissonExceptionProps) {
    super({
      message: `Sem permissáo para ${actionName} anotação`,
      status: HttpStatus.FORBIDDEN,
    });
  }
}
