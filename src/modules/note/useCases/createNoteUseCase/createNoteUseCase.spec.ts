import { NoteRepositoryInMemory } from '../../entities/repositories/noteRepositoryInMemory';
import { CreateNoteUseCase } from './createNoteUseCase';

let noteRepositoryInMemory: NoteRepositoryInMemory;
let createNoteUseCase: CreateNoteUseCase;

describe('Create Note', () => {
  noteRepositoryInMemory = new NoteRepositoryInMemory();
  createNoteUseCase = new CreateNoteUseCase(noteRepositoryInMemory);

  it('Should be able to create a new note', async () => {
    expect(noteRepositoryInMemory.notes).toEqual([]);

    const note = await createNoteUseCase.execute({
      title: 'Note de teste',
      userId: 'user-123',
    });

    expect(noteRepositoryInMemory.notes).toEqual([note]);
  });
});
