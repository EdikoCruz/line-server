import { FileHandle, open } from "node:fs/promises";

import { getInstance } from "./utils.asyncSingleton";
import { getAbsoluteFilePath } from "./utils.env";
import { readLineByLine } from "./utils.lazyFileReader";

type LineIndexItem = {
  position: number;
  length: number;
};

/**
 * Creates a array with the line metadata.
 * - The index is the line number - 1;
 * - The value is the line start position and the line length;
 *
 * @param {String} filePath
 * @returns {Promise} promise
 */
export function getByFilePath(filePath) {
  return new Promise((res, rej) => {
    const lineIndex: LineIndexItem[] = [];
    let lastPosition = 0;
    readLineByLine(
      filePath,
      (line) => {
        lineIndex.push({
          position: lastPosition,
          length: line.length,
        });
        lastPosition += line.length + "\n".length;
      },
      () => {
        res(lineIndex);
      },
      rej
    );
  });
}

type DependenciesResult = {
  index: LineIndexItem[];
  file: FileHandle;
};

function getLineIndex(): Promise<LineIndexItem[]> {
  return getByFilePath(getAbsoluteFilePath()) as Promise<LineIndexItem[]>;
}

function getFileHandler(): Promise<FileHandle> {
  return open(getAbsoluteFilePath());
}

function getDependencies(): Promise<DependenciesResult> {
  const path = getAbsoluteFilePath();
  const singletonInstanceKey = `fileHandler::${path}`;
  const singletonIndexKey = `indexModel::${path}`;

  return new Promise((res, rej) => {
    Promise.all([
      getInstance(singletonIndexKey, getLineIndex),
      getInstance(singletonInstanceKey, getFileHandler),
    ])
      .then((dependencies) => {
        res({
          index: dependencies[0] as LineIndexItem[],
          file: dependencies[1] as FileHandle,
        });
      })
      .catch(rej);
  });
}

export function getLineById(id: number) {
  if (id === -1) {
    // mocking runtime server error
    return Promise.reject(new Error("Runtime server error"));
  }

  return new Promise((res, rej) => {
    getDependencies()
      .then((dependencies) => {
        const { index, file } = dependencies;

        if (Number(id) > index.length) {
          rej(new Error("User input"));
        }

        const metadata = index[Number(id) - 1];

        return file
          .read(metadata) // seeking position and reading length
          .then((line) => line.buffer.toString("ascii"))
          .then(res);
      })
      .catch(rej);
  });
}
