import { getIPInfo } from "../ip-info-finder/index.js";

const ipInfo = async (ip) => {
  const inf = await getIPInfo(ip)
    .then((data) => {
      return data;
    })
    .catch((err) => console.log(err));
  return inf;
};

export default ipInfo;
