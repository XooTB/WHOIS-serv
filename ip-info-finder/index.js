const axios = require("axios");
const translate = require("@vitalets/google-translate-api");

const convertToLanguage = async (data, lang, currencyStatus) => {
  const input =
    data.as +
    " / " +
    data.city +
    " / " +
    data.continent +
    " / " +
    data.country +
    " / " +
    data.org +
    " / " +
    data.regionName;
  const res = await translate(input, { to: lang });
  try {
    const output = res.text.split(" / ");
    data.as = output[0];
    data.continent = output[1];
    data.city = output[2];
    if (!currencyStatus) data.country = output[3];
    data.org = output[4];
    data.regionName = output[5];
  } catch (err) {
    console.error(err);
  }
  return data;
};

const sendRequest = async (ip, lang, currencyStatus = false) => {
  const response = await axios({
    method: "get",
    url:
      "http://ip-api.com/json/" +
      String(ip) +
      "?fields=66842623",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (lang === "en") {
    return response.data;
  } else {
    const res = convertToLanguage(response.data, lang, currencyStatus);

    return res;
  }
};
exports.getIPInfo = async (ip, lang = "en") => {
  let data = await sendRequest(ip, lang);
  return data;
};

exports.getIPInfo.currency = async (ip, lang = "en") => {
  const getCurrencyDetail = require("./currency");
  let data = await sendRequest(ip, lang, true);
  data.currencyDetail = await getCurrencyDetail(data.country);
  return data;
};

exports.getIPInfo.location = async (ip, lang = "en") => {
  const getLocationDetail = require("./location");
  let data = await sendRequest(ip, lang, true);
  data.location = await getLocationDetail(data.lat,data.lon);
  return data;
};

exports.getIPInfo.weather = async (ip, lang = "en") => {
  const getWeatherDetail = require("./weather");
  let data = await sendRequest(ip, lang, true);
  data.weather = await getWeatherDetail(data.city);
  return data;
};

exports.getIPInfo.covid = async (ip, lang = "en") => {
  const getCovid = require("./covid");
  let data = await sendRequest(ip, lang, true);
  data.covid = await getCovid(data.country);
  return data;
};