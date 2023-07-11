import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { FirebaseModuleOptions, FirebaseModuleOptionsFactory } from '../../libs'
import { credential } from 'firebase-admin'

@Injectable()
export class FirebaseConfigService implements FirebaseModuleOptionsFactory {
  private readonly logger = new Logger(FirebaseConfigService.name)
  constructor(private readonly configService: ConfigService) {}

  createFirebaseOptions():
    | FirebaseModuleOptions
    | Promise<FirebaseModuleOptions> {
    this.logger.debug({
      projectId: this.configService.get('FIREBASE_PROJECT_ID'),
      clientEmail: this.configService.get('FIREBASE_CLIENT_EMAIL'),
      privateKey: this.configService.get('FIREBASE_PRIVATE_KEY'),
    })
    return {
      credential: credential.cert({
        projectId: this.configService.get('FIREBASE_PROJECT_ID'),
        clientEmail: this.configService.get('FIREBASE_CLIENT_EMAIL'),
        privateKey: this.configService
          .get('FIREBASE_PRIVATE_KEY')
          .replace(/\\n/g, '\n'),
      }),
    }
  }
}
