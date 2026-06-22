import type { CmsRecordStatus } from "./cms-content.types";
import { readDoc, writeDoc } from "./cms-storage";
import type {
  CmsBrandAccount,
  CmsBrandAccountDetails,
  CmsCommercialDeal,
  CmsCommercialDealDetails,
  CmsCommercialDoc,
} from "./commercial.types";

const COMMERCIAL_KEY = "commercial-accounts";

function now(): string {
  return new Date().toISOString();
}

function makeId(prefix: string): string {
  return prefix + "_" + Math.random().toString(36).slice(2, 10);
}

function normalizeDoc(doc: CmsCommercialDoc): CmsCommercialDoc {
  return {
    accounts: Array.isArray(doc.accounts) ? doc.accounts : [],
    deals: Array.isArray(doc.deals) ? doc.deals : [],
  };
}

async function readAll(): Promise<CmsCommercialDoc> {
  const doc = await readDoc<CmsCommercialDoc>(COMMERCIAL_KEY, () => ({
    accounts: [],
    deals: [],
  }));
  return normalizeDoc(doc);
}

async function writeAll(doc: CmsCommercialDoc): Promise<void> {
  await writeDoc(COMMERCIAL_KEY, doc);
}

export async function listBrandAccounts(
  operatorId: string,
): Promise<CmsBrandAccount[]> {
  const doc = await readAll();
  return doc.accounts
    .filter((account) => account.operatorId === operatorId)
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export async function listCommercialDeals(
  accountIds: string[],
): Promise<CmsCommercialDeal[]> {
  const doc = await readAll();
  const ids = new Set(accountIds);
  return doc.deals
    .filter((deal) => ids.has(deal.brandAccountId))
    .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export async function createBrandAccount(operatorId: string): Promise<string> {
  const doc = await readAll();
  const id = makeId("account");
  const account: CmsBrandAccount = {
    id,
    operatorId,
    network: "",
    externalAccountId: "",
    accountManager: "",
    siteName: "Super Free Bingo",
    status: "active",
    updatedAt: now(),
  };
  await writeAll({ ...doc, accounts: [account, ...doc.accounts] });
  return id;
}

export async function updateBrandAccount(
  id: string,
  details: CmsBrandAccountDetails,
): Promise<void> {
  const doc = await readAll();
  const accounts = doc.accounts.map((account) =>
    account.id === id
      ? {
          ...account,
          network: details.network.trim(),
          externalAccountId: details.externalAccountId.trim(),
          accountManager: details.accountManager.trim(),
          siteName: details.siteName.trim() || account.siteName,
          updatedAt: now(),
        }
      : account,
  );
  await writeAll({ ...doc, accounts });
}

export async function setBrandAccountStatus(
  id: string,
  status: CmsRecordStatus,
): Promise<void> {
  const doc = await readAll();
  const accounts = doc.accounts.map((account) =>
    account.id === id ? { ...account, status, updatedAt: now() } : account,
  );
  await writeAll({ ...doc, accounts });
}

export async function deleteBrandAccount(id: string): Promise<void> {
  const doc = await readAll();
  await writeAll({
    accounts: doc.accounts.filter((account) => account.id !== id),
    deals: doc.deals.filter((deal) => deal.brandAccountId !== id),
  });
}

export async function createCommercialDeal(
  brandAccountId: string,
): Promise<string> {
  const doc = await readAll();
  if (!doc.accounts.some((account) => account.id === brandAccountId)) return "";
  const id = makeId("deal");
  const deal: CmsCommercialDeal = {
    id,
    brandAccountId,
    name: "New commercial deal",
    type: "cpa",
    currency: "GBP",
    cpaAmount: null,
    cplAmount: null,
    revenueSharePercent: null,
    startDate: null,
    endDate: null,
    status: "hidden",
    notes: "",
    updatedAt: now(),
  };
  await writeAll({ ...doc, deals: [deal, ...doc.deals] });
  return id;
}

export async function updateCommercialDeal(
  id: string,
  details: CmsCommercialDealDetails,
): Promise<void> {
  const doc = await readAll();
  const deals = doc.deals.map((deal) =>
    deal.id === id
      ? {
          ...deal,
          name: details.name.trim() || deal.name,
          type: details.type,
          currency: details.currency,
          cpaAmount: details.cpaAmount,
          cplAmount: details.cplAmount,
          revenueSharePercent: details.revenueSharePercent,
          startDate: details.startDate,
          endDate: details.endDate,
          notes: details.notes,
          updatedAt: now(),
        }
      : deal,
  );
  await writeAll({ ...doc, deals });
}

export async function setCommercialDealStatus(
  id: string,
  status: CmsRecordStatus,
): Promise<void> {
  const doc = await readAll();
  const deals = doc.deals.map((deal) =>
    deal.id === id ? { ...deal, status, updatedAt: now() } : deal,
  );
  await writeAll({ ...doc, deals });
}

export async function deleteCommercialDeal(id: string): Promise<void> {
  const doc = await readAll();
  await writeAll({ ...doc, deals: doc.deals.filter((deal) => deal.id !== id) });
}
