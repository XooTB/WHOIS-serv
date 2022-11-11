const soaTest = (data) => {
  const soaResults = {};
  const soa = data.nsSOARecords;
  if (!soa) {
    return false;
  }
  const keys = Object.keys(soa);
  keys.forEach((key) => {
    const info = soa[key];
    if (info == false) {
      soaResults[key] = false;
    } else {
      soaResults[key] = Parse(...info);
    }
  });
  return soaResults;
};

const Parse = (info) => {
  const obj = {};
  const arr = info.value.split(" ");
  const names = [
    "masterNamserver",
    "hostEmail",
    "serial",
    "refresh",
    "retry",
    "expire",
    "ttl",
  ];
  for (let i in arr) {
    obj[names[i]] = arr[i];
  }
  return obj;
};

export default soaTest;
