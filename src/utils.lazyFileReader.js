import { createReadStream } from "node:fs";
import { createInterface } from "node:readline";

/**
 *
 * Loads line by line and call callbacks on events:
 *   onLine (line) => {}
 *   onClose () => {}
 *   onError (error) => {}
 *
 * To avoid load all file into memory at once I am using node:readline to
 * searching for the next EOL (end of line) and load only the current line into
 * memory. It will be repeated until the EOF (end of file).
 *
 * project constraints:
 *  - Each line is terminated with a newline ("\n").
 *  - Any given line will fit into memory.
 *  - The line is valid ASCII (e.g. not Unicode).
 *
 * source: https://nodejs.org/dist/latest-v18.x/docs/api/readline.html#example-read-file-stream-line-by-line
 *
 * @param {String} filePath
 * @param {function} onLine
 * @param {function} onClose
 * @param {function} onError
 */
export function readLineByLine(filePath, onLine, onClose, onError) {
  const fileStream = createReadStream(filePath);

  const rl = createInterface({
    input: fileStream,
    lfDelay: Infinity,
  });

  rl.on("error", onError);
  rl.on("line", onLine);
  rl.on("close", onClose);
}
