/**
 * @note The block below contains polyfills for Node.js globals
 * required for Jest to function when running JSDOM tests.
 * These HAVE to be require's and HAVE to be in this exact
 * order!
 *
 * Consider migrating to a more modern test runner if
 * you don't want to deal with this.
 */

import { TextEncoder, TextDecoder } from 'util';
import { ReadableStream, TransformStream } from 'stream/web';
import { BroadcastChannel } from "worker_threads";
import "whatwg-fetch";

Reflect.set(globalThis, 'TextDecoder', TextDecoder);
Reflect.set(globalThis, 'TextEncoder', TextEncoder);
Reflect.set(globalThis, 'BroadcastChannel', BroadcastChannel)
Reflect.set(globalThis, "ReadableStream", ReadableStream);
Reflect.set(globalThis, "TransformStream", TransformStream);

// source; https://github.com/mswjs/msw/discussions/1934