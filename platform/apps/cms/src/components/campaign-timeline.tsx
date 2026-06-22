"use client";

import type React from "react";
import { useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import type { CmsCampaign } from "@/lib/cms-content.types";
import { getOfferScheduleStatus } from "@/lib/offer-status";
import { OfferStatusChip } from "@/components/offer-status-chip";

interface CampaignTimelineProps {
  campaigns: CmsCampaign[];
}

function monthStart(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function isoDay(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return year + "-" + month + "-" + day;
}

function monthLabel(date: Date): string {
  return date.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
}

function shiftMonth(date: Date, delta: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + delta, 1);
}

function campaignRange(
  campaign: CmsCampaign,
  startIso: string,
  endIso: string,
  days: number,
): { start: number; span: number } | null {
  const campaignStart = campaign.startDate ?? startIso;
  const campaignEnd = campaign.endDate ?? endIso;
  if (campaignStart > endIso || campaignEnd < startIso) return null;
  const visibleStart = campaignStart < startIso ? startIso : campaignStart;
  const visibleEnd = campaignEnd > endIso ? endIso : campaignEnd;
  const start = Number(visibleStart.slice(-2));
  const end = Number(visibleEnd.slice(-2));
  return { start, span: Math.min(days, end) - start + 1 };
}

export function CampaignTimeline({
  campaigns,
}: CampaignTimelineProps): React.ReactElement {
  const [visibleMonth, setVisibleMonth] = useState(() =>
    monthStart(new Date()),
  );
  const days = new Date(
    visibleMonth.getFullYear(),
    visibleMonth.getMonth() + 1,
    0,
  ).getDate();
  const startIso = isoDay(visibleMonth);
  const endIso = isoDay(
    new Date(visibleMonth.getFullYear(), visibleMonth.getMonth(), days),
  );
  const todayIso = isoDay(new Date());
  const gridStyle = {
    gridTemplateColumns:
      "minmax(150px, 190px) repeat(" + days + ", minmax(28px, 1fr))",
  };

  return (
    <section className="rounded-xl border border-m3-outline-variant bg-m3-surface-lowest overflow-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-m3-outline-variant bg-m3-surface-low p-4">
        <div>
          <div className="flex items-center gap-2 text-[14px] font-medium">
            <CalendarDays size={16} />
            Campaign calendar
          </div>
          <p className="mt-1 text-[11px] text-m3-on-surface-variant">
            One month across every campaign schedule for this operator.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setVisibleMonth(monthStart(new Date()))}
            className="rounded-md border border-m3-outline-variant px-2.5 py-1.5 text-[11px] hover:bg-m3-surface-high"
          >
            Today
          </button>
          <button
            type="button"
            onClick={() => setVisibleMonth((date) => shiftMonth(date, -1))}
            aria-label="Previous month"
            className="h-8 w-8 rounded-md border border-m3-outline-variant flex items-center justify-center hover:bg-m3-surface-high"
          >
            <ChevronLeft size={15} />
          </button>
          <div className="min-w-32 text-center text-[13px] font-medium">
            {monthLabel(visibleMonth)}
          </div>
          <button
            type="button"
            onClick={() => setVisibleMonth((date) => shiftMonth(date, 1))}
            aria-label="Next month"
            className="h-8 w-8 rounded-md border border-m3-outline-variant flex items-center justify-center hover:bg-m3-surface-high"
          >
            <ChevronRight size={15} />
          </button>
        </div>
      </div>
      <div className="overflow-x-auto p-4">
        <div className="min-w-[1040px]">
          <div
            className="grid border-b border-m3-outline-variant"
            style={gridStyle}
          >
            <div className="p-2 text-[10px] font-medium uppercase tracking-wide text-m3-on-surface-variant">
              Campaign
            </div>
            {Array.from({ length: days }, (_, index) => {
              const day = index + 1;
              const dateIso =
                startIso.slice(0, 8) + String(day).padStart(2, "0");
              return (
                <div
                  key={day}
                  className={
                    "border-l border-m3-outline-variant p-2 text-center text-[10px] " +
                    (dateIso === todayIso
                      ? "bg-m3-gold/15 font-medium text-m3-on-surface"
                      : "text-m3-on-surface-variant")
                  }
                >
                  {day}
                </div>
              );
            })}
          </div>
          {campaigns.map((campaign) => {
            const range = campaignRange(campaign, startIso, endIso, days);
            return (
              <div
                key={campaign.id}
                className="grid min-h-14 border-b border-m3-outline-variant last:border-b-0"
                style={gridStyle}
              >
                <div className="min-w-0 p-2">
                  <div className="flex items-center gap-1.5">
                    <span className="truncate text-[11px] font-medium">
                      {campaign.name}
                    </span>
                    <OfferStatusChip
                      status={getOfferScheduleStatus(campaign)}
                    />
                  </div>
                  <div className="mt-1 text-[10px] text-m3-on-surface-variant">
                    {campaign.offerIds.length} offers ·{" "}
                    {campaign.landingPageIds.length} pages
                  </div>
                </div>
                <div
                  className="col-start-2 col-end-[-1] row-start-1 grid"
                  style={{
                    gridTemplateColumns:
                      "repeat(" + days + ", minmax(28px, 1fr))",
                  }}
                >
                  {Array.from({ length: days }, (_, index) => (
                    <div
                      key={index}
                      className="border-l border-m3-outline-variant"
                    />
                  ))}
                </div>
                {range !== null && (
                  <div
                    className={
                      "row-start-1 self-center h-7 rounded-md mx-0.5 px-2 flex items-center text-[10px] font-medium truncate z-10 " +
                      (campaign.status === "active"
                        ? "bg-m3-gold text-m3-on-gold"
                        : "bg-m3-surface-highest text-m3-on-surface-variant")
                    }
                    style={{
                      gridColumnStart: range.start + 1,
                      gridColumnEnd: "span " + range.span,
                    }}
                  >
                    {campaign.startDate === null && campaign.endDate === null
                      ? "Always on"
                      : campaign.name}
                  </div>
                )}
              </div>
            );
          })}
          {campaigns.length === 0 && (
            <div className="p-8 text-center text-[11px] text-m3-on-surface-variant">
              Create a campaign below to place it on the calendar.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
