export type FirebaseFeatureOptions = Partial<{
  auth: true
  firestore: true
  database: true | { url?: string }
}>
