import type {
  CmsCampaign,
  CmsCampaignDetails,
  CmsRecordStatus,
} from "./cms-content.types";
import { readDoc, writeDoc } from "./cms-storage";

const CAMPAIGNS_KEY = "campaigns";

function now(): string {
  return new Date().toISOString();
}

function makeId(): string {
  return "campaign_" + Math.random().toString(36).slice(2, 10);
}

function normalizeCampaign(campaign: CmsCampaign): CmsCampaign {
  return {
    ...campaign,
    offerIds: Array.isArray(campaign.offerIds) ? campaign.offerIds : [],
    landingPageIds: Array.isArray(campaign.landingPageIds)
      ? campaign.landingPageIds
      : [],
    trackingHref: campaign.trackingHref ?? "",
    startDate: campaign.startDate ?? null,
    endDate: campaign.endDate ?? null,
    status: campaign.status ?? "hidden",
  };
}

async function readAll(): Promise<CmsCampaign[]> {
  const campaigns = await readDoc<CmsCampaign[]>(CAMPAIGNS_KEY, () => []);
  return campaigns.map(normalizeCampaign);
}

async function writeAll(campaigns: CmsCampaign[]): Promise<void> {
  await writeDoc(CAMPAIGNS_KEY, campaigns);
}

export async function listCampaigns(): Promise<CmsCampaign[]> {
  const campaigns = await readAll();
  return [...campaigns].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export async function getCampaign(
  id: string,
): Promise<CmsCampaign | undefined> {
  const campaigns = await readAll();
  return campaigns.find((campaign) => campaign.id === id);
}

export async function createCampaign(operatorId: string): Promise<string> {
  const campaigns = await readAll();
  const id = makeId();
  const campaign: CmsCampaign = {
    id,
    operatorId,
    name: "New campaign",
    offerIds: [],
    landingPageIds: [],
    trackingHref: "",
    startDate: null,
    endDate: null,
    status: "hidden",
    updatedAt: now(),
  };
  await writeAll([campaign, ...campaigns]);
  return id;
}

export async function updateCampaign(
  id: string,
  details: CmsCampaignDetails,
): Promise<void> {
  const campaigns = await readAll();
  const next = campaigns.map((campaign) =>
    campaign.id === id
      ? {
          ...campaign,
          name: details.name.trim() || campaign.name,
          offerIds: [...new Set(details.offerIds)],
          landingPageIds: [...new Set(details.landingPageIds)],
          trackingHref: details.trackingHref.trim(),
          startDate: details.startDate,
          endDate: details.endDate,
          updatedAt: now(),
        }
      : campaign,
  );
  await writeAll(next);
}

export async function setCampaignStatus(
  id: string,
  status: CmsRecordStatus,
): Promise<void> {
  const campaigns = await readAll();
  const next = campaigns.map((campaign) =>
    campaign.id === id ? { ...campaign, status, updatedAt: now() } : campaign,
  );
  await writeAll(next);
}

export async function deleteCampaign(id: string): Promise<void> {
  const campaigns = await readAll();
  await writeAll(campaigns.filter((campaign) => campaign.id !== id));
}
