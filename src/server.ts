import express from "express";
import cors from "cors";

import { getObservation } from "./observer";

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (_, res) => {
  res.json({
    status: "Beacon API Online"
  });
});

app.post("/audit", async (req, res) => {
  try {
    const {
      business_name,
      city,
      category
    } = req.body;

    const query =
      `best ${category} ${city}`;

    const observation =
      await getObservation(query);

    res.json({
      benchmark_version: "0.1.0",

      business: {
        name: business_name,
        city,
        category
      },

      observation,

      status: "observation_ready"
    });
  } catch (error) {
    res.status(500).json({
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
    `Beacon API running on ${PORT}`
  );
});
