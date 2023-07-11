import { DEFAULT_FIREBASE_APP_NAME } from './firebase.const'
import { FirebaseServiceName } from './firebase.enum'

export const getFirebaseServiceToken = (
  service: FirebaseServiceName,
  appName?: string,
) => {
  if (appName) {
    return `${appName}/${service}`
  }
  return service
}

export const getFirebaseToken = (appName?: string) =>
  appName && appName !== DEFAULT_FIREBASE_APP_NAME
    ? `Firebase_${appName}`
    : DEFAULT_FIREBASE_APP_NAME
