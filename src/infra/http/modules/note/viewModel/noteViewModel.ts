import { Note } from 'src/modules/note/entities/note';

export class NoteViewModel {
  static toHTTP({ id, title, description, createdAt }: Note) {
    return {
      id,
      title,
      description,
      createdAt,
    };
  }
}
