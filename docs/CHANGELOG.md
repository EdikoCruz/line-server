# CHANGELOG

## v0.5.0 - wrapping up (build and challenge requests) 1h

- add build.sh
- add run.sh
- add documentation
- add cross-env for setting env (NODE_ENV=production) ant start

## v0.4.1 - improve api entrypoint 30m

- add link to all cases

## v0.4.0 - File model 2h

- add utils: async singleton
- add utils: lazy file reader (to read file line by line)
- add utils: env (to get values from env or default)
- add file model

## v0.3.0 - Web rest API 30m

- Add /line/:id endpoint

## v0.2.0 - Setup 30m

This setup uses Vite because it has almost no boilerplate, focuses on DX, and
its' plugins are well-integrated. However, because it focuses on Browser,
making it work with Express.js creates a small amount of boilerplate code.

For testing, it uses Vitest because it works well with Vite and supertest for
web API testing.

It uses Prettier to fix the code formatting (for example, indentation and line
length).

It uses Eslint to fix the code linting (for example, unused vars).

## v0.1.0 - Solution Design 1h

The solution proposed has three main aspects, coding style, web application,
and file handling.

### Coding style

The considerations for the code base are:

- Functions must be async for Express.js performance.
- Errors must return as catch instead of thrown.

Also, three categories of errors:

- User errors (like 4xx HTTP status code), such as invalid line or file id.
- Runtime system errors (like 5xx HTTP status code), such as I/O processing
  errors, which the server might try to handle before exit.
- Setup system errors, such as the file requested does not exist and therefore
  cannot be served, which the server will log and exit.

### Web application

The solution is an MV architectural pattern, a partial use of the MVVM since
the data is read-only and do not change over time.

The Express.js part will be the View and will be responsible for formatting the
data for the final user. For example, errors must have a nice message and not
show the stack trace.

The file model is a data access layer. Its API will only need the file id
(the file name without path and extension) and the line id (the sequence
position of the line).

### File handling

The solution has two steps:

- First, create a line index with the line id, line position (where it is on
  the file), and the line length (excluding the EOL, End Of Line). It will be on
  the RAM.
- Then, use the line index to skip all the previous lines and load the line to
  memory as a string.

The line index data structure is an array where the index is the line id minus
one, and its value is a second array. That second array will contain the line
position in the first position and the line length in the second.

#### Possible improvements and edge cases

Improvement 1 (huge lines and multiple users):

One possible improvement is to pass a stream object to Express.js, allowing it
to load the line by chunks. Express.js will load the next part when the current
is delivered. It will help when the server is trying to load a string and not
having enough RAM because other user request lines will be at RAM.

Improvement 2 (Insane amount of EoLs):

The line index of a big file (for example, 50GB) where all lines are "a\n"
cannot fit into RAM. For this case, a possible solution is to change the line
index structure to a tree, where each node contains X number of line metadata
and Y nodes. The X and Y numbers depend on deployment factors. Also, recreate
the line index when these number change.

Improvement 2 algorithm:

- step 1, get the root node (the only one that will always be at RAM because it
  is the most used).
- step 2, check if the node has the line metadata. If not, go to step 3.
- step 3, get which node must have the line metadata with a hash function. Load
  it from the HD, and do step 2.
