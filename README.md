# LINE SERVER

The project is a rest API server for serve one static file line by line.

## Requirements

- Node.js (using LTS version, 18.16.0)
- UNIX-based OS, for the .sh files.

## Getting started

step 1: Run `./build.sh` to install Node.js dependencies and build the index
files.

step 2: Run `./run.sh <filename>` to start the server (e.g.
`./run.sh lorem_ipsum`). All files inside the files folder and with the .txt
extension will be considered valid.

step 3: Access http://localhost:3000/

## Development

- After step 1, run `npm run test` to start the test suit.
- After step 1, run `npm run style` to fix code linting and formatting.
- run `npm run dev` to start server.

## Considerations

The Design of this project is a mix of a way I document and structure my
projects and a way to describe and convey my thinking process (see
[documentation](./docs/README.md)). All [challenge](./docs/CHALLENGE.md)
questions are addressed in the [FAQ](./docs/FAQ.md). 
