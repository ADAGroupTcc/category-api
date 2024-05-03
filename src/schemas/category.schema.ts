import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from "mongoose";
import { SubCategories } from './subcategory.schema';

export type CategoryDocument = mongoose.HydratedDocument<Categories>;

@Schema({
  autoCreate: true,
  _id: true
})
export class Categories {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  _id: string;

  @Prop({ type: String, required: true, unique: true })
  name: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'SubCategories', default: [] })
  subCategories: SubCategories[];

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

export const CategoriesSchema = SchemaFactory.createForClass(Categories);