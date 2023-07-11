import { Test } from "@nestjs/testing";
import { AppModule } from "./src/app.module";
import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { UserRecord } from "firebase-admin/auth";
import {
  FastifyAdapter,
  NestFastifyApplication,
} from "@nestjs/platform-fastify";

describe("App", () => {
  let app: NestFastifyApplication;
  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication<NestFastifyApplication>(
      new FastifyAdapter()
    );

    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  it("should be defined", () => {
    expect(app).toBeDefined();
  });

  describe("Auth", () => {
    it("should connect to firebase and return correct user", async () => {
      // You can change this to your own uid and email
      const uid = "jFxYrgBOtuNdp6N5iRwsP0uJlrM2";
      const email = "test@test.com";
      const res = await app.inject({
        method: "GET",
        url: `/users/${uid}`,
      });
      const payload = JSON.parse(res.payload) as UserRecord;
      expect(res.statusCode).toEqual(200);
      expect(payload.email).toEqual(email);
      expect(payload.uid).toEqual(uid);
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
