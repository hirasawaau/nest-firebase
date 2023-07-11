import { ModuleMetadata, Type } from '@nestjs/common'
import { AppOptions } from 'firebase-admin/app'

export interface FirebaseModuleOptions extends AppOptions {
  appName?: string
}

export interface FirebaseModuleOptionsFactory {
  createFirebaseOptions():
    | Promise<FirebaseModuleOptions>
    | FirebaseModuleOptions
}

export interface FirebaseModuleAsyncOptions
  extends Pick<ModuleMetadata, 'imports'> {
  useClass?: Type<FirebaseModuleOptionsFactory>
  useExisting?: Type<FirebaseModuleOptionsFactory>
  useFactory?: (
    ...args: any[]
  ) => Promise<FirebaseModuleOptions> | FirebaseModuleOptions
  inject?: any[]
  appName?: string
}
