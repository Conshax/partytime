import {
  ensureArray,
  extractOptionalFloatAttribute,
  extractOptionalIntegerAttribute,
  extractOptionalStringAttribute,
  getAttribute,
  getKnownAttribute,
  getText,
  pubDateToDate,
} from "../shared";
import type { XmlNode } from "../types";

import { XmlNodeSource } from "./types";

export type PhasePendingPodcastId = {
  platform: string;
  url: string;
  id?: string;
};
export const id = {
  phase: Infinity,
  tag: "podcast:id",
  name: "id",
  nodeTransform: ensureArray,
  supportCheck: (node: XmlNode[]): boolean =>
    node.some((n) => Boolean(getAttribute(n, "platform")) && Boolean(getAttribute(n, "url"))),
  fn(node: XmlNode[]): { podcastId: PhasePendingPodcastId[] } {
    return {
      podcastId: node
        .map((n) => ({
          platform: getAttribute(n, "platform"),
          url: getAttribute(n, "url"),
          ...extractOptionalStringAttribute(n, "id"),
        }))
        .filter((x) => Boolean(x.platform) && Boolean(x.url)) as PhasePendingPodcastId[],
    };
  },
};

export type PhasePendingSocial = {
  platform: string;
  url: string;
  id?: string;
  name?: string;
  priority?: number;
  signUp?: SocialSignUp[];
};
type SocialSignUp = {
  homeUrl: string;
  signUpUrl: string;
  priority?: number;
};
export const social = {
  phase: Infinity,
  tag: "podcast:social",
  name: "social",
  nodeTransform: ensureArray,
  supportCheck: (node: XmlNode[], type: XmlNodeSource): boolean =>
    type === XmlNodeSource.Feed &&
    node.some(
      (n) =>
        Boolean(getAttribute(n, "platform")) &&
        (Boolean(getAttribute(n, "url")) || Boolean(getAttribute(n, "podcastAccountUrl")))
    ),
  fn(node: XmlNode[]): { podcastSocial: PhasePendingSocial[] } {
    const isValidFeedNode = (n: XmlNode): boolean =>
      Boolean(getAttribute(n, "platform")) &&
      (Boolean(getAttribute(n, "url")) || Boolean(getAttribute(n, "podcastAccountUrl")));

    return {
      podcastSocial: node.reduce<PhasePendingSocial[]>((acc, n) => {
        const url = getAttribute(n, "url") || getAttribute(n, "podcastAccountUrl");
        if (isValidFeedNode(n) && url) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          const signUps = ensureArray(n["podcast:socialSignUp"]);
          const name = getText(n);

          const signUp =
            signUps.length > 0
              ? {
                  signUp: signUps.reduce<SocialSignUp[]>((signUpAcc, signUpNode: XmlNode) => {
                    if (
                      getAttribute(signUpNode, "signUpUrl") &&
                      getAttribute(signUpNode, "homeUrl")
                    ) {
                      return [
                        ...signUpAcc,
                        {
                          signUpUrl: getKnownAttribute(signUpNode, "signUpUrl"),
                          homeUrl: getKnownAttribute(signUpNode, "homeUrl"),
                          ...extractOptionalFloatAttribute(signUpNode, "priority"),
                        },
                      ];
                    }
                    return signUpAcc;
                  }, []),
                }
              : undefined;

          return [
            ...acc,
            {
              url,
              platform: getKnownAttribute(n, "platform"),
              ...(name ? { name } : undefined),
              ...extractOptionalStringAttribute(n, "podcastAccountId", "id"),
              ...extractOptionalFloatAttribute(n, "priority"),
              ...signUp,
            },
          ];
        }

        return acc;
      }, []),
    };
  },
};

function getSocialPlatform(n: XmlNode): string | null {
  return (getAttribute(n, "platform") || getAttribute(n, "protocol")) ?? null;
}

function getSocialAccount(n: XmlNode): string | null {
  return (getAttribute(n, "podcastAccountId") || getAttribute(n, "accountId")) ?? null;
}
function getSocialUrl(n: XmlNode): string | null {
  return (getAttribute(n, "uri") || getText(n)) ?? null;
}
function getSocialProfileUrl(n: XmlNode): string | null {
  return getAttribute(n, "accountUrl") ?? null;
}

export type PhasePendingSocialInteract = {
  /** slug of social protocol being used */
  platform: string;
  /** account id of posting party */
  id: string;
  /** uri of root post/comment */
  url: string;
  /** url to posting party's platform profile */
  profileUrl?: string;
  /** DEPRECATED */
  pubDate?: Date;
  /** the order of rendering */
  priority?: number;
};
export const socialInteraction = {
  phase: Infinity,
  name: "social",
  tag: "podcast:socialInteract",
  nodeTransform: ensureArray,
  supportCheck: (node: XmlNode[], type: XmlNodeSource): boolean =>
    type === XmlNodeSource.Item &&
    node.some((n) => Boolean(getSocialPlatform(n)) && Boolean(getSocialUrl(n))),
  fn(node: XmlNode[]): { podcastSocialInteraction: PhasePendingSocialInteract[] } {
    const isValidItemNode = (n: XmlNode): boolean =>
      Boolean(getSocialPlatform(n)) && Boolean(getSocialUrl(n));

    return {
      podcastSocialInteraction: node.reduce<PhasePendingSocialInteract[]>((acc, n) => {
        if (isValidItemNode(n)) {
          const profileUrl = getSocialProfileUrl(n);
          const pubDateText = getAttribute(n, "pubDate");
          const pubDateAsDate = pubDateText && pubDateToDate(pubDateText);
          return [
            ...acc,
            {
              platform: getSocialPlatform(n)!,
              id: getSocialAccount(n) ?? "", // per https://podcastindex.social/@mitch/109821341789189954
              url: getSocialUrl(n)!,
              ...extractOptionalFloatAttribute(n, "priority"),
              ...(pubDateAsDate ? { pubDate: pubDateAsDate } : undefined),
              ...(profileUrl ? { profileUrl } : undefined),
            },
          ];
        }

        return acc;
      }, []),
    };
  },
};

export type PhasePendingPodcastRecommendation = {
  url: string;
  type: string;
  language?: string;
  text?: string;
};
export const podcastRecommendations = {
  phase: Infinity,
  name: "recommendations",
  tag: "podcast:recommendations",
  nodeTransform: (node: XmlNode | XmlNode[]): XmlNode =>
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    ensureArray(node).filter((n) => getAttribute(n, "url") && getAttribute(n, "type")),
  supportCheck: (node: XmlNode[]): boolean => node.length > 0,
  fn(node: XmlNode[]): { podcastRecommendations: PhasePendingPodcastRecommendation[] } {
    return {
      podcastRecommendations: node.map((n) => ({
        url: getKnownAttribute(n, "url"),
        type: getKnownAttribute(n, "type"),
        ...extractOptionalStringAttribute(n, "language"),
        ...(getText(n) ? { text: getText(n) } : undefined),
      })),
    };
  },
};

export type PhasePendingGateway = {
  order?: number;
  message: string;
};
export const podcastGateway = {
  phase: Infinity,
  name: "gateway",
  tag: "podcast:gateway",
  nodeTransform: (node: XmlNode | XmlNode[]): XmlNode =>
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    ensureArray(node).find((n) => getText(n)),
  supportCheck: (node: XmlNode): boolean => Boolean(getText(node)),
  fn(node: XmlNode): { podcastGateway: PhasePendingGateway } {
    return {
      podcastGateway: {
        message: getText(node),
        ...extractOptionalIntegerAttribute(node, "order"),
      },
    };
  },
};
