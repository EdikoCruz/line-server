import { join } from "node:path";
import { cwd, env } from "node:process";

export function getAbsoluteFilePath() {
  const absoluteRootPath = cwd();
  const relativeFolderPath = env?.FILE_SERVER_FOLDER_PATH || "files";
  const fileExtension = env?.FILE_SERVER_EXTENSION || "txt";
  const fileName = env?.FILE_SERVER_NAME || "lorem_ipsum";

  return join(
    absoluteRootPath,
    relativeFolderPath,
    `${fileName}.${fileExtension}`
  );
}

export function isAppRunning() {
  return env?.NODE_ENV === "development";
}

export function getPort() {
  return process.env.PORT || 3000;
}
