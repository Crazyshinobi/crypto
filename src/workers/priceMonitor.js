const axios = require("axios");
const Alert = require("../models/Alert");

const monitorPrices = async () => {
  try {
    console.log("Monitoring Price for Active Alerts after 3s")
    const activeAlerts = await Alert.find({ status: "PENDING" });
    if (activeAlerts.length === 0) return;

    const symbols = [...new Set(activeAlerts.map((a) => a.symbol))].join(",");

    const response = await axios.get(
      `https://api.freecryptoapi.com/v1/getData?symbol=${symbols}`,
      {
        headers: { Authorization: `Bearer ${process.env.CRYPTO_API_KEY}` },
      },
    );

    const prices = response.data.symbols; 

    for (const alert of activeAlerts) {
      const liveData = prices.find((p) => p.symbol === alert.symbol);
      if (!liveData) continue;

      const currentPrice = parseFloat(liveData.last);

      if (currentPrice >= alert.targetPrice) {
        console.log(
          `ALERT TRIGGERED: ${alert.symbol} reached ${currentPrice} (Target: ${alert.targetPrice})`,
        );

        alert.status = "TRIGGERED";
        await alert.save();
      }
    }
  } catch (error) {
    console.error("Monitor Error:", error.message);
  }
};

const startPriceMonitor = () => {
  setInterval(monitorPrices, 30000);
};

module.exports = { startPriceMonitor };
