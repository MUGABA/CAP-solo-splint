const User = require("../models/User");
const request = require("supertest");
const mongoose = require("mongoose");

let server;
describe("Testing auth routes", () => {
  beforeEach(async () => {
    server = require("../app.js").server;
  });

  afterEach(async () => {
    await server.close();
    await User.deleteMany({});
  });

  describe("/auth/register", () => {
    beforeEach(async () => {
      await User.create({
        username: "Rashid",
        email: "rashid@gmail.com",
        password: "Rashid123",
      });
    });
    let username, email, password;

    const execute1 = async () =>
      await request(server)
        .post("/auth/register")
        .send({ username, email, password });

    it("It should be return an error if the email already exists", async () => {
      username = "Hatchways";
      email = "rashid@gmail.com";
      password = "Rashid123";
      res = await execute1();

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error");
      expect(res.body.error).toBe("A user with that email already exists");
    });

    it("It should be return an error if the username already exists", async () => {
      username = "Rashid";
      email = "hatchways@gmail.com";
      password = "Rashid123";
      res = await execute1();

      expect(res.status).toBe(400);
      expect(res.body).toHaveProperty("error");
      expect(res.body.error).toBe("A user with that username already exists");
    });

    it("It should create a user if they do not exist", async () => {
      username = "Hatchways";
      email = "hatchways@gmail.com";
      password = "Hatchways";
      res = await execute1();

      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty("success");
      expect(res.body.success.user.username).toBe("Hatchways");
    });
  });

  describe("/auth/Login", () => {
    beforeEach(async () => {
      await User.create({
        username: "Rashid",
        email: "rashid@gmail.com",
        password: "Rashid123",
      });
    });
    let email, password;

    const execute1 = async () =>
      await request(server).post("/auth/login").send({ email, password });

    it("It should be return an error 401 if the email does not exist", async () => {
      email = "rashid1@gmail.com";
      password = "Rashid123";
      res = await execute1();

      expect(res.status).toBe(401);
      expect(res.body).toHaveProperty("error");
      expect(res.body.error).toBe("Invalid email or password");
    });

    it("It should login a user successfully with the right cridentials", async () => {
      email = "rashid@gmail.com";
      password = "Rashid123";
      res = await execute1();

      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("success");
      expect(res.body.success.user.username).toBe("Rashid");
    });
  });

  describe("/auth/user", () => {
    beforeEach(async () => {
      await User.create({
        username: "Rashid",
        email: "rashid@gmail.com",
        password: "Rashid123",
      });

      await request(server)
        .post("/auth/login")
        .send({ email: "rashid@gmail.com", password: "Rashid123" });
    });

    const execute1 = async () =>
      await request(server)
        .post("/auth/login")
        .send({ email: "rashid@gmail.com", password: "Rashid123" });

    const execute2 = async () => await request(server).get("/auth/user");

    it("It should be return an error 401 if no valid user is logged in", async () => {
      res = await execute2();
      expect(res.status).toBe(401);
      expect(res.body.message).toBe("No token, authorization denied");
    });

    // it("It should return user credentials if the user is logged in already", async () => {
    //   await execute1();

    //   res = await execute2();

    //   expect(res.status).toBe(200);
    //   expect(res.body.message).toBe("No token, authorization denied");
    // });
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
