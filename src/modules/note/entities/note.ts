import { Replace } from 'src/utils/replace';

interface NoteProps {
  title: string;
  description: string | null;
  userId: string;
  createdAt: Date;
}

export class Note {
  private props: NoteProps;
  private _id: string;

  constructor(
    props: Replace<
      NoteProps,
      { createdAt?: Date; description?: string | null }
    >,
    id?: string,
  ) {
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      description: props.description ?? null,
    };
    this._id = id ?? crypto.randomUUID();
  }

  get id(): string {
    return this._id;
  }

  get title(): string {
    return this.props.title;
  }

  get description(): string | null {
    return this.props.description;
  }

  get userId(): string {
    return this.props.userId;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  set title(title: string) {
    this.props.title = title;
  }

  set description(description: string | null) {
    this.props.description = description;
  }
}
