const express = require("express");
const orgService = require("../services/orgServices");
const authenticateJWT = require("../middleware/auth");
const router = express.Router();

router.post("/register", authenticateJWT, async (req, res) => {
  try {
    const response = await orgService.registerOrg(req, res);
    res
      .status(response.status)
      .json({ message: response.message, data: response.data });
  } catch (error) {
    res.status(500).json({ status: 500, message: "Internal server error" });
  }
});

router.get("/get_all_org", async (req, res) => {
  try {
    const response = await orgService.getAllOrg(req, res);
    res
      .status(response.status)
      .json({ message: response.message, data: response.data });
  } catch (error) {
    res.status(500).json({ status: 500, message: "Internal server error" });
  }
});

router.get("/get_org_by_id", async (req, res) => {
  const { Id } = req.params;
  try {
    const response = await orgService.getAllOrg(Id);
    res
      .status(response.status)
      .json({ message: response.message, data: response.data });
  } catch (error) {
    res.status(500).json({ status: 500, message: "Internal server error" });
  }
});

router.get("/get_org_by_userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const response = await orgService.getAllOrg(userId);
    res
      .status(response.status)
      .json({ message: response.message, data: response.data });
  } catch (error) {
    res.status(500).json({ status: 500, message: "Internal server error" });
  }
});

module.exports = router;
