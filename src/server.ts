import express from "express";
import cors from "cors";

import { getObservation } from "./observer";

const app = express();

app.use(cors());
app.use(express.json());

/*
 * Root Route
 */
app.get("/", (_, res) => {
  res.json({
    status: "Beacon API Online"
  });
});

/*
 * Health Check
 */
app.get("/health", (_, res) => {
  res.json({
    status: "ok",
    service: "Beacon API"
  });
});

/*
 * Test Route
 */
app.get("/test", (_, res) => {
  res.json({
    success: true,
    message: "Beacon API test route working."
  });
});

/*
 * Beacon Audit Endpoint
 */
app.post("/audit", async (req, res) => {
  try {
    const {
      business_name,
      city,
      category
    } = req.body;

    if (
      !business_name ||
      !city ||
      !category
    ) {
      return res.status(400).json({
        error:
          "business_name, city and category are required"
      });
    }

    const query =
      `best ${category} ${city}`;

    const observation =
      await getObservation(query);

    return res.json({
      benchmark_version: "0.1.0",

      status: "observation_ready",

      business: {
        name: business_name,
        city,
        category
      },

      query,

      observation
    });
  } catch (error) {
    return res.status(500).json({
      error:
        error instanceof Error
          ? error.message
          : "Unknown error"
    });
  }
});

const PORT =
  Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log(
    `Beacon API running on port ${PORT}`
  );
});
