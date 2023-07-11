import { app } from 'firebase-admin'

export type FirebaseServiceName = keyof Pick<
  app.App,
  'auth' | 'firestore' | 'database'
>
