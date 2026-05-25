/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as assignments from "../assignments.js";
import type * as auth from "../auth.js";
import type * as classKits from "../classKits.js";
import type * as classes from "../classes.js";
import type * as http from "../http.js";
import type * as kits from "../kits.js";
import type * as lib_access from "../lib/access.js";
import type * as profiles from "../profiles.js";
import type * as rubrics from "../rubrics.js";
import type * as scores from "../scores.js";
import type * as seed from "../seed.js";
import type * as seed_kits from "../seed/kits.js";
import type * as seed_rubrics from "../seed/rubrics.js";
import type * as students from "../students.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  assignments: typeof assignments;
  auth: typeof auth;
  classKits: typeof classKits;
  classes: typeof classes;
  http: typeof http;
  kits: typeof kits;
  "lib/access": typeof lib_access;
  profiles: typeof profiles;
  rubrics: typeof rubrics;
  scores: typeof scores;
  seed: typeof seed;
  "seed/kits": typeof seed_kits;
  "seed/rubrics": typeof seed_rubrics;
  students: typeof students;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
