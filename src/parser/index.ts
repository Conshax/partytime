/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

import { ParserOptions, unifiedParser } from "./unified";
import { parse, validate } from "./xml-parser";
import { FeedObject, FeedType } from "./types";

export function parseFeed(xml: string, options?: ParserOptions): FeedObject | null {
  const parsedContent = validate(xml.trim());
  if (parsedContent === true) {
    return handleValidFeed(xml, options);
  }
  return handleInvalidFeed(xml);
}

function handleValidFeed(xml: string, options?: ParserOptions): FeedObject | null {
  const theFeed = parse(xml.trim());
  let feedObj: FeedObject | null;
  if (typeof theFeed.rss === "object") {
    feedObj = unifiedParser(theFeed, FeedType.RSS, options);
  } else if (typeof theFeed.feed === "object") {
    feedObj = unifiedParser(theFeed, FeedType.ATOM, options);
  } else {
    // Unsupported
    return null;
  }

  if (!feedObj) {
    console.debug("Parsing failed...");
    return null;
  }

  return feedObj;
}

function handleInvalidFeed(_xml: string) {
  console.debug("invalid feed");
  // console.debug(xml);
  return null;
}
