"use client";

import type React from "react";
import { useMemo, useState, useTransition } from "react";
import {
  ArrowLeft,
  CalendarRange,
  Copy,
  ExternalLink,
  Eye,
  EyeOff,
  FileText,
  Image as ImageIcon,
  ImagePlus,
  Layers3,
  Link2,
  Megaphone,
  Pencil,
  Plus,
  Save,
  Search,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import type { LandingPage } from "@/lib/landing-pages.types";
import { AssetPickerModal } from "@/components/asset-picker-modal";
import {
  createCampaignAction,
  createOfferForOperatorAction,
  deleteCampaignAction,
  duplicateOfferAction,
  removeOfferPlacementsAction,
  saveCampaignAction,
  saveOperatorAction,
  setCampaignStatusAction,
} from "@/app/actions";
import { notifyCmsChanged } from "@/lib/cms-events";
import { CmsSidebar } from "@/components/cms-sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import type {
  CmsCampaign,
  CmsCampaignDetails,
  CmsCreativePlacement,
  CmsOffer,
  CmsOperator,
  CmsOperatorDetails,
} from "@/lib/cms-content.types";
import { getOfferScheduleStatus } from "@/lib/offer-status";
import type { OfferScheduleStatus } from "@/lib/offer-status";
import { OfferStatusChip } from "@/components/offer-status-chip";
import { CampaignTimeline } from "@/components/campaign-timeline";
import { CommercialWorkspace } from "@/components/commercial-workspace";
import type {
  CmsBrandAccount,
  CmsCommercialDeal,
} from "@/lib/commercial.types";

interface OperatorEditorProps {
  operator: CmsOperator;
  offers: CmsOffer[];
  offerUsage: Record<string, "live" | "draft" | "notPlaced">;
  placements: Record<string, CmsCreativePlacement[]>;
  campaigns: CmsCampaign[];
  landingPages: LandingPage[];
  brandAccounts: CmsBrandAccount[];
  commercialDeals: CmsCommercialDeal[];
}

type WorkspaceTab = "creative" | "campaigns" | "commercial" | "brand";
type CreativeFilter = "all" | "offers" | "banners" | "landingPages";
type StatusFilter = "all" | OfferScheduleStatus;

const workspaceTabs: { id: WorkspaceTab; label: string }[] = [
  { id: "creative", label: "Creative" },
  { id: "campaigns", label: "Campaigns" },
  { id: "commercial", label: "Commercial" },
  { id: "brand", label: "Brand content" },
];

const creativeFilters: { id: CreativeFilter; label: string }[] = [
  { id: "all", label: "All creative" },
  { id: "offers", label: "Offers" },
  { id: "banners", label: "Banners" },
  { id: "landingPages", label: "Landing pages" },
];

