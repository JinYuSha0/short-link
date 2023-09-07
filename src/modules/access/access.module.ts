import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccessSchema } from './schemas/access.schema';
import { AccessService } from './access.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Access',
        schema: AccessSchema,
      },
    ]),
  ],
  providers: [AccessService],
  exports: [AccessService],
})
export class AccessModule {}
