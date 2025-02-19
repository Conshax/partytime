import type { FeedObject } from "../types";

export function getPhaseSupport(feed: FeedObject, phase: number): string[] {
  const defaultReturn: string[] = [];
  // eslint-disable-next-line no-underscore-dangle
  const phaseObj = feed.pc20support;
  if (phaseObj) {
    return phaseObj[phase] ?? defaultReturn;
  }
  return defaultReturn;
}

export function spliceFeed(feedXml: string, str: string): string {
  return splice(feedXml, str, "<channel>");
}

export function spliceFirstItem(feedXml: string, str: string): string {
  return splice(feedXml, str, "<item>");
}

export function spliceAllItems(feedXml: string, str: string): string {
  let updated = feedXml;
  let curr = feedXml.indexOf("<item>");
  while (curr !== -1) {
    updated = splice(updated, str, "<item>", curr);
    curr = updated.indexOf("<item>", curr + 1);
  }
  return updated;
}

export function spliceLastItem(feedXml: string, str: string): string {
  return splice(feedXml, str, "<item>", feedXml.lastIndexOf("<item>"));
}

function splice(feedXml: string, str: string, after: string, startSearchAt = 0): string {
  const start = feedXml.indexOf(after, startSearchAt) + after.length;
  return [feedXml.slice(0, start), str, feedXml.slice(start)].join("");
}
