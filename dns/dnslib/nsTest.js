import { isIP } from "net";

const nsTest = (data) => {
  const testResults = {};
  const nsGlue = data.nsGlue;
  const nsRecords = data.nsRecords;
  if (!nsRecords) {
    return "No Namserver was Reported";
  }
  const nsKeys = Object.keys(nsRecords);
  nsKeys.forEach((key) => {
    testResults[key] = validate(nsRecords[key], nsGlue[key]);
  });
  return testResults;
};

const validate = (nsRecord, nsGlue) => {
  const obj = nsRecord.map((i) => {
    const fit = {};
    fit.name = i.value;
    fit.ttl = i.ttl;
    fit.domain = i.domain;
    fit.ip = getIp(i.value, nsGlue);
    fit.glue = ipCheck(i.value, nsGlue);
    return fit;
  });
  return obj;
};

const ipCheck = (domain, arr) => {
  if (arr) {
    return arr.some((i) => {
      if (i.domain === domain && isIP(i.value)) {
        return true;
      } else {
        return false;
      }
    });
  } else {
    return false;
  }
};

const getIp = (domain, arr) => {
  for (let i in arr) {
    if (arr[i].domain === domain) {
      return arr[i].value;
    }
  }
  return false;
};
export default nsTest;
