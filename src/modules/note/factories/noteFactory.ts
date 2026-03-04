import { Note } from '../entities/note';

type Override = Partial<Note>;

export const makeNote = ({ id, ...override }: Override) => {
  return new Note(
    {
      title: 'Titulo de Note',
      userId: 'fakeID',
      description: 'Descrição de Note',
      ...override,
    },
    id,
  );
};
