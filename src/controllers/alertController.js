const Alert = require("../models/Alert");

exports.createAlert = async (req, res) => {
  try {
    const { symbol, targetPrice } = req.body;
    const alert = await Alert.create({ symbol, targetPrice });
    res.status(201).json({ success: true, data: alert });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getAlerts = async (req, res) => {
  try {
    const alerts = await Alert.find();
    res.status(200).json({ success: true, data: alerts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteAlert = async (req, res) => {
  try {
    await Alert.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Alert deleted" });
  } catch (error) {
    res.status(404).json({ success: false, message: "Alert not found" });
  }
};
