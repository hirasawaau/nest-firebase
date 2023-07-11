import { Injectable } from '@nestjs/common'
import { Auth } from 'firebase-admin/auth'
import { InjectFirebaseService } from '../../../libs'

@Injectable()
export class UserService {
  constructor(
    @InjectFirebaseService('auth') private readonly firebaseAuthService: Auth,
  ) {}

  async getUser(uid: string) {
    const user = await this.firebaseAuthService.getUser(uid)
    return user
  }
}
