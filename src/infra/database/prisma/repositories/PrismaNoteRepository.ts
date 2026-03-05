import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { Note } from 'src/modules/note/entities/note';
import { NoteRepository } from 'src/modules/note/entities/repositories/noteRepository';
import { PrismaNoteMapper } from '../mappers/PrismaNoteMapper';

@Injectable()
export class PrismaNoteRepository implements NoteRepository {
  constructor(private prisma: PrismaService) {}
  async create(note: Note): Promise<void> {
    const noteRaw = PrismaNoteMapper.toPrisma(note);

    await this.prisma.note.create({
      data: noteRaw,
    });
  }
  async findById(id: string): Promise<Note | null> {
    const note = await this.prisma.note.findUnique({ where: { id } });

    if (!note) return null;

    return PrismaNoteMapper.toDomain(note);
  }
  async delete(id: string): Promise<void> {
    await this.prisma.note.delete({ where: { id } });
  }
  async save(note: Note): Promise<void> {
    const noteRaw = PrismaNoteMapper.toPrisma(note);

    await this.prisma.note.update({
      where: { id: noteRaw.id },
      data: noteRaw,
    });
  }
  async findManyByUserId(
    userId: string,
    page: number,
    perPage: number,
  ): Promise<Note[]> {
    const notes = await this.prisma.note.findMany({
      where: { userId },
      take: perPage,
      skip: (page - 1) * perPage,
    });

    return notes.map((note) => PrismaNoteMapper.toDomain(note));
  }
}
