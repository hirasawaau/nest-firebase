import { Inject } from '@nestjs/common'
import { FirebaseServiceName } from './firebase.enum'
import { getFirebaseServiceToken, getFirebaseToken } from './firebase.utils'

export const InjectFirebaseService = (
  service: FirebaseServiceName,
  appName?: string,
) => Inject(getFirebaseServiceToken(service, appName))

export const InjectFirebase = (appName?: string) =>
  Inject(getFirebaseToken(appName))
