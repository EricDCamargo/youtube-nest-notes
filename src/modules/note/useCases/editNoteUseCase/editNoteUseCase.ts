import { Injectable } from '@nestjs/common';
import { NoteRepository } from '../../entities/repositories/noteRepository';
import { NoteNotFoundExeption } from '../../exceptions/NoteNotFoundExeption';
import { NoteWithoutPermissonException } from '../../exceptions/NoteWithoutPermissonException';

interface EditNoteRequest {
  title: string;
  description?: string;
  noteId: string;
  userId: string;
}

@Injectable()
export class EditNoteUseCase {
  constructor(private noteRepository: NoteRepository) {}
  async execute({ userId, noteId, description, title }: EditNoteRequest) {
    const note = await this.noteRepository.findById(noteId);

    if (!note) throw new NoteNotFoundExeption();

    if (note.userId !== userId)
      throw new NoteWithoutPermissonException({ actionName: 'editar' });

    note.title = title;
    note.description = description ?? null;

    await this.noteRepository.save(note);
    return note;
  }
}
