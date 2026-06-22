"use client";

import type React from "react";
import { useState, useTransition } from "react";
import {
  BadgePoundSterling,
  BriefcaseBusiness,
  Plus,
  Save,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import {
  createBrandAccountAction,
  createCommercialDealAction,
  deleteBrandAccountAction,
  deleteCommercialDealAction,
  saveBrandAccountAction,
  saveCommercialDealAction,
  setBrandAccountStatusAction,
  setCommercialDealStatusAction,
} from "@/app/actions";
import { notifyCmsChanged } from "@/lib/cms-events";
import type {
  CmsBrandAccount,
  CmsBrandAccountDetails,
  CmsCommercialDeal,
  CmsCommercialDealDetails,
  CmsDealCurrency,
  CmsDealType,
} from "@/lib/commercial.types";
import { getOfferScheduleStatus } from "@/lib/offer-status";
import { OfferStatusChip } from "@/components/offer-status-chip";

interface CommercialWorkspaceProps {
  operatorId: string;
  accounts: CmsBrandAccount[];
  deals: CmsCommercialDeal[];
}

function accountDetails(account: CmsBrandAccount): CmsBrandAccountDetails {
  return {
    network: account.network,
    externalAccountId: account.externalAccountId,
    accountManager: account.accountManager,
    siteName: account.siteName,
  };
}

function dealDetails(deal: CmsCommercialDeal): CmsCommercialDealDetails {
  return {
    name: deal.name,
    type: deal.type,
    currency: deal.currency,
    cpaAmount: deal.cpaAmount,
    cplAmount: deal.cplAmount,
    revenueSharePercent: deal.revenueSharePercent,
    startDate: deal.startDate,
    endDate: deal.endDate,
    notes: deal.notes,
  };
}

function numberValue(value: string): number | null {
  if (value.trim() === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function dealTypeLabel(type: CmsDealType): string {
  const labels: Record<CmsDealType, string> = {
    cpa: "CPA",
    cpl: "CPL",
    revenueShare: "Revenue share",
    hybrid: "Hybrid",
  };
  return labels[type];
}

export function CommercialWorkspace({
  operatorId,
  accounts,
  deals,
}: CommercialWorkspaceProps): React.ReactElement {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [accountDrafts, setAccountDrafts] = useState<
    Record<string, CmsBrandAccountDetails>
  >(
    Object.fromEntries(
      accounts.map((account) => [account.id, accountDetails(account)]),
    ),
  );
  const [dealDrafts, setDealDrafts] = useState<
    Record<string, CmsCommercialDealDetails>
  >(Object.fromEntries(deals.map((deal) => [deal.id, dealDetails(deal)])));
  const activeDealCount = deals.filter(
    (deal) => getOfferScheduleStatus(deal) === "live",
  ).length;
  const inputClass =
    "h-10 w-full rounded-md border border-m3-outline-variant bg-m3-surface-low px-3 text-[12px] focus:outline-none focus:border-m3-gold";

  function updateAccount<K extends keyof CmsBrandAccountDetails>(
    account: CmsBrandAccount,
    key: K,
    value: CmsBrandAccountDetails[K],
  ): void {
    setAccountDrafts((current) => ({
      ...current,
      [account.id]: {
        ...(current[account.id] ?? accountDetails(account)),
        [key]: value,
      },
    }));
  }

  function updateDeal<K extends keyof CmsCommercialDealDetails>(
    deal: CmsCommercialDeal,
    key: K,
    value: CmsCommercialDealDetails[K],
  ): void {
    setDealDrafts((current) => ({
      ...current,
      [deal.id]: { ...(current[deal.id] ?? dealDetails(deal)), [key]: value },
    }));
  }

  function createAccount(): void {
    startTransition(async () => {
      await createBrandAccountAction(operatorId);
      router.refresh();
    });
  }

  function saveAccount(account: CmsBrandAccount): void {
    const draft = accountDrafts[account.id] ?? accountDetails(account);
    startTransition(async () => {
      await saveBrandAccountAction(account.id, operatorId, draft);
      notifyCmsChanged();
      router.refresh();
    });
  }

  function changeAccountStatus(account: CmsBrandAccount): void {
    startTransition(async () => {
      await setBrandAccountStatusAction(
        account.id,
        operatorId,
        account.status === "active" ? "hidden" : "active",
      );
      notifyCmsChanged();
      router.refresh();
    });
  }

  function removeAccount(account: CmsBrandAccount): void {
    startTransition(async () => {
      await deleteBrandAccountAction(account.id, operatorId);
      notifyCmsChanged();
      router.refresh();
    });
  }

  function createDeal(accountId: string): void {
    startTransition(async () => {
      await createCommercialDealAction(accountId, operatorId);
      router.refresh();
    });
  }

  function saveDeal(deal: CmsCommercialDeal): void {
    const draft = dealDrafts[deal.id] ?? dealDetails(deal);
    startTransition(async () => {
      await saveCommercialDealAction(deal.id, operatorId, draft);
      notifyCmsChanged();
      router.refresh();
    });
  }

  function changeDealStatus(deal: CmsCommercialDeal): void {
    startTransition(async () => {
      await setCommercialDealStatusAction(
        deal.id,
        operatorId,
        deal.status === "active" ? "hidden" : "active",
      );
      notifyCmsChanged();
      router.refresh();
    });
  }

  function removeDeal(deal: CmsCommercialDeal): void {
    startTransition(async () => {
      await deleteCommercialDealAction(deal.id, operatorId);
      notifyCmsChanged();
      router.refresh();
    });
  }

  return (
    <section className="flex flex-col gap-4">
      <div className="rounded-xl border border-m3-outline-variant bg-m3-surface-lowest p-5 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 flex-1">
          <div className="text-[11px] font-medium uppercase tracking-[0.12em] text-m3-on-surface-variant">
            Commercial management
          </div>
          <h2 className="mt-1 text-[20px] font-medium">
            Brand accounts and deals
          </h2>
          <p className="mt-1 w-full text-[12px] text-m3-on-surface-variant">
            Keep affiliate-network account details and date-ranged CPA, CPL,
            revenue-share or hybrid agreements together with the operator.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <div className="rounded-lg border border-m3-outline-variant bg-m3-surface-low px-3 py-2 text-center">
            <div className="text-[18px] font-medium">{accounts.length}</div>
            <div className="text-[10px] text-m3-on-surface-variant">
              Accounts
            </div>
          </div>
          <div className="rounded-lg border border-m3-outline-variant bg-m3-surface-low px-3 py-2 text-center">
            <div className="text-[18px] font-medium text-m3-success">
              {activeDealCount}
            </div>
            <div className="text-[10px] text-m3-on-surface-variant">
              Active deals
            </div>
          </div>
          <button
            type="button"
            onClick={createAccount}
            disabled={pending}
            className="flex items-center gap-1.5 rounded-md bg-m3-gold px-3 py-2 text-[12px] font-medium text-m3-on-gold disabled:opacity-40"
          >
            <Plus size={14} />
            Add account
          </button>
        </div>
      </div>

      {accounts.map((account) => {
        const draft = accountDrafts[account.id] ?? accountDetails(account);
        const accountDeals = deals.filter(
          (deal) => deal.brandAccountId === account.id,
        );
        return (
          <article
            key={account.id}
            className="rounded-xl border border-m3-outline-variant bg-m3-surface-lowest overflow-hidden"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-m3-outline-variant bg-m3-surface-low p-4">
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-9 w-9 shrink-0 rounded-md bg-m3-gold/15 flex items-center justify-center">
                  <BriefcaseBusiness size={17} />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="truncate text-[14px] font-medium">
                      {account.network || "Unconfigured brand account"}
                    </span>
                    <span
                      className={
                        "rounded-full px-2 py-0.5 text-[10px] " +
                        (account.status === "active"
                          ? "bg-m3-success-container text-m3-on-success"
                          : "bg-m3-surface-highest text-m3-on-surface-variant")
                      }
                    >
                      {account.status === "active" ? "Active" : "Inactive"}
                    </span>
                  </div>
                  <div className="mt-0.5 text-[10px] text-m3-on-surface-variant">
                    {account.siteName} · {accountDeals.length} deal
                    {accountDeals.length === 1 ? "" : "s"}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => changeAccountStatus(account)}
                  disabled={pending}
                  className="rounded-md border border-m3-outline-variant px-2.5 py-1.5 text-[11px] hover:bg-m3-surface-high disabled:opacity-40"
                >
                  {account.status === "active" ? "Deactivate" : "Activate"}
                </button>
                <button
                  type="button"
                  onClick={() => removeAccount(account)}
                  disabled={pending}
                  aria-label="Delete brand account"
                  className="h-8 w-8 rounded-md flex items-center justify-center text-m3-error hover:bg-m3-error-container disabled:opacity-40"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
            <div className="p-4 flex flex-col gap-5">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <label className="flex flex-col gap-1.5 text-[11px] font-medium">
                  Affiliate network
                  <input
                    value={draft.network}
                    onChange={(event) =>
                      updateAccount(account, "network", event.target.value)
                    }
                    placeholder="e.g. Partnerize"
                    className={inputClass}
                  />
                </label>
                <label className="flex flex-col gap-1.5 text-[11px] font-medium">
                  External account ID
                  <input
                    value={draft.externalAccountId}
                    onChange={(event) =>
                      updateAccount(
                        account,
                        "externalAccountId",
                        event.target.value,
                      )
                    }
                    className={inputClass}
                  />
                </label>
                <label className="flex flex-col gap-1.5 text-[11px] font-medium">
                  Account manager
                  <input
                    value={draft.accountManager}
                    onChange={(event) =>
                      updateAccount(
                        account,
                        "accountManager",
                        event.target.value,
                      )
                    }
                    className={inputClass}
                  />
                </label>
                <label className="flex flex-col gap-1.5 text-[11px] font-medium">
                  Site
                  <input
                    value={draft.siteName}
                    onChange={(event) =>
                      updateAccount(account, "siteName", event.target.value)
                    }
                    className={inputClass}
                  />
                </label>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => saveAccount(account)}
                  disabled={pending}
                  className="flex items-center gap-1.5 rounded-md border border-m3-outline-variant px-3 py-2 text-[12px] font-medium hover:bg-m3-surface-high disabled:opacity-40"
                >
                  <Save size={14} />
                  Save account
                </button>
              </div>

              <div className="flex items-center justify-between border-t border-m3-outline-variant pt-4">
                <div>
                  <div className="text-[12px] font-medium">
                    Commercial deals
                  </div>
                  <div className="text-[10px] text-m3-on-surface-variant">
                    Multiple agreements can cover different products or date
                    ranges.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => createDeal(account.id)}
                  disabled={pending}
                  className="flex items-center gap-1.5 rounded-md bg-m3-gold px-2.5 py-1.5 text-[11px] font-medium text-m3-on-gold disabled:opacity-40"
                >
                  <Plus size={13} />
                  Add deal
                </button>
              </div>

              <div className="flex flex-col gap-3">
                {accountDeals.map((deal) => {
                  const dealDraft = dealDrafts[deal.id] ?? dealDetails(deal);
                  return (
                    <div
                      key={deal.id}
                      className="rounded-lg border border-m3-outline-variant p-4 flex flex-col gap-4"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <BadgePoundSterling
                            size={16}
                            className="text-m3-gold"
                          />
                          <span className="text-[13px] font-medium">
                            {deal.name}
                          </span>
                          <OfferStatusChip
                            status={getOfferScheduleStatus(deal)}
                          />
                          <span className="text-[10px] text-m3-on-surface-variant">
                            {dealTypeLabel(deal.type)}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => changeDealStatus(deal)}
                            disabled={pending}
                            className="rounded-md border border-m3-outline-variant px-2.5 py-1.5 text-[11px] hover:bg-m3-surface-high disabled:opacity-40"
                          >
                            {deal.status === "active"
                              ? "Pause deal"
                              : "Activate deal"}
                          </button>
                          <button
                            type="button"
                            onClick={() => removeDeal(deal)}
                            disabled={pending}
                            aria-label="Delete commercial deal"
                            className="h-8 w-8 rounded-md flex items-center justify-center text-m3-error hover:bg-m3-error-container disabled:opacity-40"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
                        <label className="flex flex-col gap-1.5 text-[11px] font-medium">
                          Deal name
                          <input
                            value={dealDraft.name}
                            onChange={(event) =>
                              updateDeal(deal, "name", event.target.value)
                            }
                            className={inputClass}
                          />
                        </label>
                        <label className="flex flex-col gap-1.5 text-[11px] font-medium">
                          Model
                          <select
                            value={dealDraft.type}
                            onChange={(event) =>
                              updateDeal(
                                deal,
                                "type",
                                event.target.value as CmsDealType,
                              )
                            }
                            className={inputClass}
                          >
                            <option value="cpa">CPA</option>
                            <option value="cpl">CPL</option>
                            <option value="revenueShare">Revenue share</option>
                            <option value="hybrid">Hybrid</option>
                          </select>
                        </label>
                        <label className="flex flex-col gap-1.5 text-[11px] font-medium">
                          Currency
                          <select
                            value={dealDraft.currency}
                            onChange={(event) =>
                              updateDeal(
                                deal,
                                "currency",
                                event.target.value as CmsDealCurrency,
                              )
                            }
                            className={inputClass}
                          >
                            <option value="GBP">GBP</option>
                            <option value="EUR">EUR</option>
                            <option value="USD">USD</option>
                            <option value="CAD">CAD</option>
                          </select>
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <label className="flex flex-col gap-1.5 text-[11px] font-medium">
                            Start
                            <input
                              type="date"
                              value={dealDraft.startDate ?? ""}
                              max={dealDraft.endDate ?? undefined}
                              onChange={(event) =>
                                updateDeal(
                                  deal,
                                  "startDate",
                                  event.target.value || null,
                                )
                              }
                              className={inputClass}
                            />
                          </label>
                          <label className="flex flex-col gap-1.5 text-[11px] font-medium">
                            End
                            <input
                              type="date"
                              value={dealDraft.endDate ?? ""}
                              min={dealDraft.startDate ?? undefined}
                              onChange={(event) =>
                                updateDeal(
                                  deal,
                                  "endDate",
                                  event.target.value || null,
                                )
                              }
                              className={inputClass}
                            />
                          </label>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        {(dealDraft.type === "cpa" ||
                          dealDraft.type === "hybrid") && (
                          <label className="flex flex-col gap-1.5 text-[11px] font-medium">
                            CPA amount
                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              value={dealDraft.cpaAmount ?? ""}
                              onChange={(event) =>
                                updateDeal(
                                  deal,
                                  "cpaAmount",
                                  numberValue(event.target.value),
                                )
                              }
                              className={inputClass}
                            />
                          </label>
                        )}
                        {(dealDraft.type === "cpl" ||
                          dealDraft.type === "hybrid") && (
                          <label className="flex flex-col gap-1.5 text-[11px] font-medium">
                            CPL amount
                            <input
                              type="number"
                              min="0"
                              step="0.01"
                              value={dealDraft.cplAmount ?? ""}
                              onChange={(event) =>
                                updateDeal(
                                  deal,
                                  "cplAmount",
                                  numberValue(event.target.value),
                                )
                              }
                              className={inputClass}
                            />
                          </label>
                        )}
                        {(dealDraft.type === "revenueShare" ||
                          dealDraft.type === "hybrid") && (
                          <label className="flex flex-col gap-1.5 text-[11px] font-medium">
                            Revenue share %
                            <input
                              type="number"
                              min="0"
                              max="100"
                              step="0.1"
                              value={dealDraft.revenueSharePercent ?? ""}
                              onChange={(event) =>
                                updateDeal(
                                  deal,
                                  "revenueSharePercent",
                                  numberValue(event.target.value),
                                )
                              }
                              className={inputClass}
                            />
                          </label>
                        )}
                      </div>
                      <label className="flex flex-col gap-1.5 text-[11px] font-medium">
                        Deal notes
                        <textarea
                          value={dealDraft.notes}
                          onChange={(event) =>
                            updateDeal(deal, "notes", event.target.value)
                          }
                          rows={3}
                          className="rounded-md border border-m3-outline-variant bg-m3-surface-low px-3 py-2 text-[12px] focus:outline-none focus:border-m3-gold resize-y"
                        />
                      </label>
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => saveDeal(deal)}
                          disabled={pending}
                          className="flex items-center gap-1.5 rounded-md bg-m3-gold px-3 py-2 text-[12px] font-medium text-m3-on-gold disabled:opacity-40"
                        >
                          <Save size={14} />
                          Save deal
                        </button>
                      </div>
                    </div>
                  );
                })}
                {accountDeals.length === 0 && (
                  <div className="rounded-lg border border-dashed border-m3-outline-variant p-6 text-center text-[11px] text-m3-on-surface-variant">
                    No deals under this brand account yet.
                  </div>
                )}
              </div>
            </div>
          </article>
        );
      })}

      {accounts.length === 0 && (
        <div className="rounded-xl border border-dashed border-m3-outline-variant bg-m3-surface-lowest p-10 text-center">
          <BriefcaseBusiness
            size={24}
            className="mx-auto text-m3-on-surface-variant"
          />
          <div className="mt-3 text-[14px] font-medium">
            No brand accounts yet
          </div>
          <p className="mt-1 text-[11px] text-m3-on-surface-variant">
            Add the operator’s affiliate-network account, then record its
            commercial deals.
          </p>
        </div>
      )}
    </section>
  );
}
