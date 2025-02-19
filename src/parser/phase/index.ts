/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import concat from "ramda/src/concat";
import mergeDeepRight from "ramda/src/mergeDeepRight";
import mergeWith from "ramda/src/mergeWith";

import type { Episode, FeedObject, RSSFeed, XmlNode, PhaseUpdate, TODO } from "../types";

import * as phase1 from "./phase-1";
import * as phase2 from "./phase-2";
import * as phase3 from "./phase-3";
import * as phase4 from "./phase-4";
import * as pending from "./phase-pending";
import { XmlNodeSource } from "./types";

type FeedUpdateResult = {
  feedUpdate: Partial<FeedObject>;
  phaseUpdate: PhaseUpdate;
};

type ItemUpdateResult = {
  itemUpdate: Partial<Episode>;
  phaseUpdate: PhaseUpdate;
};

type NodeTransform = (x: XmlNode) => TODO;
type SupportCheck = (x: TODO, type: XmlNodeSource) => boolean;

/** Describes a Feed processing object intended to provide extensible feed parsing */
export type FeedUpdate = {
  /** What phase was this added to the namespace */
  phase: number;
  /** What is the name of the tag, expected to "transcript" for <podcast:transcript> */
  tag: string;
  /** What is the name of feature, falls back to tag if missing */
  name?: string;
  /** Processing function to return an object to be merged with the current feed */
  fn: (node: XmlNode, feed: RSSFeed, type: XmlNodeSource) => Partial<FeedObject>;
  /** An optional function to transform the node before calling both the support and processing functions */
  nodeTransform?: NodeTransform;
  /** An optional function to determine if the tag meets the requirements for processing (eg. has required attributes or value) */
  supportCheck?: SupportCheck;
};

/** Describes an Item processing object intended to provide extensible item parsing */
export type ItemUpdate = {
  /** What phase was this added to the namespace */
  phase: number;
  /** What is the name of the tag, expected to "transcript" for <podcast:transcript> */
  tag: string;
  /** What is the name of feature, falls back to tag if missing */
  name?: string;
  /** Processing function to return an object to be merged with the current item */
  fn: (node: XmlNode, feed: RSSFeed, type: XmlNodeSource) => Partial<Episode>;
  /** An optional function to transform the node before calling both the support and processing functions */
  nodeTransform?: NodeTransform;
  /** An optional function to determine if the tag meets the requirements for processing (eg. has required attributes or value) */
  supportCheck?: SupportCheck;
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
export const defaultNodeTransform: NodeTransform = (x) => x;
export const defaultSupportCheck: SupportCheck = (x) => typeof x === "object";

const feeds: FeedUpdate[] = [
  phase1.locked,
  phase1.funding,

  phase2.person,
  phase2.location,

  phase3.trailer,
  phase3.license,
  phase3.guid,

  phase4.value,
  phase4.medium,
  phase4.podcastImages,
  phase4.liveItem,

  pending.id,
  pending.social,
  pending.podcastRecommendations,
];

const items: ItemUpdate[] = [
  phase1.transcript,
  phase1.chapters,
  phase1.soundbite,

  phase2.person,
  phase2.location,
  phase2.season,
  phase2.episode,

  phase3.license,
  phase3.alternativeEnclosure,

  phase4.value,
  phase4.podcastImages,

  pending.socialInteraction,
  pending.podcastRecommendations,
  pending.podcastGateway,
];

export function updateFeed(theFeed: RSSFeed, feedUpdates = feeds): FeedUpdateResult {
  return feedUpdates.reduce(
    ({ feedUpdate, phaseUpdate }, { phase, tag, fn, nodeTransform, supportCheck, name }) => {
      const tagName = tag;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      const node = (nodeTransform ?? defaultNodeTransform)(theFeed.rss.channel[tagName]);
      // console.debug(`Checking feed ${tagName} support`);
      const tagSupported = node && (supportCheck ?? defaultSupportCheck)(node, XmlNodeSource.Feed);

      if (tagSupported) {
        // console.debug(`Feed supports ${tagName}`);

        try {
          const feedResult = fn(node, theFeed, XmlNodeSource.Feed);
          // console.debug(feedResult, `Feed update for ${tagName}`);
          return {
            feedUpdate: mergeWith(concat, feedUpdate, feedResult),
            phaseUpdate: mergeDeepRight(phaseUpdate, { [phase]: { [name ?? tag]: true } }),
          };
        } catch (err) {
          // console.debug(err, `Exception thrown while trying to parse feed tag ${tagName}`);
        }
      }

      // console.debug(`Feed doesn't support ${tagName}`, node, tagSupported);
      return {
        feedUpdate,
        phaseUpdate,
      };
    },
    {
      feedUpdate: {},
      phaseUpdate: {},
    } as FeedUpdateResult
  );
}

export function updateItem(item: XmlNode, feed: RSSFeed, itemUpdates = items): ItemUpdateResult {
  return itemUpdates.reduce(
    ({ itemUpdate, phaseUpdate }, { phase, tag, fn, nodeTransform, supportCheck, name }) => {
      const tagName = tag;
      // console.debug(`Checking feed item ${tagName} support`);

      const node = (nodeTransform ?? defaultNodeTransform)(item[tagName]);
      const tagSupported = node && (supportCheck ?? defaultSupportCheck)(node, XmlNodeSource.Item);

      if (tagSupported) {
        // console.debug(`Feed item supports ${tagName}`);
        try {
          const itemResult = fn(node, feed, XmlNodeSource.Item);
          // console.debug(itemResult, `Item update for ${tagName}`);
          return {
            itemUpdate: mergeWith(concat, itemUpdate, itemResult),
            phaseUpdate: mergeDeepRight(phaseUpdate, { [phase]: { [name ?? tag]: true } }),
          };
        } catch (err) {
          // console.debug(err, `Exception thrown while trying to parse item tag ${tagName}`);
        }
      }
      // console.debug(`Feed item doesn't support ${tagName}`, node, tagSupported);
      return {
        itemUpdate,
        phaseUpdate,
      };
    },
    {
      itemUpdate: {},
      phaseUpdate: {},
    } as ItemUpdateResult
  );
}
