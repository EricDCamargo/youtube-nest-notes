import { makeUser } from 'src/modules/user/factories/userFactory';
import { NoteRepositoryInMemory } from '../../entities/repositories/noteRepositoryInMemory';
import { DeleteNoteUseCase } from './deleteNoteUseCase';
import { makeNote } from '../../factories/noteFactory';
import { NoteNotFoundExeption } from '../../exceptions/NoteNotFoundExeption';
import { NoteWithoutPermissonException } from '../../exceptions/NoteWithoutPermissonException';

let noteRepositoryInMemory: NoteRepositoryInMemory;
let deleteNoteUseCase: DeleteNoteUseCase;

describe('Delete Note', () => {
  noteRepositoryInMemory = new NoteRepositoryInMemory();
  deleteNoteUseCase = new DeleteNoteUseCase(noteRepositoryInMemory);

  it('Should be able to delete a note', async () => {
    const user = makeUser({});
    const note = makeNote({
      userId: user.id,
    });

    noteRepositoryInMemory.notes = [note];

    await deleteNoteUseCase.execute({
      noteId: note.id,
      userId: user.id,
    });

    expect(noteRepositoryInMemory.notes).toHaveLength(0);
  });

  it('Should be able to throw an error if note does not exist', async () => {
    expect(async () => {
      await deleteNoteUseCase.execute({
        noteId: 'fakeId',
        userId: 'fakeId',
      });
    }).rejects.toThrow(NoteNotFoundExeption);
  });

  it('Should be able to throw an error when note has another userId', async () => {
    const note = makeNote({});

    noteRepositoryInMemory.notes = [note];
    expect(async () => {
      await deleteNoteUseCase.execute({
        noteId: note.id,
        userId: 'anotherUser',
      });
    }).rejects.toThrow(NoteWithoutPermissonException);
  });
});
