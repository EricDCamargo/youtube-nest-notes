import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { NoteRepository } from '../../entities/repositories/noteRepository';

interface GetNoteRequest {
  noteId: string;
  userId: string;
}

export class GetNoteUseCase {
  constructor(private noteRepository: NoteRepository) {}
  async execute({ userId, noteId }: GetNoteRequest) {
    const note = await this.noteRepository.findById(noteId);

    if (!note) throw new NotFoundException();

    if (note.userId !== userId) throw new UnauthorizedException();

    return note;
  }
}
