import { NoteRepositoryInMemory } from '../../entities/repositories/noteRepositoryInMemory';
import { makeNote } from '../../factories/noteFactory';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { GetNoteUseCase } from './getNoteUseCase';
import { makeUser } from 'src/modules/user/factories/userFactory';

let noteRepositoryInMemory: NoteRepositoryInMemory;
let getNoteUseCase: GetNoteUseCase;

describe('Get Note', () => {
  noteRepositoryInMemory = new NoteRepositoryInMemory();
  getNoteUseCase = new GetNoteUseCase(noteRepositoryInMemory);

  it('Should be able to get a note', async () => {
    const user = makeUser({});
    const note = makeNote({ userId: user.id });

    noteRepositoryInMemory.notes = [note];

    const result = await getNoteUseCase.execute({
      noteId: note.id,
      userId: user.id,
    });

    expect(result).toEqual(note);
  });

  it('Should be able to throw an error if note does not exist', async () => {
    expect(async () => {
      await getNoteUseCase.execute({
        userId: 'fakeId',
        noteId: 'fakeId',
      });
    }).rejects.toThrow(NotFoundException);
  });

  it('Should be able to throw an error when note has another userId', async () => {
    const note = makeNote({});

    noteRepositoryInMemory.notes = [note];
    expect(async () => {
      await getNoteUseCase.execute({
        userId: 'fakeId',
        noteId: note.id,
      });
    }).rejects.toThrow(UnauthorizedException);
  });
});
