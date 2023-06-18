export function getLineById(id: number) {
  const lasdID = 10;
  if (id === -1) {
    // mocking runtime server error
    return Promise.reject(new Error("Runtime server error"));
  }
  if (id < 0 || id > lasdID) {
    return Promise.reject(new Error("User input"));
  }

  return Promise.resolve("line content");
}
