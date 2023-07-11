import { Module } from '@nestjs/common'
import { FirebaseModule } from '../../../libs'
import { UserService } from './user.service'
import { UserController } from './user.controller'

@Module({
  imports: [
    FirebaseModule.forFeature({
      auth: true,
    }),
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
