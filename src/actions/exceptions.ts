// import { FirebaseError } from "firebase/app";
// import { ZodError } from "zod";
// import { nanoid } from 'nanoid';

/**
 * Parses the error object and returns a descriptive error message. This
 * will only parse commonly known errors. Update this if you want specific 
 * error types to return a different message.
 * 
 * @param err - The error object to parse.
 * @returns An Error class with proper message.
 */
export function parseError(err:unknown): Error {
    // do we need to trace this?
    console.trace({err})
    // if (err instanceof ZodError) {
    //     return new Error(`found ${err.issues.length} validation error(s): ${err.issues.map((issue) => `${issue.message}`).join(", ")}`);
    // }
    // if (err instanceof FirebaseError) {
    //   switch (err.code) {
    //     case "auth/invalid-credential":
    //       return new Error("invalid username and/or password");
    //     default:
    //       return new Error(`authentication error with code: ${err.code} and message: ${err.message}`);
    //   }
    // }

    // if (err.code && err.code == 'ENOENT') {
    //   const errid = nanoid();
    //   console.warn(`error id: ${errid}`,{err});
    //   return new Error(`Missing required configuration file, see server logs for detail (error id: ${errid})`);
    // }
  
    if (typeof err === "string") return new Error(err);

    if (err instanceof Error) {
      // firebase-admin for node.js throws this error when the user doesn't have enough permission. 
      // it contains flat "Permission denied" on "message" field with no other extra information.
      if (err.message == "Permission denied") {
        return new Error("you don't have enough permission to access the user data.");
      }

      return err;
    }
  
    return new Error(`unknown error: ${err}`);
  }