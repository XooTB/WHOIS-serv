import dig from "node-dig-dns";

const options = {
  raw: false,
};

// Main Function
const Collect = async (domain) => {
  const parsedInfo = {
    nsGlue: {},
  };
  const parentInfo = await dig(["@a.gtld-servers.net", domain, "ANY"], options)
    .then((info) => {
      return info;
    })
    .catch((err) => {
      return null;
    });
  if (!parentInfo) {
    return false;
  }
  parsedInfo.gtld = parseGtldInfo(parentInfo);
  const authority = parsedInfo.gtld.authority;
  if (!authority) {
    return false;
  }

  // Loop

  for (let i in authority) {
    const nsDomain = authority[i][4];
    const nsInfo = await getNsInfo(nsDomain, domain, "ANY");
    const data = nsInfo.answer;

    if (!data) {
      continue;
    }
    const types = data.map((i) => {
      return i.type;
    });
    parsedInfo.nsGlue[`${nsDomain}`] = nsInfo.additional;

    // NS Checking and Parsing
    if (!types.includes("NS")) {
      let data = await getNsInfo(nsDomain, domain, "NS");
      parseInfo(parsedInfo, data.answer, nsDomain, "nsRecords", "NS");
    } else {
      parseInfo(parsedInfo, data, nsDomain, "nsRecords", "NS");
    }

    // A Record Checking and Parsing
    if (!types.includes("A")) {
      let data = await getNsInfo(nsDomain, domain, "A");
      parseInfo(parsedInfo, data.answer, nsDomain, "nsARecords", "A");
    } else {
      parseInfo(parsedInfo, data, nsDomain, "nsARecords", "A");
    }

    // MX Records Checking and Parsing
    if (!types.includes("MX")) {
      let data = await getNsInfo(nsDomain, domain, "MX");
      parseInfo(parsedInfo, data.answer, nsDomain, "nsMXRecords", "MX");
    } else {
      parseInfo(parsedInfo, data, nsDomain, "nsMXRecords", "MX");
    }

    // SOA Records Checking and Parsing
    if (!types.includes("SOA")) {
      let data = await getNsInfo(nsDomain, domain, "SOA");
      parseInfo(parsedInfo, data.answer, nsDomain, "nsSOARecords", "SOA");
    } else {
      parseInfo(parsedInfo, data, nsDomain, "nsSOARecords", "SOA");
    }
  }

  const www = await dig([`www.${domain}`])
    .then((info) => {
      return info;
    })
    .catch((err) => console.log(err));

  if (www.answer) {
    parsedInfo.wwwRecords = www.answer;
  } else {
    parsedInfo.wwwRecords = false;
  }

  return parsedInfo;
};

// Main Function

// Break in the Code
// Break in the Code

//Other Fuctions

// Main Parse, Organizes the Data from the Name Servers.
const parseInfo = (Obj, data, nsDomain, type, filter) => {
  const category = Obj[`${type}`];
  // console.log(data);
  const app = parsea(data, nsDomain, filter);
  if (category) {
    Object.assign(category, app);
  } else {
    Obj[`${type}`] = app;
  }
};

// Sub-Parse Filters the Data from the Namserver Data
const parsea = (data, nsDomain, filter) => {
  // console.log(data);
  const obj = {};
  obj[`${nsDomain}`] = data.filter((i) => i.type === filter);
  return obj;
};

// Parses the GTLD Info
const parseGtldInfo = (data) => {
  const gtld = {};
  gtld.additional = data.additional ? data.additional : null;
  gtld.authority = data.authority ? data.authority : null;
  return gtld;
};

// Fetches the NamserverInfo
const getNsInfo = async (ns, domain, type) => {
  const nsInfo = await dig([`@${ns}`, domain, type], options)
    .then((info) => {
      return info;
    })
    .catch((err) => false);
  return nsInfo;
};

// Other Fuctions

//Exporting
export default Collect;
