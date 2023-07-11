import { Controller, Get, Param } from '@nestjs/common'
import { InjectFirebaseService } from '../../../libs'
import { UserService } from './user.service'

@Controller('users')
export class UserController {
  constructor(private readonly appService: UserService) {}

  @Get(':id')
  async getUsers(@Param('id') uid: string) {
    return this.appService.getUser(uid)
  }
}
