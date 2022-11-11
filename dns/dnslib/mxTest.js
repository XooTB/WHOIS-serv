const mxTest = (data) => {
  const mx = data.nsMXRecords;
  const keys = Object.keys(mx);
  const mxResults = {};
  keys.forEach((key) => {
    const info = mx[key];
    if (info != false) {
      mxResults[key] = parse(...info);
    } else {
      mxResults[key] = false;
    }
  });
  return mxResults;
};

const parse = (info) => {
  const obj = {};
  //   console.log(info);
  obj.name = info.domain;
  obj.ttl = info.ttl;
  obj.priority = info.value.priority;
  obj.server = info.value.server;
  return obj;
};
export default mxTest;
