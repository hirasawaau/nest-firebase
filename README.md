# nest-firebase

nest.js' wrapper for `firebase-admin-sdk`

## Installation

```bash
# pnpm & npm whatever you want
$ pnpm i nest-firebase
```

## Usage

### Register Module

```ts
// app.module.ts
import { Module } from '@nestjs/common';
import { FirebaseModule } from 'nest-firebase';

@Module({
  imports: [FirebaseModule.forRoot({
    /// firebase configuration see https://firebase.google.com/docs/admin/setup#initialize-sdk
  })]
})
```

### Inject into service

#### Register to module

```ts
// <your-module>.module.ts
import { Module } from '@nestjs/common';
import { FirebaseModule } from 'nest-firebase';
@Module({
  imports: [
    FirebaseModule.forFeature({
      auth: true,
      // has other options like firestore, database etc.
    }),

  ],
  ...
})
export class UserModule {}
```

#### Inject into service

```ts
// <your-module>.service.ts
import { Injectable } from '@nestjs/common'
import { Auth } from 'firebase-admin/auth'

import { InjectFirebaseService } from 'nest-firebase'

@Injectable()
export class UserService {
  constructor(
    @InjectFirebaseService('auth') private readonly firebaseAuthService: Auth,
  ) {}

  // your services
}
```

## Typing injected service

```ts
import { Auth } from 'firebase-admin/auth'
import { Database } from 'firebase-admin/database'
import { Firestore } from 'firebase-admin/firestore'
import { InjectFirebaseService } from 'nest-firebase'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ExampleService {
  constructor(
    // Firebase Authentication
    @InjectFirebaseService('auth')
    private readonly firebaseAuthService: Auth,
    // Firebase Realtime Database
    @InjectFirebaseService('database')
    private readonly firebaseDatabaseService: Database,
    // Firebase Cloud Firestore
    @InjectFirebaseService('firestore')
    private readonly firebaseFirestoreService: Firestore,
  ) {}

  // your services
}
```

## Testing

In an integration test, I provide a test case that use in my firebase project (uid,email) if you want to test it, you can provide it as a environment variable

```bash
$ UID_TEST=<your-uid> EMAIL_TEST=<your-email> pnpm run test:e2e
```

Don't forget to provide your firebase configuration in `tests/src/firebase.config.ts` And don't push it to this repository.

BTW, now the integration test is only for `auth` (Firebase Authentication) I can't not guarantee that other services will work properly.

## Contributing

Sure, you can submit pull request or open an issue for requesting a feature.

## Environment Variables (for testing)

```env
FIREBASE_PROJECT_ID=
FIREBASE_PRIVATE_KEY=
FIREBASE_CLIENT_EMAIL=
UID_TEST=
EMAIL_TEST=
```
