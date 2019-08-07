# nycdot-milling-paving-scraper

A nodejs data scraper for NYC Department of Transportation Weekly Milling and Paving Schedule PDFs

## About

DOT does not publish a data feed or dataset for street resurfacing (milling and paving) schedules.  They do publish a [weekly-updated series of PDFs](https://www1.nyc.gov/html/dot/html/motorist/resurfintro.shtml) (ironically listed on the [data feeds page](https://www1.nyc.gov/html/dot/html/about/datafeeds.shtml))  

The PDFs appear to be excel spreadsheets printed to PDF, and don't have fixed column widths

## More Resources
- It looks like paving activities [are reflected in the Street Closures open dataset](https://data.cityofnewyork.us/Transportation/Street-Closures-due-to-construction-activities-by-/i6b5-j7bu/data), and even include a segment ID which could be used for mapping.

- They also appear in this [DoITT-hosted web mapping application](http://gis.nyc.gov/streetclosure/) for street closures.

## How to Use

This script uses `pdftotext` to pull out the text, and then uses some simple logic to flatten the text into discrete rows of paving and milling activity.

- clone this repo
- navigate to the repo and install dependencies: `>yarn`
- run `node getBoroughs.js`

The script will download the current borough pdfs into `/output`, scrape them and combine the results into `boroughs.csv`

## Todo
- Write scrapers for the non-borough PDFs
- Automate weekly run, store data somewhere for historical archival (Probably [Qri.io](https://qri.io))
- Add geometries to each, so you can map where the milling will take place

## Is this useful?
My friend [Noel Hidalgo](https://twitter.com/noneck/status/1126535678031011840?s=20) says it is. [Here's another place](https://talk.beta.nyc/t/getting-nycs-street-milling-data/1656) where he says it is.  I don't have an immediate use case for this data, but I would love to hear from you if you find this valuable.


<img width="993" alt="nycdot-milling-paving-scraper_boroughs_csv_at_master_·_chriswhong_nycdot-milling-paving-scraper" src="https://user-images.githubusercontent.com/1833820/62621903-0576ae00-b8eb-11e9-92a8-0c441e233278.png">
