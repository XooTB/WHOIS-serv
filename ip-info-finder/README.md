# ip-info-finder
[![npm](https://img.shields.io/npm/v/ip-info-finder.svg?style=flat-square)](https://www.npmjs.com/package/ip-info-finder)

![alt text](https://github.com/hamedpa/ip-info/blob/main/img/logo.png?raw=true)


A Package to get more information from IP address such as country, city ,mobile, user proxy or vpn status and etc.
This package support ipv4 and ipv6

</br>
find more data such as 
</br>
Weather </br>
Currency rate </br>
Location (Street,county,...)
</br></br>

## Installation
Install via NPM:

```bash
npm install ip-info-finder

```

## Usage

#### javascript

```javascript

var ipInfo = require("ip-info-finder");

ipInfo.getIPInfo('IP-ADDRESS').then(data => {
    console.log(data);
})
.catch(err => console.log(err));


```

#### TypeScript

```typescript

import * as ipInfo from 'ip-info-finder';

ipInfo.getIPInfo('IP-ADDRESS').then(data => {
    console.log(data);
})
.catch(err => console.log(err));

```

#### Result 
```json
{
  "as": "AS14061 DigitalOcean, LLC",
  "asname": "DIGITALOCEAN-ASN",
  "city": "North Bergen",
  "continent": "North America",
  "continentCode": "NA",
  "country": "United States",
  "countryCode": "US",
  "currency": "USD",
  "district": "",
  "hosting": true,
  "isp": "DigitalOcean, LLC",
  "lat": 40.793,
  "lon": -74.0247,
  "mobile": false,
  "offset": -14400,
  "org": "Digital Ocean",
  "proxy": false,
  "query": "2604:a880:400:d0::1ec5:f001",
  "region": "NJ",
  "regionName": "New Jersey",
  "status": "success",
  "timezone": "America/New_York",
  "zip": "07047"
}

```
## Optional setting

### Location

<p>discover detail of the area from ip like county , city , street , suburb , postcode and so on.</p>

```javascript
ipInfo.getIPInfo.location('IP-ADDRESS').then(data => {
    console.log(data);
})
.catch(err => console.log(err));

```

#### Result

```json
{
  "as": "AS61317 Digital Energy Technologies Ltd.",
  "asname": "ASDETUK",
  "city": "Chicago",
  "continent": "North America",
  "continentCode": "NA",
  "country": "United States",
  "countryCode": "US",
  "currency": "USD",
  "district": "",
  "hosting": true,
  "isp": "Digital Energy Technologies Chile SpA",
  "lat": 41.8764,
  "lon": -87.6133,
  "mobile": false,
  "offset": -18000,
  "org": "Digital Energy Technologies Limited",
  "proxy": true,
  "query": "191.96.97.58",
  "region": "IL",
  "regionName": "Illinois",
  "status": "success",
  "timezone": "America/Chicago",
  "zip": "60602",
  "location": [
    {
      "place_id": 96237677,
      "licence": "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
      "osm_type": "way",
      "osm_id": 24963943,
      "boundingbox": [ "41.8683055", "41.8840815", "-87.6165165", "-87.6101035" ],
      "lat": "41.87602135",
      "lon": "-87.61321885999324",
      "display_name": "Monroe Harbor, 400, East Monroe Street, Loop, Chicago, Cook County, Illinois, 60603, United States",
      "class": "leisure",
      "type": "marina",
      "importance": 0.001,
      "address": {
        "leisure": "Monroe Harbor",
        "house_number": "400",
        "road": "East Monroe Street",
        "suburb": "Loop",
        "city": "Chicago",
        "county": "Cook County",
        "state": "Illinois",
        "postcode": "60603",
        "country": "United States",
        "country_code": "us"
      }
    }
  ]
}
```
### Weather

<p>what's more you can discover climate from IP address</p>

```javascript
ipInfo.getIPInfo.weather('IP-ADDRESS').then(data => {
    console.log(data);
})
.catch(err => console.log(err));

```

#### Result

```json
{
  "as": "AS61317 Digital Energy Technologies Ltd.",
  "asname": "ASDETUK",
  "city": "Chicago",
  "continent": "North America",
  "continentCode": "NA",
  "country": "United States",
  "countryCode": "US",
  "currency": "USD",
  "district": "",
  "hosting": true,
  "isp": "Digital Energy Technologies Chile SpA",
  "lat": 41.8764,
  "lon": -87.6133,
  "mobile": false,
  "offset": -18000,
  "org": "Digital Energy Technologies Limited",
  "proxy": true,
  "query": "191.96.97.58",
  "region": "IL",
  "regionName": "Illinois",
  "status": "success",
  "timezone": "America/Chicago",
  "zip": "60602",
   "weather": {
    "temperature": "28 °C",
    "wind": "17 km/h",
    "description": "Partly cloudy",
    "forecast": [
      { "day": "1", "temperature": "+28 °C", "wind": "13 km/h" },
      { "day": "2", "temperature": "26 °C", "wind": "19 km/h" },
      { "day": "3", "temperature": "+23 °C", "wind": "15 km/h" }
    ]
  }
}
```

### Currency

<p>access latest currency rate from IP this method give you lists of all the available currencies in prettified json format:
</p>

```javascript
ipInfo.getIPInfo.currency('IP-ADDRESS').then(data => {
    console.log(data);
})
.catch(err => console.log(err));


```


#### Result

```json
{
  "as": "AS14061 DigitalOcean, LLC",
  "asname": "DIGITALOCEAN-ASN",
  "city": "North Bergen",
  "continent": "North America",
  "continentCode": "NA",
  "country": "United States",
  "countryCode": "US",
  "currency": "USD",
  "district": "",
  "hosting": true,
  "isp": "DigitalOcean, LLC",
  "lat": 40.793,
  "lon": -74.0247,
  "mobile": false,
  "offset": -14400,
  "org": "Digital Ocean",
  "proxy": false,
  "query": "2604:a880:400:d0::1ec5:f001",
  "region": "NJ",
  "regionName": "New Jersey",
  "status": "success",
  "timezone": "America/New_York",
  "zip": "07047",
  "currencyDetail": {
    "date": "2021-08-30",
    "usd": {
      "aed": 3.67301,
      "afn": 86.12501,
      "all": 103.6936,
      "amd": 493.71,
      "ang": 1.794866,
    }
  }
}
```
### Covid statistics

<p>access most recent Coronavirus statistics from IP.
</p>

```javascript
ipInfo.getIPInfo.covid('IP-ADDRESS').then(data => {
  console.log(data);
})
.catch(err => console.log(err));
```
#### Result

```json
"covid": {
    "country": "USA",
    "cases": 40131681,
    "todayCases": 17582,
    "deaths": 658103,
    "todayDeaths": 193,
    "recovered": 31023726,
    "active": 8449852,
    "critical": 25691,
    "casesPerOneMillion": 120421,
    "deathsPerOneMillion": 1975,
    "totalTests": 584387097,
    "testsPerOneMillion": 1753534
  }
```
### Languages
<p>get result with your language</p>

##### Example 

```javascript
//Arabic 
ipInfo.getIPInfo('IP-ADDRESS','ar').then(data => {
    console.log(data);
})
.catch(err => console.log(err));

//French 
ipInfo.getIPInfo('IP-ADDRESS','fr').then(data => {
    console.log(data);
})
.catch(err => console.log(err));

```
#### Result 

```json
{
  "as": "AS14061 DigitaloCean، LLC",
  "asname": "DIGITALOCEAN-ASN",
  "city": "أمريكا الشمالية",
  "continent": "نورث بيرغن",
  "continentCode": "NA",
  "country": "الولايات المتحدة",
  "countryCode": "US",
  "currency": "USD",
  "district": "",
  "hosting": true,
  "isp": "DigitalOcean, LLC",
  "lat": 40.793,
  "lon": -74.0247,
  "mobile": false,
  "offset": -14400,
  "org": "المحيط الرقمي",
  "proxy": false,
  "query": "2604:a880:400:d0::1ec5:f001",
  "region": "NJ",
  "regionName": "نيو جيرسي",
  "status": "success",
  "timezone": "America/New_York",
  "zip": "07047"
}

```

## License

This project is licensed under the terms of the
MIT license
