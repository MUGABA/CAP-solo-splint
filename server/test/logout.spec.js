const request = require("supertest");

let server;
describe("Testing /auth/logout", () => {
  beforeEach(async () => {
    server = require("../app.js").server;
  });

  afterEach(async () => {
    await server.close();
  });

  describe("/auth/logout", () => {
    const execute2 = async () => await request(server).post("/auth/logout");

    it("It should successfully clear cookies and logout", async () => {
      res = await execute2();

      expect(res.status).toBe(200);
      expect(res.body.message).toBe("You have successfully logged out");
    });
  });
});
