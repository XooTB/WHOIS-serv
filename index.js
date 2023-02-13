import express from "express";
import cors from "cors";
import whois from "./common/lib2.js";
import ipInfo from "./common/lib.js";
import dns from "./dns/dnsInfo.js";

const app = express();
const port = process.env.PORT || 4000;

app.set("trust proxy", true);
app.use(cors());

app.get("/api/whois/:domain", async (req, res) => {
  const domain = req.params.domain;
  try {
    let data = await whois(domain);
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
});

app.get("/api/myip/info", async (req, res) => {
  const rIP = req.ip || req.socket.remoteAddress;
  const ip = rIP.replace(/([a-z:])/g, "");
  try {
    let data = await ipInfo(ip);
    res.status(200).json(data);
  } catch (err) {
    res.status(401).json({
      error: err.message,
    });
  }
});

app.get("/api/dns/:domain", async (req, res) => {
  const domain = req.params.domain;
  try {
    let data = await dns(domain);
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
});

app.listen(port, () => {
  console.log(`listening on port: ${port}`);
});
