import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PokemonDocument = HydratedDocument<Pokemon>;

@Schema()
export class Pokemon {
  @Prop()
  id: number;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  height: number;

  @Prop()
  weight: number;

  @Prop()
  abilities: string[];

  @Prop()
  type: string[];
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
