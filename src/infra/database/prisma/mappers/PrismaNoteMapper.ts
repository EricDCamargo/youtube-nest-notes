import { Note as NoteRaw } from 'generated/prisma/client';
import { Note } from 'src/modules/note/entities/note';

export class PrismaNoteMapper {
  static toPrisma({
    id,
    userId,
    title,
    description,
    createdAt,
  }: Note): NoteRaw {
    return {
      id,
      userId,
      title,
      description,
      createdAt,
    };
  }

  static toDomain({
    id,
    userId,
    title,
    description,
    createdAt,
  }: NoteRaw): Note {
    return new Note({ userId, title, description, createdAt }, id);
  }
}
