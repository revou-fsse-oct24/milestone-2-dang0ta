import { Response } from "@actions/api";
import { parseError } from "@actions/exceptions";
import { useEffect, useState } from "react";

type state<T> = {
  state: "init" | "loading" | "loaded";
  response: Response<T> | null;
};

/**
 * Custom hook to handle data fetching and state management.
 * 
 * This hook wraps the data loading logic and returns the appropriate loading state,
 * the fetched response, and any parsed error message if an error occurs.
 * 
 * @param fn - A function that returns a Promise of Response<T>
 * @returns An object containing the current state and the response
 */
export function useResponse<T>(fn: () => Promise<Response<T>>) {
  const [state, setState] = useState<state<T>>({
    state: "init",
    response: null,
  });

  const get = async () => {
    try {
      const res = await fn();
      setState({ state: "loaded", response: res });
    } catch (e) {
      // Catch non-server related errors here, such as connection errors.
      // This is unnecessary for now, as getProduct is executed on the browser,
      // but it will become necessary later when we migrate to Next.js, and getProduct
      // becomes a server function.
      console.warn({ e });

      const parsedErr = parseError(e);
      setState({
        response: {
          status: "error",
          data: {} as T,
          error: parsedErr.message,
        },
        state: "loaded",
      });
    }
  };

  useEffect(() => {
    get();
  }, []);

  return state;
}
