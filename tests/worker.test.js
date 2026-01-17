const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");
const Alert = require("../src/models/Alert");
const { monitorPrices } = require("../src/workers/priceMonitor");

const mock = new MockAdapter(axios);

describe("Price Monitor Worker Logic", () => {
  it("should change alert status to TRIGGERED when price reaches target", async () => {
    const alert = await Alert.create({
      symbol: "BTC",
      targetPrice: 95000,
      status: "PENDING",
    });

    mock.onGet(/getData/).reply(200, {
      symbols: [{ symbol: "BTC", last: "96000" }],
    });

    await monitorPrices();

    const updatedAlert = await Alert.findById(alert._id);
    expect(updatedAlert.status).toBe("TRIGGERED");
  });
});
