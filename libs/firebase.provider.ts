import { Logger, Provider } from '@nestjs/common'
import { getFirebaseServiceToken, getFirebaseToken } from './firebase.utils'
import { app } from 'firebase-admin'
import { FirebaseFeatureOptions } from './interfaces/firebase.feature.inteface'

const logger = new Logger('FirebaseProvider')

export function createFirebaseAuthProvider(appName?: string): Provider {
  return {
    provide: getFirebaseServiceToken('auth', appName),
    useFactory(app: app.App) {
      return app.auth()
    },
    inject: [getFirebaseToken(appName)],
  }
}

export function createFirebaseRealtimeDatabaseProvider(
  appName?: string,
  databaseURL?: string,
): Provider {
  return {
    provide: getFirebaseServiceToken('database', appName),
    useFactory(app: app.App) {
      return app.database(databaseURL)
    },
    inject: [getFirebaseToken(appName)],
  }
}

export function createFirebaseFirestoreProvider(appName?: string): Provider {
  return {
    provide: getFirebaseServiceToken('firestore', appName),
    useFactory(app: app.App) {
      return app.firestore()
    },
    inject: [getFirebaseToken(appName)],
  }
}
export function createFirebaseProviders(
  appName?: string,
  services: FirebaseFeatureOptions = {},
): Provider[] {
  return Object.entries(services).map(([service, config]) => {
    switch (service) {
      case 'auth':
        return createFirebaseAuthProvider(appName)
      case 'database':
        return createFirebaseRealtimeDatabaseProvider(
          appName,
          typeof config === 'object' ? config.url : undefined,
        )
      case 'firestore':
        return createFirebaseFirestoreProvider(appName)
      default:
        logger.error(`Service ${service} is not supported`)
        throw new Error(`Service ${service} is not supported`)
    }
  })
}
