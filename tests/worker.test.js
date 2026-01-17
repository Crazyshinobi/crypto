const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const Alert = require("../src/models/Alert");
const { monitorPrices } = require("../src/workers/priceMonitor");

const mock = new MockAdapter(axios);
let mongoServer;

describe("Price Monitor Worker Logic", () => {
  beforeAll(async () => {
    // Ensure clean state before starting
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
    mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
  });

  beforeEach(() => {
    mock.reset(); // Clear previous mock behaviors
  });

  it("should change alert status to TRIGGERED when price reaches target", async () => {
    const alert = await Alert.create({
      symbol: "BTC",
      targetPrice: 95000,
      status: "PENDING",
    });

    // Match exactly how your code calls the API
    mock.onGet(/getData/).reply(200, {
      symbols: [{ symbol: "BTC", last: "96000" }],
    });

    // Execute the logic directly
    await monitorPrices();

    const updatedAlert = await Alert.findById(alert._id);
    expect(updatedAlert.status).toBe("TRIGGERED");
  }, 15000); // 15s timeout just to be safe
});