import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
} from '@nestjs/common';
import { CreateNoteUseCase } from 'src/modules/note/useCases/createNoteUseCase/createNoteUseCase';
import { AuthenticatedRequestModel } from '../auth/models/authenticatedRequestModel';
import { CreateNoteBody } from './dtos/CreateNoteBody';
import { NoteViewModel } from './viewModel/noteViewModel';
import { EditNoteUseCase } from 'src/modules/note/useCases/editNoteUseCase/editNoteUseCase';
import { EditNoteBody } from './dtos/EditNoteBody';
import { DeleteNoteUseCase } from 'src/modules/note/useCases/deleteNoteUseCase/deleteNoteUseCase';
import { GetNoteUseCase } from 'src/modules/note/useCases/getNoteUseCase/getNoteUseCase';
import { GetManyNoteUseCase } from 'src/modules/note/useCases/getManyUseCase/getManyUseCase';

@Controller('notes')
export class NoteController {
  constructor(
    private createNoteUseCase: CreateNoteUseCase,
    private editNoteUseCase: EditNoteUseCase,
    private deleteNoteUseCase: DeleteNoteUseCase,
    private getNoteUseCase: GetNoteUseCase,
    private getManyNoteUseCase: GetManyNoteUseCase,
  ) {}

  @Post()
  async createNote(
    @Request() request: AuthenticatedRequestModel,
    @Body() body: CreateNoteBody,
  ) {
    const { title, description } = body;
    const note = await this.createNoteUseCase.execute({
      title,
      userId: request.user.id,
      description,
    });

    return NoteViewModel.toHTTP(note);
  }

  @Put(':id')
  async editNote(
    @Request() request: AuthenticatedRequestModel,
    @Body() body: EditNoteBody,
    @Param('id') noteId: string,
  ) {
    const { title, description } = body;
    await this.editNoteUseCase.execute({
      noteId,
      title,
      userId: request.user.id,
      description,
    });
  }

  @Delete(':id')
  async deleteNote(
    @Request() request: AuthenticatedRequestModel,
    @Param('id') noteId: string,
  ) {
    await this.deleteNoteUseCase.execute({
      noteId,
      userId: request.user.id,
    });
  }

  @Get(':id')
  async getNote(
    @Request() request: AuthenticatedRequestModel,
    @Param('id') noteId: string,
  ) {
    const note = await this.getNoteUseCase.execute({
      noteId,
      userId: request.user.id,
    });

    return NoteViewModel.toHTTP(note);
  }

  @Get()
  async getManyNotes(
    @Request() request: AuthenticatedRequestModel,
    @Query('page') page: string,
    @Query('perPage') perPage: string,
  ) {
    const notes = await this.getManyNoteUseCase.execute({
      userId: request.user.id,
      page,
      perPage,
    });

    return notes.map((note) => NoteViewModel.toHTTP(note));
  }
}
