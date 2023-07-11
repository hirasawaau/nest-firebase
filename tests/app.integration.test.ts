import { Test } from '@nestjs/testing'
import { AppModule } from './src/app.module'
import { UserRecord } from 'firebase-admin/auth'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'
import { HttpStatus } from '@nestjs/common'

const UID = process.env.UID_TEST ?? 'jFxYrgBOtuNdp6N5iRwsP0uJlrM2'
const EMAIL = process.env.EMAIL_TEST ?? 'test@test.com'

describe('App', () => {
  let app: NestFastifyApplication
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = module.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter(),
    )

    await app.init()
    await app.getHttpAdapter().getInstance().ready()
  })

  it('should be defined', () => {
    expect(app).toBeDefined()
  })

  describe('Auth', () => {
    it('should connect to firebase and return correct user', async () => {
      const res = await app.inject({
        method: 'GET',
        url: `/users/${UID}`,
      })
      const payload = JSON.parse(res.payload) as UserRecord
      expect(res.statusCode).toEqual(HttpStatus.OK)
      expect(payload.email).toEqual(EMAIL)
      expect(payload.uid).toEqual(UID)
    })
  })

  afterAll(async () => {
    await app.close()
  })
})
