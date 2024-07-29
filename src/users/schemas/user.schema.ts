import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Pokemon } from '../../pokemon/schemas/pokemon.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  _id: mongoose.Schema.Types.ObjectId;

  @Prop({ unique: true, required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: [{ type: mongoose.Schema.Types.Number, ref: 'Pokemon' }] })
  favorite: Pokemon[];
}

export const UserSchema = SchemaFactory.createForClass(User)