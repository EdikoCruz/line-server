# FAQ (FORMALLY ASKED QUESTION)

## How does your system work? (if not addressed in comments in source)

The system loads the line, using metadata to skip all previous lines and load
only the requested line, to RAM and returns it to the user. The complete
solution design can be found on "v0.1.0 - Solution Design" at the
[changelog](./CHANGELOG.md).

## How will your system perform with a 1 GB file? a 10 GB file? a 100 GB file?

Besides edge cases, it handles well huge files. The Edge cases and possible
improviments can be found on "v0.1.0 - Solution Design > Possible improvements
and edge cases" at the [changelog](./CHANGELOG.md).

## How will your system perform with 100 users? 10000 users? 1000000 users?

Besides edge cases, it handles well multiple users. The Edge cases and possible
improviments can be found on "v0.1.0 - Solution Design > Possible improvements
and edge cases" at the [changelog](./CHANGELOG.md).

## What documentation, websites, papers, etc did you consult in doing this assignment?

The design solution came from experience, and the tech stack documentation was
consulted. All extra resources consulted can be found at
[sources](./SOURCES.md).

## What third-party libraries or other tools does the system use? How did you choose each library or framework you used?

- Vite for development environment
- Vitetest and supertest for testing
- Express.js for web REST API serving
- cross-env to set ENV vars

The detailed reason for choices can be found at the
[changelog](./CHANGELOG.md).

## How long did you spend on this exercise? If you had unlimited more time to spend on this, how would you spend it and how would you prioritize each item?

To give some sense of how much time was spent on this challenge, each version
in the [CHANGELOG.md](./CHALLENGE.md) has its own time tracker. However, the
time spent on the documentation is omitted because it would be quicker if in a
conversation or presentation.

With more time, I would implement by order the further improvement proposed.
The improvement can be found on "v0.1.0 - Solution Design > Possible
improvements and edge cases" at the [changelog](./CHANGELOG.md).

## If you were to critique your code, what would you have to say about it?

The typing declaration is not optimal (for example, some types could be
interfaces and in its file) and could be improved. It happened because I was
using TypeScript as I would use JavaScript.
