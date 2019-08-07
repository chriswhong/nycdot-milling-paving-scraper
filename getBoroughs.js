const fs = require('fs-extra');
const download = require('download-to-file');
const async = require('async');
const { parse } = require('json2csv');
const parseBoroughPdf = require('./parseBoroughPdf')


const boroPrefixes = [
  'mn',
  'bx',
  'bk',
  'qn',
  'si'
]

const downloadPdf = async (boroPrefix) => {
  await download(
    `https://www1.nyc.gov/html/dot/downloads/pdf/${boroPrefix}resurf.pdf`,
    `tmp/${boroPrefix}resurf.pdf`,
    () => {}
  )
}

const writeToFile = (rows) => {
  const output = fs.createWriteStream('boroughs.csv');

  csv = parse(rows, {
    fields: [
      'borough',
      'date',
      'day',
      'crews',
      'saNumber',
      'location',
      'communityBoard',
      'area',
    ]
  })

  console.log(csv)
  output.write(csv)
}

(async () => {
  await async.eachSeries(boroPrefixes, downloadPdf);

  const boroRows = await async.map(boroPrefixes, async (boroPrefix) => {
    return parseBoroughPdf(`tmp/${boroPrefix}resurf.pdf`)
  })

  const rows = boroRows.reduce((agg, boro) => {
    return [
      ...agg,
      ...boro
    ]
  }, [])

  writeToFile(rows)
})()
