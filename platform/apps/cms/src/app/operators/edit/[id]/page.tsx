import type React from "react";
import { notFound } from "next/navigation";
import { OperatorEditor } from "@/components/operator-editor";
import { getOperator, listOffers } from "@/lib/cms-content-store";
import { listCampaigns } from "@/lib/campaign-store";
import { listLandingPages } from "@/lib/landing-store";
import { getHomeConfig } from "@/lib/home-store";
import { getPublishedSnapshot } from "@/lib/published-store";
import { listSitePages } from "@/lib/site-pages-store";
import type { HomePageConfig } from "@/lib/home.types";
import type { SitePage, SitePageSection } from "@/lib/site-pages.types";
import type { CmsCreativePlacement } from "@/lib/cms-content.types";

export const dynamic = "force-dynamic";

function collectOfferIds(home: HomePageConfig, pages: SitePage[]): Set<string> {
  const ids = new Set<string>();
  const addFromSections = (sections: SitePageSection[]): void => {
    sections.forEach((section) => {
      if (section.type !== "offers") return;
      section.content.items.forEach((item) => {
        if (item.kind === "offer") ids.add(item.offerId);
      });
    });
  };
  addFromSections(home?.sections ?? []);
  (pages ?? []).forEach((page) => addFromSections(page?.sections ?? []));
  return ids;
}

function collectPlacements(
  home: HomePageConfig,
  pages: SitePage[],
  state: CmsCreativePlacement["state"],
): Record<string, CmsCreativePlacement[]> {
  const placements: Record<string, CmsCreativePlacement[]> = {};
  const add = (offerId: string, label: string): void => {
    const current = placements[offerId] ?? [];
    if (
      !current.some(
        (placement) => placement.label === label && placement.state === state,
      )
    ) {
      current.push({ label, state });
    }
    placements[offerId] = current;
  };
  const addFromSections = (
    sections: SitePageSection[],
    label: string,
  ): void => {
    sections.forEach((section) => {
      if (section.type !== "offers") return;
      section.content.items.forEach((item) => {
        if (item.kind === "offer" || item.tie === "offer")
          add(item.offerId, label);
      });
    });
  };
  addFromSections(home?.sections ?? [], "Home");
  (pages ?? []).forEach((page) =>
    addFromSections(page?.sections ?? [], page.name),
  );
  return placements;
}

function mergePlacements(
  draft: Record<string, CmsCreativePlacement[]>,
  live: Record<string, CmsCreativePlacement[]>,
): Record<string, CmsCreativePlacement[]> {
  const ids = new Set([...Object.keys(draft), ...Object.keys(live)]);
  return [...ids].reduce<Record<string, CmsCreativePlacement[]>>(
    (result, id) => {
      result[id] = [...(live[id] ?? []), ...(draft[id] ?? [])].filter(
        (placement, index, rows) =>
          rows.findIndex(
            (row) =>
              row.label === placement.label && row.state === placement.state,
          ) === index,
      );
      return result;
    },
    {},
  );
}

export default async function EditOperatorScreen({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<React.ReactElement> {
  const { id } = await params;
  const [operator, offers, home, pages, published, campaigns, landingPages] =
    await Promise.all([
      getOperator(id),
      listOffers(),
      getHomeConfig(),
      listSitePages(),
      getPublishedSnapshot(),
      listCampaigns(),
      listLandingPages(),
    ]);
  if (operator === undefined) notFound();
  const operatorOffers = offers
    .filter((offer) => offer.operatorId === id)
    .sort((a, b) => a.id.localeCompare(b.id));
  const draftIds = collectOfferIds(home, pages);
  const liveIds = collectOfferIds(
    published.home,
    published.sitePages.filter((page) => page.status === "published"),
  );
  const offerUsage = operatorOffers.reduce<
    Record<string, "live" | "draft" | "notPlaced">
  >((acc, offer) => {
    acc[offer.id] = liveIds.has(offer.id)
      ? "live"
      : draftIds.has(offer.id)
        ? "draft"
        : "notPlaced";
    return acc;
  }, {});
  const placements = mergePlacements(
    collectPlacements(home, pages, "draft"),
    collectPlacements(
      published.home,
      published.sitePages.filter((page) => page.status === "published"),
      "live",
    ),
  );
  return (
    <OperatorEditor
      operator={operator}
      offers={operatorOffers}
      offerUsage={offerUsage}
      placements={placements}
      campaigns={campaigns.filter((campaign) => campaign.operatorId === id)}
      landingPages={landingPages}
    />
  );
}
