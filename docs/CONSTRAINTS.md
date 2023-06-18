# CONSTRAINTS

## Assistant tools

Because it is a code challenge, I will not only not use AI-assisted extensions
but also avoid snippets, extensions, and other tools that increase productivity.

The IDE is a VSCode with visual extensions/configuration, such as themes and a
vertical ruler. All the DX (Developer eXperience) focused tools will come from
Vite, TypeScript, and Node.js libraries.

## Language (TypeScript)

I chose TypeScript instead of JavaScript because it integrates better with the
IDE, with features like auto-completion and type validation. However, to keep
TypeScript closer to JavaScript, I will avoid any complex use of TypeScript.

My goal with TypeScript is to create a project with better testing suitcases
because I do not need to type guarding/casting and to have a low amount of
comments, avoiding JSdoc for DX.

## Referring sources

To keep it fair, I will dump any source that helped me with the code in the
[SOURCE.md](./SOURCES.md). The exception is documentation and library READMEs,
which can be considered consulted at least once.

## Web Tech Stack

It was requested by email to avoid databases handling the file content. I will
keep it simple and consider that my server would be in a container with the
file that will be served, behind a load balance and a chacing system (if any).

## Performance

Node.js with Express.js can handle multiple users and I/O requests well.
Besides the best practices, this project is designed for horizontal scaling,
and any further improvement depends on the deployment system, for example,
splitting the file into multiple servers.
