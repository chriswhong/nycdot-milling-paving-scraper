const {promisify} = require('util');
const extract = require('pdf-text-extract');
const fs = require('fs-extra');

const extractAsync = promisify(extract)

const getSubstring = (string, start, end) => {
  const substring = string.substring(start - 1, end).trim()
  return substring.length > 0 ? substring : null
}

const boroughs = [
  'Manhattan',
  'Brooklyn',
  'Queens',
  'Bronx',
  'Staten Island'
]

const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
]

let borough
let day
let date
let crews

const processLine = (line) => {

  // parse columns
  const columnStrings = line.split(/\s{2,}/).map(d => d === '' ? null : d)
  console.log(columnStrings)
  // if first column contains a borough, set borough
  if (boroughs.includes(columnStrings[0])) borough = columnStrings[0]

  // if first column contains a day, set day
  if (days.includes(columnStrings[0])) {
    day = columnStrings[0]
    // if first column contains a day, next column is the crews
    if (columnStrings[1] !== 'No Work') crews = columnStrings[1]
  }

  // if all columns null except third, set crews
  if ( (columnStrings.length === 2) && (columnStrings[0] === null)) crews = columnStrings[1]

  // if first column contains a date, set date
  if (columnStrings[0] && columnStrings[0].match(/^(\d{1,2})-(\d{1,2})-(\d{2})/)) date = columnStrings[0]


  if (
    borough
    && date
    && day
    && crews
    && columnStrings.length === 5
    && columnStrings[1]
    && columnStrings[2]
    && columnStrings[3]
    && columnStrings[4] !== 'Area'
  ) {
    return {
      borough,
      date,
      day,
      crews,
      saNumber: columnStrings[1],
      location: columnStrings[2],
      communityBoard: columnStrings[3],
      area: columnStrings[4]
    }
  } else {
    return null
  }
}

const parseBoroughPdf = async (path) => {
  const pages = await extractAsync(path, {});

  // get an array of all lines
  const lines = pages.reduce((agg, page) => [
      ...agg,
      ...page.split('\n')
    ], [])

  return lines.map(processLine).filter(line => line !== null)
  // return pages.map((page) => {
  //   // split each page on newline
  //   const lines = page.split('\n');
  //
  //   // iterate over each line
  //   return lines.map(processLine);
  // });
}

module.exports = parseBoroughPdf
