import { Injectable } from '@nestjs/common';
import { NoteRepository } from '../../entities/repositories/noteRepository';
import { NoteNotFoundExeption } from '../../exceptions/NoteNotFoundExeption';
import { NoteWithoutPermissonException } from '../../exceptions/NoteWithoutPermissonException';

interface GetNoteRequest {
  noteId: string;
  userId: string;
}
@Injectable()
export class GetNoteUseCase {
  constructor(private noteRepository: NoteRepository) {}
  async execute({ userId, noteId }: GetNoteRequest) {
    const note = await this.noteRepository.findById(noteId);

    if (!note) throw new NoteNotFoundExeption();

    if (note.userId !== userId)
      throw new NoteWithoutPermissonException({ actionName: 'recuperar' });

    return note;
  }
}
