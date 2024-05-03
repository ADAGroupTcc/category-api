import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesModule } from './categories/categories.module';
import { HealthController } from './health/health.controller';
import { SubCategoriesModule } from './sub-categories/sub-categories.module';
import { localDbOptions, serverDbOptions } from './utils/option.connect';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL, process.env.IS_LOCAL_DATABASE ? localDbOptions : serverDbOptions),
    CategoriesModule,
    SubCategoriesModule,
  ],
  controllers: [HealthController],
})
export class AppModule {
}
