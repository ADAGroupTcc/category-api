import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from "mongoose";

export type SubCategoriesDocument = mongoose.HydratedDocument<SubCategories>;

@Schema({
  autoCreate: true,
  _id: true
})
export class SubCategories {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  _id: string;

  @Prop({ type: String, required: true, unique: true })
  name: string;

  @Prop({ type: String })
  description?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  creatorId: string

  @Prop({ type: Number, default: 1 })
  classification: number

  @Prop({
    default: new Date()
  })
  createdAt: Date

  @Prop({
    default: new Date()
  })
  updatedAt: Date
}

export const SubCategoriesSchema = SchemaFactory.createForClass(SubCategories);