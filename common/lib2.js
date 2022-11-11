import whoiser from "whoiser";

const whois = async (domain) => {
  const results = await whoiser(domain).catch((err) => console.log(err));
  return results;
};

export default whois;
