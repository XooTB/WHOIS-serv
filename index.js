import express from "express";
import cors from "cors";
import whois from "./common/lib2.js";
import ipInfo from "./common/lib.js";
import dns from "./dns/dnsInfo.js";

const app = express();
const port = process.env.PORT || 4000;

app.set("trust proxy", true);

app.get("/api/whois/:domain", cors(), async (req, res) => {
  let data = await whois(req.params.domain);
  res.send(data);
});

app.get("/api/myip/info", cors(), async (req, res) => {
  const rIP = req.ip || req.socket.remoteAddress;
  const ip = rIP.replace(/([a-z:])/g, "");
  let data = await ipInfo(ip);
  res.send(data);
});

app.get("/api/dns/:domain", cors(), async (req, res) => {
  let data = await dns(req.params.domain);
  res.send(data);
});

app.listen(port, () => {
  console.log("listening on Port:4000");
});
