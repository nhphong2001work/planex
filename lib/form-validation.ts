export const MAX_CV_SIZE = 10 * 1024 * 1024;

const allowedCvTypes = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

export function isValidEmail(value: string) {
  return /^\S+@\S+\.\S+$/.test(value);
}

export function isAllowedCv(file: Pick<File, "size" | "type">) {
  return file.size <= MAX_CV_SIZE && allowedCvTypes.has(file.type);
}
