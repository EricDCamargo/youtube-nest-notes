import { makeUser } from 'src/modules/user/factories/userFactory';
import { NoteRepositoryInMemory } from '../../entities/repositories/noteRepositoryInMemory';
import { makeNote } from '../../factories/noteFactory';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { EditNoteUseCase } from './editNoteUseCase';

let noteRepositoryInMemory: NoteRepositoryInMemory;
let editNoteUseCase: EditNoteUseCase;

describe('Edit Note', () => {
  noteRepositoryInMemory = new NoteRepositoryInMemory();
  editNoteUseCase = new EditNoteUseCase(noteRepositoryInMemory);

  it('Should be able to Edit a note', async () => {
    const user = makeUser({});
    const note = makeNote({
      userId: user.id,
    });

    noteRepositoryInMemory.notes = [note];

    const titleChanged = 'title changed';
    const descriptionChanged = 'description changed';

    await editNoteUseCase.execute({
      title: titleChanged,
      description: descriptionChanged,
      noteId: note.id,
      userId: user.id,
    });

    expect(noteRepositoryInMemory.notes[0].title).toEqual(titleChanged);
    expect(noteRepositoryInMemory.notes[0].description).toEqual(
      descriptionChanged,
    );
  });

  it('Should be able to throw an error if note does not exist', async () => {
    expect(async () => {
      await editNoteUseCase.execute({
        title: 'Note de teste',
        userId: 'fakeId',
        noteId: 'fakeId',
      });
    }).rejects.toThrow(NotFoundException);
  });

  it('Should be able to throw an error when note has another userId', async () => {
    const note = makeNote({});

    noteRepositoryInMemory.notes = [note];
    expect(async () => {
      await editNoteUseCase.execute({
        title: 'Note de teste',
        userId: 'fakeId',
        noteId: note.id,
      });
    }).rejects.toThrow(UnauthorizedException);
  });
});
