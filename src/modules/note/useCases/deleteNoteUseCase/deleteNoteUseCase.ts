import { Injectable } from '@nestjs/common';
import { NoteRepository } from '../../entities/repositories/noteRepository';
import { NoteNotFoundExeption } from '../../exceptions/NoteNotFoundExeption';
import { NoteWithoutPermissonException } from '../../exceptions/NoteWithoutPermissonException';

interface DeleteNoteRequest {
  noteId: string;
  userId: string;
}

@Injectable()
export class DeleteNoteUseCase {
  constructor(private noteRepository: NoteRepository) {}
  async execute({ noteId, userId }: DeleteNoteRequest) {
    const note = await this.noteRepository.findById(noteId);

    if (!note) throw new NoteNotFoundExeption();

    if (note.userId !== userId)
      throw new NoteWithoutPermissonException({ actionName: 'deletar' });

    await this.noteRepository.delete(noteId);
  }
}
