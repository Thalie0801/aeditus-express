import express from "express";
import pino from "pino";

const app = express();
const log = pino();

app.get("/v1/healthz", (_req, res) => {
  res.status(200).json({ ok: true });
});

const port = process.env.PORT || 4000;
app.listen(port, () => log.info({ port }, "orchestrator up"));
