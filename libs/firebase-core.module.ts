import {
  DynamicModule,
  Global,
  Inject,
  Module,
  OnApplicationShutdown,
  Provider,
  Type,
} from '@nestjs/common'
import { ModuleRef } from '@nestjs/core'
import { FIREBASE_APP_NAME, FIREBASE_MOUDLE_OPTIONS } from './firebase.const'
import * as admin from 'firebase-admin'
import {
  FirebaseModuleAsyncOptions,
  FirebaseModuleOptions,
  FirebaseModuleOptionsFactory,
} from './interfaces/firebase.options.interface'
import { getFirebaseToken } from './firebase.utils'

@Global()
@Module({})
export class FirebaseCoreModule implements OnApplicationShutdown {
  static forRoot(opts: FirebaseModuleOptions): DynamicModule {
    const firebaseAppName = getFirebaseToken(opts.appName)

    const firebaseAppNameProvider: Provider = {
      provide: FIREBASE_APP_NAME,
      useValue: firebaseAppName,
    }
    const provider: Provider = {
      provide: firebaseAppName,
      useFactory() {
        return admin.initializeApp(opts, firebaseAppName)
      },
    }

    return {
      module: FirebaseCoreModule,
      providers: [provider, firebaseAppNameProvider],
      exports: [provider],
    }
  }

  static forRootAsync(opts: FirebaseModuleAsyncOptions): DynamicModule {
    const firebaseAppName = getFirebaseToken(opts.appName)
    const firebaseAppNameProvider: Provider = {
      provide: FIREBASE_APP_NAME,
      useValue: firebaseAppName,
    }

    const provider: Provider = {
      provide: firebaseAppName,
      useFactory(firebaseOptions: FirebaseModuleOptions) {
        return admin.initializeApp(firebaseOptions, firebaseAppName)
      },
      inject: [FIREBASE_MOUDLE_OPTIONS],
    }

    const asyncProvider = this.createAsyncProviders(opts)

    return {
      module: FirebaseCoreModule,
      providers: [...asyncProvider, provider, firebaseAppNameProvider],
      exports: [provider],
    }
  }

  private static createAsyncProviders(
    options: FirebaseModuleAsyncOptions,
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)]
    }

    if (options.useClass) {
      const { useClass } = options
      return [
        this.createAsyncOptionsProvider(options),
        {
          provide: useClass,
          useClass,
        },
      ]
    }

    return []
  }

  private static createAsyncOptionsProvider(
    options: FirebaseModuleAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: FIREBASE_MOUDLE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      }
    }

    const inject = [
      (options.useClass ||
        options.useExisting) as Type<FirebaseModuleOptionsFactory>,
    ]

    return {
      provide: FIREBASE_MOUDLE_OPTIONS,
      useFactory: async (optionsFactory: FirebaseModuleOptionsFactory) =>
        await optionsFactory.createFirebaseOptions(),
      inject,
    }
  }

  constructor(
    @Inject(FIREBASE_APP_NAME) private readonly firebaseAppName: string,
    private readonly moduleRef: ModuleRef,
  ) {}

  async onApplicationShutdown() {
    const app = this.moduleRef.get<ReturnType<typeof admin.initializeApp>>(
      this.firebaseAppName,
    )

    app && (await app.delete())
  }
}
