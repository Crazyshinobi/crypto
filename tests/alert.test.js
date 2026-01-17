const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../src/app");
const Alert = require("../src/models/Alert");

let mongoServer;

beforeAll(async () => {
  await mongoose.disconnect();
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});


describe("Alert API Endpoints", () => {
  it("should create a new alert", async () => {
    const res = await request(app)
      .post("/api/v1/alerts")
      .send({ symbol: "BTC", targetPrice: 100000 });

    expect(res.statusCode).toEqual(201);
    expect(res.body.data.symbol).toBe("BTC");
    expect(res.body.data.status).toBe("PENDING");
  });

  it("should list all alerts", async () => {
    const res = await request(app).get("/api/v1/alerts");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });
});
