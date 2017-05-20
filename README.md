# Airport METAR Reports

Submission by Adam Wills

## Requirments

* Node 7.2+ (written using 7.10.x, tested on 7.2.x)

## Getting started

1. `npm install`
2. `npm start`

This will generate 200,000 records, process the results and display an output on completion.

## Breaking down the solution
This exercise was broken down into two parts - parsing and processing data; and streaming data from one source to another. I'm comfortable with the former, but am pretty inexperienced with the latter.

### Processing the data
Data processing is always important - so I took a TDD approach to parsing the data. Writing tests based on the requirements made writing the actual data parser much clearer. Some regex parsing made the job pretty simple (and no, I can't write regex by memory 😊). This part of the process took about an hour to complete.

### Streaming data from one point to another
This was definitely the biggest challenge for myself - in the end, I came up with a solution that is able to test the parser, but something that wouldn't be a permanent solution - setting up a file full of data then reading from it. I took some quick attempts at piping data through the command line, a stab at using streams, but wasn't able to get anything working in the time I had set aside for the solution. Definitely something I'm interested in figuring out how to do.

In the end, I have a script that generates random report data (based on the criteria in the document) - and am just writing to a text file. My parser reads the data line by line, keeps track of the data required for reporting, and outputs a status at the end.

## Considerations for production
For this application to hit production, streaming the data in to the application would be a must. Also, memory profiling would need to be considered (my performance experience is mostly on the client side).

## Additional Notes
1. In the Example Reports, the 3rd option 'FR 110232Z 001100G121MPS' contains 3 digits after the 'G', but the formatting guidelines specify 2. Taking into account the 3 possibility of 3 digits, but would want to verify the guidelines with the data.