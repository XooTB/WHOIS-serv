import { isIP } from "net";
import dns from "dns";
const dnsPromises = dns.promises;

const parentTest = async (data) => {
  let parent = {};
  const info = data.gtld.authority;
  const additional = data.gtld.additional ? data.gtld.additional : null;
  parent = await Promise.all(
    info.map((i) => {
      return validate(i, additional);
    })
  );
  return parent;
};

const validate = async (authority, additional) => {
  const obj = {};
  obj.name = authority[4];
  obj.ttl = authority[1];
  obj.type = authority[3];
  obj.ip = await dnsPromises.lookup(authority[4]);

  if (!additional) {
    obj.glue = false;
    return obj;
  } else {
    obj.glue = additional.some((i) => {
      if (i.domain === obj.name && isIP(i.value)) {
        return true;
      } else {
        return false;
      }
    });
  }
  return obj;
};

export default parentTest;
