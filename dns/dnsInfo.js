import Collect from "./dnslib/collect.js";
import parentTest from "./dnslib/parentNsTest.js";
import nsTest from "./dnslib/nsTest.js";
import soaTest from "./dnslib/soaTest.js";
import mxTest from "./dnslib/mxTest.js";
import wwwTest from "./dnslib/wwwTest.js";

const dns = async (domain) => {
  const results = {};
  const data = await Collect(domain);
  if (data) {
    results.parent = await parentTest(data);
    results.nameServer = nsTest(data);
    results.Soa = soaTest(data);
    results.mx = mxTest(data);
    results.www = wwwTest(data);
  }

  return results;
};
export default dns;
