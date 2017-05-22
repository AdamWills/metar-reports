# Airport METAR Reports

Submission by Adam Wills

## Requirments

* Node 7.2+ (written using 7.10.x, tested on 7.2.x)

## Getting started

1. `npm install`

### Live streaming data
1. `npm start`

### Generate codes and read from file
1. `npm run generate [number of records to generate]`
2. `npm run read`

This will open up a web browser, start generating records, parsing and displaying data in real time

## Breaking down the solution
This exercise was broken down into two parts - parsing and processing data; and viewing the data in real time

### Processing the data
Data processing is always important - so I took a TDD approach to parsing the data. Writing tests based on the requirements made writing the actual data parser much clearer. Some regex parsing made the job pretty simple (and no, I can't write regex by memory 😊). This part of the process took about an hour to complete.

### Reading data in real time
After starting with a solution that outputted 200,000 records to a file and parsing it, I wanted to push a little further and actually make a real time dashboard. Using Vue.js (I've been personally interested in playing around more with this), socket.io, and a local express server, I was able to generate data (limited to 1 record per second) and get the results of the data into a basic table, along with the last 10 records that were processed.

### Reading the data from a file
Pretty straight forward process here - read a file line by line, processing each result. Generate some basic output.

### Where I would take the project from here
If I were to spend more time on this, I would be focused on the dashboard visual experience. While the table is fine for basic output, I would want to explore the importance of the various pieces of data to understand what meaning each piece had and give some improved visualizations of the data (whether it's a streaming line graph, a bar graph that compares the various airports, etc).

Creating a build process to incorporate css and js processing would be a must to improve the scalability from a development perspective.

I would also start on some custom theming (rather than just using default Bootstrap) - adding colours, feeling, etc. 

## Additional Notes
1. In the Example Reports, the 3rd option 'FR 110232Z 001100G121MPS' contains 3 digits after the 'G', but the formatting guidelines specify 2. Taking into account the 3 possibility of 3 digits, but would want to verify the guidelines with the data.