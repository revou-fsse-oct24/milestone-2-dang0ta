import { ZodError } from "zod";
import { nanoid } from "nanoid";

/**
 * Parses the error object and returns a descriptive error message. This
 * will only parse commonly known errors. Update this if you want specific
 * error types to return a different message.
 *
 * @param err - The error object to parse.
 * @returns An Error class with proper message.
 */
export function parseError(err: unknown): Error {
  const errorID = nanoid();

  if (err instanceof Error) {
    return err;
  }

  if (err instanceof ZodError) {
    const messages = err.issues.map((issue) => issue.message).join(", ");
    return new Error(
      `found ${err.issues.length} validation error(s): ${messages}`
    );
  }

  if (typeof err === "string") {
    return new Error(err);
  }

  if (typeof err === "object" && err !== null) {
    if ("code" in err) {
      if (err.code === "ENOENT") {
        return new Error(
          `Missing required configuration file, see server logs for detail (error id: ${errorID})`
        );
      }
    }
  }

  return new Error(`unknown error: ${err}`);
}
