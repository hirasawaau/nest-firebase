import { DynamicModule, Module } from '@nestjs/common'
import { FirebaseCoreModule } from './firebase-core.module'
import {
  FirebaseModuleAsyncOptions,
  FirebaseModuleOptions,
} from './interfaces/firebase.options.interface'
import { createFirebaseProviders } from './firebase.provider'
import { FirebaseFeatureOptions } from './interfaces/firebase.feature.inteface'

@Module({})
export class FirebaseModule {
  static forRoot(opts: FirebaseModuleOptions): DynamicModule {
    return {
      module: FirebaseModule,
      imports: [FirebaseCoreModule.forRoot(opts)],
    }
  }

  static forRootAsync(opts: FirebaseModuleAsyncOptions): DynamicModule {
    return {
      module: FirebaseModule,
      imports: [FirebaseCoreModule.forRootAsync(opts)],
    }
  }

  static forFeature(
    services: FirebaseFeatureOptions,
    appName?: string,
  ): DynamicModule {
    const providers = createFirebaseProviders(appName, services)
    return {
      module: FirebaseModule,
      providers,
      exports: providers,
    }
  }
}