const statusFilters: { id: StatusFilter; label: string }[] = [
  { id: "all", label: "All statuses" },
  { id: "live", label: "Live" },
  { id: "scheduled", label: "Scheduled" },
  { id: "ended", label: "Ended" },
  { id: "hidden", label: "Hidden" },
];

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDay(iso: string): string {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function scheduleSummary(item: {
  startDate: string | null;
  endDate: string | null;
}): string {
  if (item.startDate === null && item.endDate === null) return "Always on";
  const start = item.startDate === null ? "Open" : formatDay(item.startDate);
  const end = item.endDate === null ? "No end" : formatDay(item.endDate);
  return start + " → " + end;
}

function campaignDetails(campaign: CmsCampaign): CmsCampaignDetails {
  return {
    name: campaign.name,
    offerIds: campaign.offerIds,
    landingPageIds: campaign.landingPageIds,
    trackingHref: campaign.trackingHref,
    startDate: campaign.startDate,
    endDate: campaign.endDate,
  };
}

function toggleId(ids: string[], id: string): string[] {
  return ids.includes(id) ? ids.filter((item) => item !== id) : [...ids, id];
}

export function OperatorEditor({
  operator,
  offers,
  offerUsage,
  placements,
  campaigns,
  landingPages,
  brandAccounts,
  commercialDeals,
}: OperatorEditorProps): React.ReactElement {
  const router = useRouter();
  const [tab, setTab] = useState<WorkspaceTab>("creative");
  const [creativeFilter, setCreativeFilter] = useState<CreativeFilter>("all");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
  const [query, setQuery] = useState("");
  const [details, setDetails] = useState<CmsOperatorDetails>({
    name: operator.name,
    slug: operator.slug,
    logoSrc: operator.logoSrc,
    reviewIntro: operator.reviewIntro,
    reviewBody: operator.reviewBody,
  });
  const [campaignDrafts, setCampaignDrafts] = useState<
    Record<string, CmsCampaignDetails>
  >(
    Object.fromEntries(
      campaigns.map((campaign) => [campaign.id, campaignDetails(campaign)]),
    ),
  );
  const [dirty, setDirty] = useState(false);
  const [saved, setSaved] = useState(false);
  const [pending, startTransition] = useTransition();
  const [adding, startAdd] = useTransition();
  const [duplicating, startDuplicate] = useTransition();
  const [changingOfferStatus, startOfferStatusChange] = useTransition();
  const [campaignPending, startCampaignTransition] = useTransition();
  const [pickerOpen, setPickerOpen] = useState(false);

  const assignedLandingPageIds = useMemo(
    () => new Set(campaigns.flatMap((campaign) => campaign.landingPageIds)),
    [campaigns],
  );
  const relevantLandingPages = landingPages.filter((page) =>
    assignedLandingPageIds.has(page.id),
  );
  const liveOfferCount = offers.filter(
    (offer) => getOfferScheduleStatus(offer) === "live",
  ).length;
  const bannerCount = offers.filter((offer) => offer.banner !== null).length;
  const lowerQuery = query.trim().toLowerCase();
  const visibleOffers = offers.filter((offer) => {
    const matchesType = creativeFilter === "all" || creativeFilter === "offers";
    const matchesStatus =
      statusFilter === "all" || getOfferScheduleStatus(offer) === statusFilter;
    const matchesQuery =
      lowerQuery === "" ||
      offer.headline.toLowerCase().includes(lowerQuery) ||
      offer.label.toLowerCase().includes(lowerQuery);
    return matchesType && matchesStatus && matchesQuery;
  });
  const visibleBanners = offers.filter((offer) => {
    if (offer.banner === null) return false;
    const matchesType =
      creativeFilter === "all" || creativeFilter === "banners";
    const matchesStatus =
      statusFilter === "all" || getOfferScheduleStatus(offer) === statusFilter;
    const matchesQuery =
      lowerQuery === "" || offer.headline.toLowerCase().includes(lowerQuery);
    return matchesType && matchesStatus && matchesQuery;
  });
  const visibleLandingPages = relevantLandingPages.filter((page) => {
    const matchesType =
      creativeFilter === "all" || creativeFilter === "landingPages";
    const pageStatus: OfferScheduleStatus =
      page.status === "published" ? "live" : "hidden";
    const matchesStatus = statusFilter === "all" || statusFilter === pageStatus;
    const matchesQuery =
      lowerQuery === "" || page.name.toLowerCase().includes(lowerQuery);
    return matchesType && matchesStatus && matchesQuery;
  });
  const visibleCreativeCount =
    visibleOffers.length + visibleBanners.length + visibleLandingPages.length;
  const creativeFilterCounts: Record<CreativeFilter, number> = {
    all: offers.length + bannerCount + relevantLandingPages.length,
    offers: offers.length,
    banners: bannerCount,
    landingPages: relevantLandingPages.length,
  };

  function updateField<K extends keyof CmsOperatorDetails>(
    key: K,
    value: CmsOperatorDetails[K],
  ): void {
    setDetails((current) => ({ ...current, [key]: value }));
    setDirty(true);
    setSaved(false);
  }

  function save(): void {
    startTransition(async () => {
      await saveOperatorAction(operator.id, details);
      notifyCmsChanged();
      setDirty(false);
      setSaved(true);
    });
  }

  function addOffer(): void {
    startAdd(() =>
      createOfferForOperatorAction(
        operator.id,
        "/operators/edit/" + operator.id,
      ),
    );
  }

  function editOffer(offerId: string): void {
    router.push(
      "/offers/edit/" +
        offerId +
        "?returnTo=" +
        encodeURIComponent("/operators/edit/" + operator.id),
    );
  }

  function duplicateOffer(offerId: string): void {
    startDuplicate(async () => {
      await duplicateOfferAction(offerId, operator.id);
      notifyCmsChanged();
      router.refresh();
    });
  }

  function removeOfferPlacements(offerId: string): void {
    startOfferStatusChange(async () => {
      await removeOfferPlacementsAction(offerId, operator.id);
      notifyCmsChanged();
      router.refresh();
    });
  }

  function createCampaign(): void {
    startCampaignTransition(async () => {
      await createCampaignAction(operator.id);
      setTab("campaigns");
      router.refresh();
    });
  }

  function updateCampaignDraft<K extends keyof CmsCampaignDetails>(
    campaign: CmsCampaign,
    key: K,
    value: CmsCampaignDetails[K],
  ): void {
    setCampaignDrafts((current) => ({
      ...current,
      [campaign.id]: {
        ...(current[campaign.id] ?? campaignDetails(campaign)),
        [key]: value,
      },
    }));
  }

  function saveCampaign(campaign: CmsCampaign): void {
    const draft = campaignDrafts[campaign.id] ?? campaignDetails(campaign);
    startCampaignTransition(async () => {
      await saveCampaignAction(campaign.id, operator.id, draft);
      notifyCmsChanged();
      router.refresh();
    });
  }

  function changeCampaignStatus(campaign: CmsCampaign): void {
    const status = campaign.status === "active" ? "hidden" : "active";
    startCampaignTransition(async () => {
      await setCampaignStatusAction(campaign.id, operator.id, status);
      notifyCmsChanged();
      router.refresh();
    });
  }

  function removeCampaign(campaign: CmsCampaign): void {
    startCampaignTransition(async () => {
      await deleteCampaignAction(campaign.id, operator.id);
      router.refresh();
    });
  }

  function campaignNamesFor(kind: "offer" | "landing", id: string): string[] {
    return campaigns
      .filter((campaign) =>
        kind === "offer"
          ? campaign.offerIds.includes(id)
          : campaign.landingPageIds.includes(id),
      )
      .map((campaign) => campaign.name);
  }

  function placementChips(offerId: string): React.ReactElement {
    const rows = placements[offerId] ?? [];
    if (rows.length === 0) {
      return (
        <span className="text-[11px] text-m3-on-surface-variant">
          Not placed
        </span>
      );
    }
    return (
      <span className="flex flex-wrap gap-1">
        {rows.map((placement) => (
          <span
            key={placement.state + placement.label}
            className={
              "rounded-full px-2 py-0.5 text-[10px] " +
              (placement.state === "live"
                ? "bg-m3-success-container text-m3-on-success"
                : "bg-m3-gold/15 text-m3-on-surface")
            }
          >
            {placement.label} · {placement.state}
          </span>
        ))}
      </span>
    );
  }

  const inputClass =
    "h-10 rounded-md border border-m3-outline-variant bg-m3-surface-low px-3 text-[13px] focus:outline-none focus:border-m3-gold";

  return (
    <div className="h-full flex">
      <CmsSidebar active="operators" />
      <main className="flex-1 min-w-0 flex flex-col">
        <header className="shrink-0 flex items-center justify-between px-6 h-14 border-b border-m3-outline-variant">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={() => router.push("/operators")}
              className="h-8 w-8 rounded-md border border-m3-outline-variant flex items-center justify-center text-m3-on-surface hover:bg-m3-surface-high"
              aria-label="Back to operators"
            >
              <ArrowLeft size={16} />
            </button>
            <div className="min-w-0">
              <div className="text-[15px] font-medium truncate">
                {details.name || "Operator"}
              </div>
              <div className="text-[11px] text-m3-on-surface-variant">
                Updated {formatDate(operator.updatedAt)}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            {tab === "brand" && (
              <button
                type="button"
                disabled={pending || !dirty}
                onClick={save}
                className="flex items-center gap-1.5 text-[13px] font-medium px-3.5 py-2 rounded-lg bg-m3-gold text-m3-on-gold hover:brightness-95 disabled:opacity-40"
              >
                <Save size={15} />
                {pending ? "Saving" : saved ? "Saved" : "Save brand content"}
              </button>
            )}
          </div>
        </header>

        <div className="shrink-0 px-6 border-b border-m3-outline-variant bg-m3-surface-lowest">
          <div className="flex items-center gap-1">
            {workspaceTabs.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={
                  "px-4 h-11 text-[13px] font-medium border-b-2 transition-colors " +
                  (tab === item.id
                    ? "border-m3-gold text-m3-on-surface"
                    : "border-transparent text-m3-on-surface-variant hover:text-m3-on-surface")
                }
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto p-6">
          <div className="w-full max-w-[1440px] mx-auto flex flex-col gap-5">
            <section className="rounded-xl border border-m3-outline-variant bg-m3-surface-lowest overflow-hidden">
              <div className="bg-m3-surface-low p-5 flex flex-col gap-5 lg:flex-row lg:items-center">
                <div className="h-20 w-32 shrink-0 rounded-lg bg-m3-surface-lowest border border-m3-outline-variant overflow-hidden flex items-center justify-center p-3">
                  <img
                    src={details.logoSrc}
                    alt=""
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-[11px] font-medium uppercase tracking-[0.12em] text-m3-on-surface-variant">
                    Commercial workspace
                  </div>
                  <h1 className="text-[28px] leading-8 font-medium truncate mt-1">
                    {details.name || "Operator"}
                  </h1>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="rounded-full bg-m3-success-container text-m3-on-success px-2.5 py-1 text-[11px] capitalize">
                      {operator.status}
                    </span>
                    <span className="text-[11px] text-m3-on-surface-variant truncate">
                      /operator/{details.slug}
                    </span>
                  </div>
                </div>
                <div className="grid w-full grid-cols-2 gap-2 lg:w-auto lg:grid-cols-4 lg:shrink-0">
                  {[
                    ["Offers", offers.length],
                    ["Live", liveOfferCount],
                    ["Banners", bannerCount],
                    ["Campaigns", campaigns.length],
                  ].map(([label, value]) => (
                    <div
                      key={label}
                      className="min-w-20 rounded-lg border border-m3-outline-variant bg-m3-surface-lowest p-3 text-center"
                    >
                      <div className="text-[22px] font-medium">{value}</div>
                      <div className="text-[10px] text-m3-on-surface-variant">
                        {label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {tab === "creative" && (
              <section className="rounded-xl border border-m3-outline-variant bg-m3-surface-lowest p-5 flex flex-col gap-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-[11px] font-medium uppercase tracking-[0.12em] text-m3-on-surface-variant">
                      What is running
                    </div>
                    <h2 className="text-[20px] font-medium mt-1">
                      Creative board
                    </h2>
                    <p className="text-[12px] text-m3-on-surface-variant mt-1">
                      Offers, banners and campaign landing pages with schedule,
                      placement and tracking context.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={addOffer}
                    disabled={adding}
                    className="flex items-center gap-1.5 text-[12px] font-medium px-3 py-2 rounded-md bg-m3-gold text-m3-on-gold hover:brightness-95 disabled:opacity-40"
                  >
                    <Plus size={14} />
                    {adding ? "Adding…" : "Add offer"}
                  </button>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {creativeFilters.map((filter) => (
                    <button
                      key={filter.id}
                      type="button"
                      onClick={() => setCreativeFilter(filter.id)}
                      className={
                        "rounded-full border px-3 py-1.5 text-[11px] font-medium " +
                        (creativeFilter === filter.id
                          ? "border-m3-gold bg-m3-gold/15 text-m3-on-surface"
                          : "border-m3-outline-variant text-m3-on-surface-variant hover:bg-m3-surface-high")
                      }
                    >
                      {filter.label}
                      <span className="ml-1.5 text-[10px] opacity-70">
                        {creativeFilterCounts[filter.id]}
                      </span>
                    </button>
                  ))}
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <div className="flex items-center gap-2 h-9 min-w-64 flex-1 rounded-md border border-m3-outline-variant bg-m3-surface-low px-3">
                    <Search size={14} className="text-m3-on-surface-variant" />
                    <input
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      placeholder="Search creative"
                      className="min-w-0 flex-1 bg-transparent text-[12px] focus:outline-none"
                    />
                  </div>
                  {statusFilters.map((filter) => (
                    <button
                      key={filter.id}
                      type="button"
                      onClick={() => setStatusFilter(filter.id)}
                      className={
                        "rounded-md px-2.5 py-2 text-[11px] " +
                        (statusFilter === filter.id
                          ? "bg-m3-surface-highest text-m3-on-surface font-medium"
                          : "text-m3-on-surface-variant hover:bg-m3-surface-high")
                      }
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
                <div className="text-[11px] text-m3-on-surface-variant">
                  {visibleCreativeCount} creative item
                  {visibleCreativeCount === 1 ? "" : "s"}
                </div>
                <div className="flex flex-col gap-2">
                  {visibleOffers.map((offer) => {
                    const usage = offerUsage[offer.id];
                    const canHide = usage === "live" || usage === "draft";
                    const campaignNames = campaignNamesFor("offer", offer.id);
                    return (
                      <div
                        key={"offer-" + offer.id}
                        className="grid grid-cols-1 gap-3 rounded-lg border border-m3-outline-variant p-3 lg:grid-cols-[minmax(200px,1.4fr)_minmax(150px,1fr)_minmax(160px,1fr)_auto] lg:items-center lg:gap-4"
                      >
                        <div className="min-w-0 flex items-start gap-3">
                          <div className="h-9 w-9 rounded-md bg-m3-surface-high flex items-center justify-center shrink-0">
                            <Megaphone size={16} />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-[13px] font-medium truncate">
                                {offer.headline}
                              </span>
                              <OfferStatusChip
                                status={getOfferScheduleStatus(offer)}
                              />
                            </div>
                            <div className="text-[11px] text-m3-on-surface-variant truncate mt-0.5">
                              Offer · {offer.label} · {scheduleSummary(offer)}
                            </div>
                          </div>
                        </div>
                        <div className="min-w-0">
                          <div className="text-[10px] uppercase tracking-wide text-m3-on-surface-variant mb-1">
                            Placement
                          </div>
                          {placementChips(offer.id)}
                        </div>
                        <div className="min-w-0">
                          <div className="text-[10px] uppercase tracking-wide text-m3-on-surface-variant mb-1">
                            Campaign / tracking
                          </div>
                          <div className="text-[11px] truncate">
                            {campaignNames.length > 0
                              ? campaignNames.join(", ")
                              : "No campaign"}
                          </div>
                          <div className="text-[10px] text-m3-on-surface-variant truncate">
                            {offer.ctaHref || "No tracking link"}
                          </div>
                        </div>
                        <div className="flex items-center justify-end gap-1 border-t border-m3-outline-variant pt-2 lg:border-t-0 lg:pt-0">
                          <button
                            type="button"
                            onClick={() => removeOfferPlacements(offer.id)}
                            disabled={changingOfferStatus || !canHide}
                            aria-label={
                              canHide
                                ? "Hide offer from site"
                                : "Offer is not placed"
                            }
                            className="w-8 h-8 rounded-md flex items-center justify-center text-m3-on-surface-variant hover:bg-m3-surface-high disabled:opacity-30"
                          >
                            {canHide ? <EyeOff size={14} /> : <Eye size={14} />}
                          </button>
                          <button
                            type="button"
                            onClick={() => duplicateOffer(offer.id)}
                            disabled={duplicating}
                            aria-label="Duplicate offer"
                            className="w-8 h-8 rounded-md flex items-center justify-center text-m3-on-surface-variant hover:bg-m3-surface-high disabled:opacity-30"
                          >
                            <Copy size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={() => editOffer(offer.id)}
                            aria-label="Edit offer"
                            className="w-8 h-8 rounded-md flex items-center justify-center text-m3-on-surface-variant hover:bg-m3-surface-high"
                          >
                            <Pencil size={14} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                  {visibleBanners.map((offer) => (
                    <button
                      key={"banner-" + offer.id}
                      type="button"
                      onClick={() => editOffer(offer.id)}
                      className="grid grid-cols-1 gap-3 rounded-lg border border-m3-outline-variant p-3 text-left hover:bg-m3-surface-high lg:grid-cols-[minmax(200px,1.4fr)_minmax(150px,1fr)_minmax(160px,1fr)_auto] lg:items-center lg:gap-4"
                    >
                      <span className="min-w-0 flex items-start gap-3">
                        <span className="h-9 w-9 rounded-md bg-m3-gold/15 flex items-center justify-center shrink-0">
                          <ImageIcon size={16} />
                        </span>
                        <span className="min-w-0">
                          <span className="flex items-center gap-2">
                            <span className="text-[13px] font-medium truncate">
                              {offer.headline} banner
                            </span>
                            <OfferStatusChip
                              status={getOfferScheduleStatus(offer)}
                            />
                          </span>
                          <span className="block text-[11px] text-m3-on-surface-variant truncate mt-0.5">
                            Offer banner · {scheduleSummary(offer)}
                          </span>
                        </span>
                      </span>
                      <span>{placementChips(offer.id)}</span>
                      <span className="min-w-0">
                        <span className="block text-[10px] uppercase tracking-wide text-m3-on-surface-variant mb-1">
                          Destination
                        </span>
                        <span className="block text-[11px] truncate">
                          {offer.banner?.href || offer.ctaHref}
                        </span>
                      </span>
                      <Pencil
                        size={14}
                        className="text-m3-on-surface-variant"
                      />
                    </button>
                  ))}
                  {visibleLandingPages.map((page) => (
                    <button
                      key={"landing-" + page.id}
                      type="button"
                      onClick={() => router.push("/edit/" + page.id)}
                      className="grid grid-cols-1 gap-3 rounded-lg border border-m3-outline-variant p-3 text-left hover:bg-m3-surface-high lg:grid-cols-[minmax(200px,1.4fr)_minmax(150px,1fr)_minmax(160px,1fr)_auto] lg:items-center lg:gap-4"
                    >
                      <span className="min-w-0 flex items-start gap-3">
                        <span className="h-9 w-9 rounded-md bg-m3-surface-high flex items-center justify-center shrink-0">
                          <FileText size={16} />
                        </span>
                        <span className="min-w-0">
                          <span className="flex items-center gap-2">
                            <span className="text-[13px] font-medium truncate">
                              {page.name}
                            </span>
                            <OfferStatusChip
                              status={
                                page.status === "published" ? "live" : "hidden"
                              }
                            />
                          </span>
                          <span className="block text-[11px] text-m3-on-surface-variant truncate mt-0.5">
                            Landing page · /signup/{page.slug}
                          </span>
                        </span>
                      </span>
                      <span className="text-[11px] text-m3-on-surface-variant">
                        {page.status === "published"
                          ? "Shown on site"
                          : "Draft intent"}
                      </span>
                      <span className="text-[11px] truncate">
                        {campaignNamesFor("landing", page.id).join(", ")}
                      </span>
                      <ExternalLink
                        size={14}
                        className="text-m3-on-surface-variant"
                      />
                    </button>
                  ))}
                  {visibleCreativeCount === 0 && (
                    <div className="rounded-lg border border-dashed border-m3-outline-variant p-8 text-center text-[12px] text-m3-on-surface-variant">
                      No creative matches these filters.
                    </div>
                  )}
                </div>
              </section>
            )}

            {tab === "campaigns" && (
              <section className="flex flex-col gap-4">
                <div className="rounded-xl border border-m3-outline-variant bg-m3-surface-lowest p-5 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] font-medium uppercase tracking-[0.12em] text-m3-on-surface-variant">
                      Campaign workspace
                    </div>
                    <h2 className="text-[20px] font-medium mt-1">Campaigns</h2>
                    <p className="mt-1 w-full text-[12px] text-m3-on-surface-variant">
                      Group offers, their banners and landing pages under one
                      schedule and tracking link. Saving applies the campaign
                      dates to its offers; activate or pause sets the visibility
                      intent for all selected creative before the next global
                      Publish.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={createCampaign}
                    disabled={campaignPending}
                    className="flex shrink-0 items-center gap-1.5 text-[12px] font-medium px-3 py-2 rounded-md bg-m3-gold text-m3-on-gold hover:brightness-95 disabled:opacity-40"
                  >
                    <Plus size={14} />
                    New campaign
                  </button>
                </div>
                <CampaignTimeline campaigns={campaigns} />
                <div className="grid grid-cols-1 gap-5 items-start">
                  <div className="flex flex-col gap-4">
                    {campaigns.map((campaign) => {
                      const draft =
                        campaignDrafts[campaign.id] ??
                        campaignDetails(campaign);
                      return (
                        <div
                          key={campaign.id}
                          className="rounded-xl border border-m3-outline-variant bg-m3-surface-lowest overflow-hidden"
                        >
                          <div className="p-4 bg-m3-surface-low border-b border-m3-outline-variant flex items-center justify-between gap-3">
                            <div className="flex items-center gap-3 min-w-0">
                              <div className="h-9 w-9 rounded-md bg-m3-gold/15 flex items-center justify-center shrink-0">
                                <Layers3 size={17} />
                              </div>
                              <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="text-[14px] font-medium truncate">
                                    {campaign.name}
                                  </span>
                                  <OfferStatusChip
                                    status={getOfferScheduleStatus(campaign)}
                                  />
                                </div>
                                <div className="text-[10px] text-m3-on-surface-variant">
                                  Updated {formatDate(campaign.updatedAt)}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => changeCampaignStatus(campaign)}
                                disabled={campaignPending}
                                className="px-2.5 py-1.5 rounded-md border border-m3-outline-variant text-[11px] hover:bg-m3-surface-high disabled:opacity-40"
                              >
                                {campaign.status === "active"
                                  ? "Pause campaign"
                                  : "Activate campaign"}
                              </button>
                              <button
                                type="button"
                                onClick={() => removeCampaign(campaign)}
                                disabled={campaignPending}
                                aria-label="Delete campaign"
                                className="w-8 h-8 rounded-md flex items-center justify-center text-m3-error hover:bg-m3-error-container disabled:opacity-40"
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                          <div className="p-4 flex flex-col gap-4">
                            <div className="grid grid-cols-2 gap-3">
                              <label className="flex flex-col gap-1.5 text-[11px] font-medium">
                                Campaign name
                                <input
                                  value={draft.name}
                                  onChange={(event) =>
                                    updateCampaignDraft(
                                      campaign,
                                      "name",
                                      event.target.value,
                                    )
                                  }
                                  className={inputClass}
                                />
                              </label>
                              <label className="flex flex-col gap-1.5 text-[11px] font-medium">
                                Tracking link
                                <span className="relative">
                                  <Link2
                                    size={14}
                                    className="absolute left-3 top-3 text-m3-on-surface-variant"
                                  />
                                  <input
                                    value={draft.trackingHref}
                                    onChange={(event) =>
                                      updateCampaignDraft(
                                        campaign,
                                        "trackingHref",
                                        event.target.value,
                                      )
                                    }
                                    placeholder="https://…"
                                    className={inputClass + " w-full pl-9"}
                                  />
                                </span>
                              </label>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <label className="flex flex-col gap-1.5 text-[11px] font-medium">
                                Start date
                                <input
                                  type="date"
                                  value={draft.startDate ?? ""}
                                  max={draft.endDate ?? undefined}
                                  onChange={(event) =>
                                    updateCampaignDraft(
                                      campaign,
                                      "startDate",
                                      event.target.value || null,
                                    )
                                  }
                                  className={inputClass}
                                />
                              </label>
                              <label className="flex flex-col gap-1.5 text-[11px] font-medium">
                                End date
                                <input
                                  type="date"
                                  value={draft.endDate ?? ""}
                                  min={draft.startDate ?? undefined}
                                  onChange={(event) =>
                                    updateCampaignDraft(
                                      campaign,
                                      "endDate",
                                      event.target.value || null,
                                    )
                                  }
                                  className={inputClass}
                                />
                              </label>
                            </div>
                            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                              <div className="flex flex-col gap-2">
                                <div className="text-[11px] font-medium">
                                  Offers and offer banners
                                </div>
                                {offers.map((offer) => (
                                  <label
                                    key={offer.id}
                                    className="flex items-center gap-2 rounded-md border border-m3-outline-variant p-2 text-[11px]"
                                  >
                                    <input
                                      type="checkbox"
                                      checked={draft.offerIds.includes(
                                        offer.id,
                                      )}
                                      onChange={() =>
                                        updateCampaignDraft(
                                          campaign,
                                          "offerIds",
                                          toggleId(draft.offerIds, offer.id),
                                        )
                                      }
                                    />
                                    <span className="min-w-0 flex-1 truncate">
                                      {offer.headline}
                                    </span>
                                    {offer.banner !== null && (
                                      <ImageIcon
                                        size={12}
                                        className="text-m3-gold"
                                      />
                                    )}
                                    <OfferStatusChip
                                      status={getOfferScheduleStatus(offer)}
                                    />
                                  </label>
                                ))}
                              </div>
                              <div className="flex flex-col gap-2">
                                <div className="text-[11px] font-medium">
                                  Landing pages
                                </div>
                                {landingPages.map((page) => (
                                  <label
                                    key={page.id}
                                    className="flex items-center gap-2 rounded-md border border-m3-outline-variant p-2 text-[11px]"
                                  >
                                    <input
                                      type="checkbox"
                                      checked={draft.landingPageIds.includes(
                                        page.id,
                                      )}
                                      onChange={() =>
                                        updateCampaignDraft(
                                          campaign,
                                          "landingPageIds",
                                          toggleId(
                                            draft.landingPageIds,
                                            page.id,
                                          ),
                                        )
                                      }
                                    />
                                    <span className="min-w-0 flex-1 truncate">
                                      {page.name}
                                    </span>
                                    <span className="text-[10px] text-m3-on-surface-variant capitalize">
                                      {page.status}
                                    </span>
                                  </label>
                                ))}
                              </div>
                            </div>
                            <div className="flex items-center justify-between border-t border-m3-outline-variant pt-3">
                              <div className="text-[11px] text-m3-on-surface-variant flex items-center gap-1.5">
                                <CalendarRange size={13} />
                                {scheduleSummary(draft)} ·{" "}
                                {draft.offerIds.length} offers ·{" "}
                                {draft.landingPageIds.length} landing pages
                              </div>
                              <button
                                type="button"
                                onClick={() => saveCampaign(campaign)}
                                disabled={campaignPending}
                                className="flex items-center gap-1.5 px-3 py-2 rounded-md bg-m3-gold text-m3-on-gold text-[12px] font-medium disabled:opacity-40"
                              >
                                <Save size={14} />
                                Save campaign
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    {campaigns.length === 0 && (
                      <div className="rounded-xl border border-dashed border-m3-outline-variant bg-m3-surface-lowest p-10 text-center">
                        <Layers3
                          size={24}
                          className="mx-auto text-m3-on-surface-variant"
                        />
                        <div className="text-[14px] font-medium mt-3">
                          No campaigns yet
                        </div>
                        <p className="text-[11px] text-m3-on-surface-variant mt-1">
                          Create one to group this operator’s offer, banner and
                          landing-page creative.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </section>
            )}

            {tab === "commercial" && (
              <CommercialWorkspace
                operatorId={operator.id}
                accounts={brandAccounts}
                deals={commercialDeals}
              />
            )}

            {tab === "brand" && (
              <section className="w-full rounded-xl border border-m3-outline-variant bg-m3-surface-lowest p-5 flex flex-col gap-4">
                <div>
                  <div className="text-[11px] font-medium uppercase tracking-[0.12em] text-m3-on-surface-variant">
                    Brand content
                  </div>
                  <h2 className="text-[20px] font-medium mt-1">
                    Operator details
                  </h2>
                  <p className="text-[12px] text-m3-on-surface-variant mt-1">
                    Identity and review copy used across the public site.
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <label className="flex flex-col gap-1.5 text-[12px] font-medium">
                    Name
                    <input
                      value={details.name}
                      onChange={(event) =>
                        updateField("name", event.target.value)
                      }
                      className={inputClass}
                    />
                  </label>
                  <label className="flex flex-col gap-1.5 text-[12px] font-medium">
                    URL slug
                    <input
                      value={details.slug}
                      onChange={(event) =>
                        updateField("slug", event.target.value)
                      }
                      className={inputClass}
                    />
                  </label>
                </div>
                <div className="flex flex-col gap-1.5 text-[12px] font-medium">
                  Logo
                  <div className="flex items-center gap-3">
                    <div className="h-14 w-24 rounded-md border border-m3-outline-variant bg-m3-surface-low overflow-hidden flex items-center justify-center">
                      <img
                        src={details.logoSrc}
                        alt=""
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => setPickerOpen(true)}
                      className="flex items-center gap-1.5 text-[12px] px-3 py-2 rounded-md border border-m3-outline-variant hover:bg-m3-surface-high"
                    >
                      <ImagePlus size={14} />
                      Choose or upload
                    </button>
                  </div>
                  <input
                    value={details.logoSrc}
                    onChange={(event) =>
                      updateField("logoSrc", event.target.value)
                    }
                    className={inputClass}
                  />
                </div>
                <label className="flex flex-col gap-1.5 text-[12px] font-medium">
                  Review intro
                  <textarea
                    value={details.reviewIntro}
                    onChange={(event) =>
                      updateField("reviewIntro", event.target.value)
                    }
                    rows={4}
                    className="rounded-md border border-m3-outline-variant bg-m3-surface-low px-3 py-2 text-[13px] leading-5 focus:outline-none focus:border-m3-gold resize-y"
                  />
                </label>
                <label className="flex flex-col gap-1.5 text-[12px] font-medium">
                  Review body
                  <textarea
                    value={details.reviewBody}
                    onChange={(event) =>
                      updateField("reviewBody", event.target.value)
                    }
                    rows={8}
                    className="rounded-md border border-m3-outline-variant bg-m3-surface-low px-3 py-2 text-[13px] leading-5 focus:outline-none focus:border-m3-gold resize-y"
                  />
                </label>
              </section>
            )}
          </div>
        </div>
      </main>
      <AssetPickerModal
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onSelect={(path) => updateField("logoSrc", path)}
      />
    </div>
  );
}
