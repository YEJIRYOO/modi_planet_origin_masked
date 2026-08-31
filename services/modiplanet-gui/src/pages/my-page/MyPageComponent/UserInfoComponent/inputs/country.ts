export const Country = {
  getList: () => {
    return countries;
  },
  getItem: (countryCode: string) => {
    const strippedCountryCode = countryCode.replace('+', '');
    return countries.find((c) => c.countryCode === strippedCountryCode);
  },
  getDefaultItem: () => {
    return {
      name: 'South Korea',
      countryCode: '82',
      isoCode: 'KR',
    };
  },
  getName: (countryCode: string) => {
    const countryObj = Country.getItem(countryCode);
    return countryObj?.name;
  },
  getCodeByName: (countryName: string) => {
    const countryObj = Country.getList().find(
      (country) => country.name === countryName,
    );
    return countryObj?.countryCode;
  },
};

export const countries = [
  {
    name: 'Afghanistan',
    countryCode: '93',
    isoCode: 'AF / AFG',
  },
  {
    name: 'Albania',
    countryCode: '355',
    isoCode: 'AL / ALB',
  },
  {
    name: 'Algeria',
    countryCode: '213',
    isoCode: 'DZ / DZA',
  },
  {
    name: 'American Samoa',
    countryCode: '1-684',
    isoCode: 'AS / ASM',
  },
  {
    name: 'Andorra',
    countryCode: '376',
    isoCode: 'AD / AND',
  },
  {
    name: 'Angola',
    countryCode: '244',
    isoCode: 'AO / AGO',
  },
  {
    name: 'Anguilla',
    countryCode: '1-264',
    isoCode: 'AI / AIA',
  },
  {
    name: 'Antarctica',
    countryCode: '672',
    isoCode: 'AQ / ATA',
  },
  {
    name: 'Antigua and Barbuda',
    countryCode: '1-268',
    isoCode: 'AG / ATG',
  },
  {
    name: 'Argentina',
    countryCode: '54',
    isoCode: 'AR / ARG',
  },
  {
    name: 'Armenia',
    countryCode: '374',
    isoCode: 'AM / ARM',
  },
  {
    name: 'Aruba',
    countryCode: '297',
    isoCode: 'AW / ABW',
  },
  {
    name: 'Australia',
    countryCode: '61',
    isoCode: 'AU / AUS',
  },
  {
    name: 'Austria',
    countryCode: '43',
    isoCode: 'AT / AUT',
  },
  {
    name: 'Azerbaijan',
    countryCode: '994',
    isoCode: 'AZ / AZE',
  },
  {
    name: 'Bahamas',
    countryCode: '1-242',
    isoCode: 'BS / BHS',
  },
  {
    name: 'Bahrain',
    countryCode: '973',
    isoCode: 'BH / BHR',
  },
  {
    name: 'Bangladesh',
    countryCode: '880',
    isoCode: 'BD / BGD',
  },
  {
    name: 'Barbados',
    countryCode: '1-246',
    isoCode: 'BB / BRB',
  },
  {
    name: 'Belarus',
    countryCode: '375',
    isoCode: 'BY / BLR',
  },
  {
    name: 'Belgium',
    countryCode: '32',
    isoCode: 'BE / BEL',
  },
  {
    name: 'Belize',
    countryCode: '501',
    isoCode: 'BZ / BLZ',
  },
  {
    name: 'Benin',
    countryCode: '229',
    isoCode: 'BJ / BEN',
  },
  {
    name: 'Bermuda',
    countryCode: '1-441',
    isoCode: 'BM / BMU',
  },
  {
    name: 'Bhutan',
    countryCode: '975',
    isoCode: 'BT / BTN',
  },
  {
    name: 'Bolivia',
    countryCode: '591',
    isoCode: 'BO / BOL',
  },
  {
    name: 'Bosnia and Herzegovina',
    countryCode: '387',
    isoCode: 'BA / BIH',
  },
  {
    name: 'Botswana',
    countryCode: '267',
    isoCode: 'BW / BWA',
  },
  {
    name: 'Brazil',
    countryCode: '55',
    isoCode: 'BR / BRA',
  },
  {
    name: 'British Indian Ocean Territory',
    countryCode: '246',
    isoCode: 'IO / IOT',
  },
  {
    name: 'British Virgin Islands',
    countryCode: '1-284',
    isoCode: 'VG / VGB',
  },
  {
    name: 'Brunei',
    countryCode: '673',
    isoCode: 'BN / BRN',
  },
  {
    name: 'Bulgaria',
    countryCode: '359',
    isoCode: 'BG / BGR',
  },
  {
    name: 'Burkina Faso',
    countryCode: '226',
    isoCode: 'BF / BFA',
  },
  {
    name: 'Burundi',
    countryCode: '257',
    isoCode: 'BI / BDI',
  },
  {
    name: 'Cambodia',
    countryCode: '855',
    isoCode: 'KH / KHM',
  },
  {
    name: 'Cameroon',
    countryCode: '237',
    isoCode: 'CM / CMR',
  },
  {
    name: 'Canada',
    countryCode: '1',
    isoCode: 'CA / CAN',
  },
  {
    name: 'Cape Verde',
    countryCode: '238',
    isoCode: 'CV / CPV',
  },
  {
    name: 'Cayman Islands',
    countryCode: '1-345',
    isoCode: 'KY / CYM',
  },
  {
    name: 'Central African Republic',
    countryCode: '236',
    isoCode: 'CF / CAF',
  },
  {
    name: 'Chad',
    countryCode: '235',
    isoCode: 'TD / TCD',
  },
  {
    name: 'Chile',
    countryCode: '56',
    isoCode: 'CL / CHL',
  },
  {
    name: 'China',
    countryCode: '86',
    isoCode: 'CN / CHN',
  },
  {
    name: 'Christmas Island',
    countryCode: '61',
    isoCode: 'CX / CXR',
  },
  {
    name: 'Cocos Islands',
    countryCode: '61',
    isoCode: 'CC / CCK',
  },
  {
    name: 'Colombia',
    countryCode: '57',
    isoCode: 'CO / COL',
  },
  {
    name: 'Comoros',
    countryCode: '269',
    isoCode: 'KM / COM',
  },
  {
    name: 'Cook Islands',
    countryCode: '682',
    isoCode: 'CK / COK',
  },
  {
    name: 'Costa Rica',
    countryCode: '506',
    isoCode: 'CR / CRI',
  },
  {
    name: 'Croatia',
    countryCode: '385',
    isoCode: 'HR / HRV',
  },
  {
    name: 'Cuba',
    countryCode: '53',
    isoCode: 'CU / CUB',
  },
  {
    name: 'Curacao',
    countryCode: '599',
    isoCode: 'CW / CUW',
  },
  {
    name: 'Cyprus',
    countryCode: '357',
    isoCode: 'CY / CYP',
  },
  {
    name: 'Czech Republic',
    countryCode: '420',
    isoCode: 'CZ / CZE',
  },
  {
    name: 'Democratic Republic of the Congo',
    countryCode: '243',
    isoCode: 'CD / COD',
  },
  {
    name: 'Denmark',
    countryCode: '45',
    isoCode: 'DK / DNK',
  },
  {
    name: 'Djibouti',
    countryCode: '253',
    isoCode: 'DJ / DJI',
  },
  {
    name: 'Dominica',
    countryCode: '1-767',
    isoCode: 'DM / DMA',
  },
  {
    name: 'Dominican Republic',
    countryCode: '1-809, 1-829, 1-849',
    isoCode: 'DO / DOM',
  },
  {
    name: 'East Timor',
    countryCode: '670',
    isoCode: 'TL / TLS',
  },
  {
    name: 'Ecuador',
    countryCode: '593',
    isoCode: 'EC / ECU',
  },
  {
    name: 'Egypt',
    countryCode: '20',
    isoCode: 'EG / EGY',
  },
  {
    name: 'El Salvador',
    countryCode: '503',
    isoCode: 'SV / SLV',
  },
  {
    name: 'Equatorial Guinea',
    countryCode: '240',
    isoCode: 'GQ / GNQ',
  },
  {
    name: 'Eritrea',
    countryCode: '291',
    isoCode: 'ER / ERI',
  },
  {
    name: 'Estonia',
    countryCode: '372',
    isoCode: 'EE / EST',
  },
  {
    name: 'Ethiopia',
    countryCode: '251',
    isoCode: 'ET / ETH',
  },
  {
    name: 'Falkland Islands',
    countryCode: '500',
    isoCode: 'FK / FLK',
  },
  {
    name: 'Faroe Islands',
    countryCode: '298',
    isoCode: 'FO / FRO',
  },
  {
    name: 'Fiji',
    countryCode: '679',
    isoCode: 'FJ / FJI',
  },
  {
    name: 'Finland',
    countryCode: '358',
    isoCode: 'FI / FIN',
  },
  {
    name: 'France',
    countryCode: '33',
    isoCode: 'FR / FRA',
  },
  {
    name: 'French Polynesia',
    countryCode: '689',
    isoCode: 'PF / PYF',
  },
  {
    name: 'Gabon',
    countryCode: '241',
    isoCode: 'GA / GAB',
  },
  {
    name: 'Gambia',
    countryCode: '220',
    isoCode: 'GM / GMB',
  },
  {
    name: 'Georgia',
    countryCode: '995',
    isoCode: 'GE / GEO',
  },
  {
    name: 'Germany',
    countryCode: '49',
    isoCode: 'DE / DEU',
  },
  {
    name: 'Ghana',
    countryCode: '233',
    isoCode: 'GH / GHA',
  },
  {
    name: 'Gibraltar',
    countryCode: '350',
    isoCode: 'GI / GIB',
  },
  {
    name: 'Greece',
    countryCode: '30',
    isoCode: 'GR / GRC',
  },
  {
    name: 'Greenland',
    countryCode: '299',
    isoCode: 'GL / GRL',
  },
  {
    name: 'Grenada',
    countryCode: '1-473',
    isoCode: 'GD / GRD',
  },
  {
    name: 'Guam',
    countryCode: '1-671',
    isoCode: 'GU / GUM',
  },
  {
    name: 'Guatemala',
    countryCode: '502',
    isoCode: 'GT / GTM',
  },
  {
    name: 'Guernsey',
    countryCode: '44-1481',
    isoCode: 'GG / GGY',
  },
  {
    name: 'Guinea',
    countryCode: '224',
    isoCode: 'GN / GIN',
  },
  {
    name: 'Guinea-Bissau',
    countryCode: '245',
    isoCode: 'GW / GNB',
  },
  {
    name: 'Guyana',
    countryCode: '592',
    isoCode: 'GY / GUY',
  },
  {
    name: 'Haiti',
    countryCode: '509',
    isoCode: 'HT / HTI',
  },
  {
    name: 'Honduras',
    countryCode: '504',
    isoCode: 'HN / HND',
  },
  {
    name: 'Hong Kong',
    countryCode: '852',
    isoCode: 'HK / HKG',
  },
  {
    name: 'Hungary',
    countryCode: '36',
    isoCode: 'HU / HUN',
  },
  {
    name: 'Iceland',
    countryCode: '354',
    isoCode: 'IS / ISL',
  },
  {
    name: 'India',
    countryCode: '91',
    isoCode: 'IN / IND',
  },
  {
    name: 'Indonesia',
    countryCode: '62',
    isoCode: 'ID / IDN',
  },
  {
    name: 'Iran',
    countryCode: '98',
    isoCode: 'IR / IRN',
  },
  {
    name: 'Iraq',
    countryCode: '964',
    isoCode: 'IQ / IRQ',
  },
  {
    name: 'Ireland',
    countryCode: '353',
    isoCode: 'IE / IRL',
  },
  {
    name: 'Isle of Man',
    countryCode: '44-1624',
    isoCode: 'IM / IMN',
  },
  {
    name: 'Israel',
    countryCode: '972',
    isoCode: 'IL / ISR',
  },
  {
    name: 'Italy',
    countryCode: '39',
    isoCode: 'IT / ITA',
  },
  {
    name: 'Ivory Coast',
    countryCode: '225',
    isoCode: 'CI / CIV',
  },
  {
    name: 'Jamaica',
    countryCode: '1-876',
    isoCode: 'JM / JAM',
  },
  {
    name: 'Japan',
    countryCode: '81',
    isoCode: 'JP / JPN',
  },
  {
    name: 'Jersey',
    countryCode: '44-1534',
    isoCode: 'JE / JEY',
  },
  {
    name: 'Jordan',
    countryCode: '962',
    isoCode: 'JO / JOR',
  },
  {
    name: 'Kazakhstan',
    countryCode: '7',
    isoCode: 'KZ / KAZ',
  },
  {
    name: 'Kenya',
    countryCode: '254',
    isoCode: 'KE / KEN',
  },
  {
    name: 'Kiribati',
    countryCode: '686',
    isoCode: 'KI / KIR',
  },
  {
    name: 'Kosovo',
    countryCode: '383',
    isoCode: 'XK / XKX',
  },
  {
    name: 'Kuwait',
    countryCode: '965',
    isoCode: 'KW / KWT',
  },
  {
    name: 'Kyrgyzstan',
    countryCode: '996',
    isoCode: 'KG / KGZ',
  },
  {
    name: 'Laos',
    countryCode: '856',
    isoCode: 'LA / LAO',
  },
  {
    name: 'Latvia',
    countryCode: '371',
    isoCode: 'LV / LVA',
  },
  {
    name: 'Lebanon',
    countryCode: '961',
    isoCode: 'LB / LBN',
  },
  {
    name: 'Lesotho',
    countryCode: '266',
    isoCode: 'LS / LSO',
  },
  {
    name: 'Liberia',
    countryCode: '231',
    isoCode: 'LR / LBR',
  },
  {
    name: 'Libya',
    countryCode: '218',
    isoCode: 'LY / LBY',
  },
  {
    name: 'Liechtenstein',
    countryCode: '423',
    isoCode: 'LI / LIE',
  },
  {
    name: 'Lithuania',
    countryCode: '370',
    isoCode: 'LT / LTU',
  },
  {
    name: 'Luxembourg',
    countryCode: '352',
    isoCode: 'LU / LUX',
  },
  {
    name: 'Macau',
    countryCode: '853',
    isoCode: 'MO / MAC',
  },
  {
    name: 'Macedonia',
    countryCode: '389',
    isoCode: 'MK / MKD',
  },
  {
    name: 'Madagascar',
    countryCode: '261',
    isoCode: 'MG / MDG',
  },
  {
    name: 'Malawi',
    countryCode: '265',
    isoCode: 'MW / MWI',
  },
  {
    name: 'Malaysia',
    countryCode: '60',
    isoCode: 'MY / MYS',
  },
  {
    name: 'Maldives',
    countryCode: '960',
    isoCode: 'MV / MDV',
  },
  {
    name: 'Mali',
    countryCode: '223',
    isoCode: 'ML / MLI',
  },
  {
    name: 'Malta',
    countryCode: '356',
    isoCode: 'MT / MLT',
  },
  {
    name: 'Marshall Islands',
    countryCode: '692',
    isoCode: 'MH / MHL',
  },
  {
    name: 'Mauritania',
    countryCode: '222',
    isoCode: 'MR / MRT',
  },
  {
    name: 'Mauritius',
    countryCode: '230',
    isoCode: 'MU / MUS',
  },
  {
    name: 'Mayotte',
    countryCode: '262',
    isoCode: 'YT / MYT',
  },
  {
    name: 'Mexico',
    countryCode: '52',
    isoCode: 'MX / MEX',
  },
  {
    name: 'Micronesia',
    countryCode: '691',
    isoCode: 'FM / FSM',
  },
  {
    name: 'Moldova',
    countryCode: '373',
    isoCode: 'MD / MDA',
  },
  {
    name: 'Monaco',
    countryCode: '377',
    isoCode: 'MC / MCO',
  },
  {
    name: 'Mongolia',
    countryCode: '976',
    isoCode: 'MN / MNG',
  },
  {
    name: 'Montenegro',
    countryCode: '382',
    isoCode: 'ME / MNE',
  },
  {
    name: 'Montserrat',
    countryCode: '1-664',
    isoCode: 'MS / MSR',
  },
  {
    name: 'Morocco',
    countryCode: '212',
    isoCode: 'MA / MAR',
  },
  {
    name: 'Mozambique',
    countryCode: '258',
    isoCode: 'MZ / MOZ',
  },
  {
    name: 'Myanmar',
    countryCode: '95',
    isoCode: 'MM / MMR',
  },
  {
    name: 'Namibia',
    countryCode: '264',
    isoCode: 'NA / NAM',
  },
  {
    name: 'Nauru',
    countryCode: '674',
    isoCode: 'NR / NRU',
  },
  {
    name: 'Nepal',
    countryCode: '977',
    isoCode: 'NP / NPL',
  },
  {
    name: 'Netherlands',
    countryCode: '31',
    isoCode: 'NL / NLD',
  },
  {
    name: 'Netherlands Antilles',
    countryCode: '599',
    isoCode: 'AN / ANT',
  },
  {
    name: 'New Caledonia',
    countryCode: '687',
    isoCode: 'NC / NCL',
  },
  {
    name: 'New Zealand',
    countryCode: '64',
    isoCode: 'NZ / NZL',
  },
  {
    name: 'Nicaragua',
    countryCode: '505',
    isoCode: 'NI / NIC',
  },
  {
    name: 'Niger',
    countryCode: '227',
    isoCode: 'NE / NER',
  },
  {
    name: 'Nigeria',
    countryCode: '234',
    isoCode: 'NG / NGA',
  },
  {
    name: 'Niue',
    countryCode: '683',
    isoCode: 'NU / NIU',
  },
  {
    name: 'North Korea',
    countryCode: '850',
    isoCode: 'KP / PRK',
  },
  {
    name: 'Northern Mariana Islands',
    countryCode: '1-670',
    isoCode: 'MP / MNP',
  },
  {
    name: 'Norway',
    countryCode: '47',
    isoCode: 'NO / NOR',
  },
  {
    name: 'Oman',
    countryCode: '968',
    isoCode: 'OM / OMN',
  },
  {
    name: 'Pakistan',
    countryCode: '92',
    isoCode: 'PK / PAK',
  },
  {
    name: 'Palau',
    countryCode: '680',
    isoCode: 'PW / PLW',
  },
  {
    name: 'Palestine',
    countryCode: '970',
    isoCode: 'PS / PSE',
  },
  {
    name: 'Panama',
    countryCode: '507',
    isoCode: 'PA / PAN',
  },
  {
    name: 'Papua New Guinea',
    countryCode: '675',
    isoCode: 'PG / PNG',
  },
  {
    name: 'Paraguay',
    countryCode: '595',
    isoCode: 'PY / PRY',
  },
  {
    name: 'Peru',
    countryCode: '51',
    isoCode: 'PE / PER',
  },
  {
    name: 'Philippines',
    countryCode: '63',
    isoCode: 'PH / PHL',
  },
  {
    name: 'Pitcairn',
    countryCode: '64',
    isoCode: 'PN / PCN',
  },
  {
    name: 'Poland',
    countryCode: '48',
    isoCode: 'PL / POL',
  },
  {
    name: 'Portugal',
    countryCode: '351',
    isoCode: 'PT / PRT',
  },
  {
    name: 'Puerto Rico',
    countryCode: '1-787, 1-939',
    isoCode: 'PR / PRI',
  },
  {
    name: 'Qatar',
    countryCode: '974',
    isoCode: 'QA / QAT',
  },
  {
    name: 'Republic of the Congo',
    countryCode: '242',
    isoCode: 'CG / COG',
  },
  {
    name: 'Reunion',
    countryCode: '262',
    isoCode: 'RE / REU',
  },
  {
    name: 'Romania',
    countryCode: '40',
    isoCode: 'RO / ROU',
  },
  {
    name: 'Russia',
    countryCode: '7',
    isoCode: 'RU / RUS',
  },
  {
    name: 'Rwanda',
    countryCode: '250',
    isoCode: 'RW / RWA',
  },
  {
    name: 'Saint Barthelemy',
    countryCode: '590',
    isoCode: 'BL / BLM',
  },
  {
    name: 'Saint Helena',
    countryCode: '290',
    isoCode: 'SH / SHN',
  },
  {
    name: 'Saint Kitts and Nevis',
    countryCode: '1-869',
    isoCode: 'KN / KNA',
  },
  {
    name: 'Saint Lucia',
    countryCode: '1-758',
    isoCode: 'LC / LCA',
  },
  {
    name: 'Saint Martin',
    countryCode: '590',
    isoCode: 'MF / MAF',
  },
  {
    name: 'Saint Pierre and Miquelon',
    countryCode: '508',
    isoCode: 'PM / SPM',
  },
  {
    name: 'Saint Vincent and the Grenadines',
    countryCode: '1-784',
    isoCode: 'VC / VCT',
  },
  {
    name: 'Samoa',
    countryCode: '685',
    isoCode: 'WS / WSM',
  },
  {
    name: 'San Marino',
    countryCode: '378',
    isoCode: 'SM / SMR',
  },
  {
    name: 'Sao Tome and Principe',
    countryCode: '239',
    isoCode: 'ST / STP',
  },
  {
    name: 'Saudi Arabia',
    countryCode: '966',
    isoCode: 'SA / SAU',
  },
  {
    name: 'Senegal',
    countryCode: '221',
    isoCode: 'SN / SEN',
  },
  {
    name: 'Serbia',
    countryCode: '381',
    isoCode: 'RS / SRB',
  },
  {
    name: 'Seychelles',
    countryCode: '248',
    isoCode: 'SC / SYC',
  },
  {
    name: 'Sierra Leone',
    countryCode: '232',
    isoCode: 'SL / SLE',
  },
  {
    name: 'Singapore',
    countryCode: '65',
    isoCode: 'SG / SGP',
  },
  {
    name: 'Sint Maarten',
    countryCode: '1-721',
    isoCode: 'SX / SXM',
  },
  {
    name: 'Slovakia',
    countryCode: '421',
    isoCode: 'SK / SVK',
  },
  {
    name: 'Slovenia',
    countryCode: '386',
    isoCode: 'SI / SVN',
  },
  {
    name: 'Solomon Islands',
    countryCode: '677',
    isoCode: 'SB / SLB',
  },
  {
    name: 'Somalia',
    countryCode: '252',
    isoCode: 'SO / SOM',
  },
  {
    name: 'South Africa',
    countryCode: '27',
    isoCode: 'ZA / ZAF',
  },
  {
    name: 'South Korea',
    countryCode: '82',
    isoCode: 'KR / KOR',
  },
  {
    name: 'South Sudan',
    countryCode: '211',
    isoCode: 'SS / SSD',
  },
  {
    name: 'Spain',
    countryCode: '34',
    isoCode: 'ES / ESP',
  },
  {
    name: 'Sri Lanka',
    countryCode: '94',
    isoCode: 'LK / LKA',
  },
  {
    name: 'Sudan',
    countryCode: '249',
    isoCode: 'SD / SDN',
  },
  {
    name: 'Suriname',
    countryCode: '597',
    isoCode: 'SR / SUR',
  },
  {
    name: 'Svalbard and Jan Mayen',
    countryCode: '47',
    isoCode: 'SJ / SJM',
  },
  {
    name: 'Swaziland',
    countryCode: '268',
    isoCode: 'SZ / SWZ',
  },
  {
    name: 'Sweden',
    countryCode: '46',
    isoCode: 'SE / SWE',
  },
  {
    name: 'Switzerland',
    countryCode: '41',
    isoCode: 'CH / CHE',
  },
  {
    name: 'Syria',
    countryCode: '963',
    isoCode: 'SY / SYR',
  },
  {
    name: 'Taiwan',
    countryCode: '886',
    isoCode: 'TW / TWN',
  },
  {
    name: 'Tajikistan',
    countryCode: '992',
    isoCode: 'TJ / TJK',
  },
  {
    name: 'Tanzania',
    countryCode: '255',
    isoCode: 'TZ / TZA',
  },
  {
    name: 'Thailand',
    countryCode: '66',
    isoCode: 'TH / THA',
  },
  {
    name: 'Togo',
    countryCode: '228',
    isoCode: 'TG / TGO',
  },
  {
    name: 'Tokelau',
    countryCode: '690',
    isoCode: 'TK / TKL',
  },
  {
    name: 'Tonga',
    countryCode: '676',
    isoCode: 'TO / TON',
  },
  {
    name: 'Trinidad and Tobago',
    countryCode: '1-868',
    isoCode: 'TT / TTO',
  },
  {
    name: 'Tunisia',
    countryCode: '216',
    isoCode: 'TN / TUN',
  },
  {
    name: 'Turkey',
    countryCode: '90',
    isoCode: 'TR / TUR',
  },
  {
    name: 'Turkmenistan',
    countryCode: '993',
    isoCode: 'TM / TKM',
  },
  {
    name: 'Turks and Caicos Islands',
    countryCode: '1-649',
    isoCode: 'TC / TCA',
  },
  {
    name: 'Tuvalu',
    countryCode: '688',
    isoCode: 'TV / TUV',
  },
  {
    name: 'U.S. Virgin Islands',
    countryCode: '1-340',
    isoCode: 'VI / VIR',
  },
  {
    name: 'Uganda',
    countryCode: '256',
    isoCode: 'UG / UGA',
  },
  {
    name: 'Ukraine',
    countryCode: '380',
    isoCode: 'UA / UKR',
  },
  {
    name: 'United Arab Emirates',
    countryCode: '971',
    isoCode: 'AE / ARE',
  },
  {
    name: 'United Kingdom',
    countryCode: '44',
    isoCode: 'GB / GBR',
  },
  {
    name: 'United States',
    countryCode: '1',
    isoCode: 'US / USA',
  },
  {
    name: 'Uruguay',
    countryCode: '598',
    isoCode: 'UY / URY',
  },
  {
    name: 'Uzbekistan',
    countryCode: '998',
    isoCode: 'UZ / UZB',
  },
  {
    name: 'Vanuatu',
    countryCode: '678',
    isoCode: 'VU / VUT',
  },
  {
    name: 'Vatican',
    countryCode: '379',
    isoCode: 'VA / VAT',
  },
  {
    name: 'Venezuela',
    countryCode: '58',
    isoCode: 'VE / VEN',
  },
  {
    name: 'Vietnam',
    countryCode: '84',
    isoCode: 'VN / VNM',
  },
  {
    name: 'Wallis and Futuna',
    countryCode: '681',
    isoCode: 'WF / WLF',
  },
  {
    name: 'Western Sahara',
    countryCode: '212',
    isoCode: 'EH / ESH',
  },
  {
    name: 'Yemen',
    countryCode: '967',
    isoCode: 'YE / YEM',
  },
  {
    name: 'Zambia',
    countryCode: '260',
    isoCode: 'ZM / ZMB',
  },
  {
    name: 'Zimbabwe',
    countryCode: '263',
    isoCode: 'ZW / ZWE',
  },
];
