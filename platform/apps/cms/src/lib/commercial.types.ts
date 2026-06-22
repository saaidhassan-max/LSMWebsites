import type { CmsRecordStatus } from './cms-content.types';

export type CmsDealType = 'cpa' | 'cpl' | 'revenueShare' | 'hybrid';
export type CmsDealCurrency = 'GBP' | 'EUR' | 'USD' | 'CAD';

export interface CmsBrandAccount {
    id: string;
    operatorId: string;
    network: string;
    externalAccountId: string;
    accountManager: string;
    siteName: string;
    status: CmsRecordStatus;
    updatedAt: string;
}

export interface CmsBrandAccountDetails {
    network: string;
    externalAccountId: string;
    accountManager: string;
    siteName: string;
}

export interface CmsCommercialDeal {
    id: string;
    brandAccountId: string;
    name: string;
    type: CmsDealType;
    currency: CmsDealCurrency;
    cpaAmount: number | null;
    cplAmount: number | null;
    revenueSharePercent: number | null;
    startDate: string | null;
    endDate: string | null;
    status: CmsRecordStatus;
    notes: string;
    updatedAt: string;
}

export interface CmsCommercialDealDetails {
    name: string;
    type: CmsDealType;
    currency: CmsDealCurrency;
    cpaAmount: number | null;
    cplAmount: number | null;
    revenueSharePercent: number | null;
    startDate: string | null;
    endDate: string | null;
    notes: string;
}

export interface CmsCommercialDoc {
    accounts: CmsBrandAccount[];
    deals: CmsCommercialDeal[];
}
