import { Module } from '@nestjs/common'
import { FirebaseModule } from '../../libs'
import { UserModule } from './users/user.module'
import { FirebaseConfigService } from './firebase.config'
import { ConfigModule } from '@nestjs/config'
import { configuration } from './config'

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    FirebaseModule.forRootAsync({
      useClass: FirebaseConfigService,
    }),
    UserModule,
  ],
})
export class AppModule {}
