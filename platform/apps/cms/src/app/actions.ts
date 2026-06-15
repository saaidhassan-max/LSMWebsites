'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import {
    createOffer,
    createOfferForOperator,
    createOperator,
    deleteOffer,
    deleteOperator,
    setOfferStatus,
    setOperatorStatus,
    updateOffer,
    updateOperator,
    updateOperatorLogo
} from '@/lib/cms-content-store';
import {
    createLandingPage,
    deleteLandingPage,
    duplicateLandingPage,
    setPublished,
    updateLandingContent,
    updateLandingDetails
} from '@/lib/landing-store';
import { removeHomeOfferIds, setHomeConfig, setHomeOfferIds } from '@/lib/home-store';
import { setSiteSettings } from '@/lib/site-settings-store';
import { createSitePage, setSitePagePublished, updateSitePage } from '@/lib/site-pages-store';
import type { LandingPageContent, LandingPageDetails } from '@/lib/landing-pages.types';
import type { CmsOfferDetails, CmsOperatorDetails, CmsRecordStatus } from '@/lib/cms-content.types';
import type { HomePageConfig } from '@/lib/home.types';
import type { SiteSettings } from '@/lib/site-settings.types';
import type { SitePageDetails, SitePageSection } from '@/lib/site-pages.types';

export async function createAction(): Promise<void> {
    const newId = await createLandingPage();
    revalidatePath('/');
    redirect('/edit/' + newId);
}

export async function createSitePageAction(): Promise<void> {
    const newId = await createSitePage();
    revalidatePath('/home');
    redirect('/pages/edit/' + newId);
}

export async function duplicateAction(id: string): Promise<void> {
    const newId = await duplicateLandingPage(id);
    revalidatePath('/');
    redirect('/edit/' + newId);
}

export async function deleteAction(id: string): Promise<void> {
    await deleteLandingPage(id);
    revalidatePath('/');
}

export async function publishAction(id: string, published: boolean): Promise<void> {
    await setPublished(id, published);
    revalidatePath('/');
}

export async function saveContentAction(id: string, content: LandingPageContent): Promise<void> {
    await updateLandingContent(id, content);
    revalidatePath('/');
    revalidatePath('/edit/' + id);
}

export async function saveDetailsAction(id: string, details: LandingPageDetails): Promise<void> {
    await updateLandingDetails(id, details);
    revalidatePath('/');
    revalidatePath('/edit/' + id);
    revalidatePath('/preview/' + details.slug);
}

export async function saveHomeOffersAction(offerIds: string[]): Promise<void> {
    await setHomeOfferIds(offerIds);
    revalidatePath('/home');
    revalidatePath('/');
}

export async function saveHomeConfigAction(config: HomePageConfig): Promise<void> {
    await setHomeConfig(config);
    revalidatePath('/home');
    revalidatePath('/');
}

export async function saveSiteSettingsAction(settings: SiteSettings): Promise<void> {
    await setSiteSettings(settings);
    revalidatePath('/settings');
    revalidatePath('/home');
    revalidatePath('/');
}

export async function saveSitePageAction(
    id: string,
    details: SitePageDetails,
    sections: SitePageSection[]
): Promise<void> {
    await updateSitePage(id, details, sections);
    revalidatePath('/pages/edit/' + id);
}

export async function publishSitePageAction(id: string, published: boolean): Promise<void> {
    await setSitePagePublished(id, published);
    revalidatePath('/pages/edit/' + id);
}

export async function createOperatorAction(): Promise<void> {
    await createOperator();
    revalidatePath('/operators');
}

export async function createOfferAction(): Promise<void> {
    await createOffer();
    revalidatePath('/offers');
}

export async function createOfferForOperatorAction(operatorId: string): Promise<void> {
    const newId = await createOfferForOperator(operatorId);
    revalidatePath('/offers');
    revalidatePath('/operators/edit/' + operatorId);
    if (newId !== '') redirect('/offers/edit/' + newId);
}

export async function deleteOperatorAction(id: string): Promise<void> {
    const removedOfferIds = await deleteOperator(id);
    await removeHomeOfferIds(removedOfferIds);
    revalidatePath('/operators');
    revalidatePath('/offers');
    revalidatePath('/home');
    revalidatePath('/');
    redirect('/operators');
}

export async function deleteOfferAction(id: string): Promise<void> {
    await deleteOffer(id);
    await removeHomeOfferIds([id]);
    revalidatePath('/offers');
    revalidatePath('/home');
    revalidatePath('/');
}

export async function setOperatorStatusAction(id: string, status: CmsRecordStatus): Promise<void> {
    await setOperatorStatus(id, status);
    revalidatePath('/operators');
    revalidatePath('/operators/edit/' + id);
}

export async function setOfferStatusAction(id: string, status: CmsRecordStatus): Promise<void> {
    await setOfferStatus(id, status);
    revalidatePath('/offers');
    revalidatePath('/offers/edit/' + id);
}

export async function saveOperatorAction(id: string, details: CmsOperatorDetails): Promise<void> {
    await updateOperator(id, details);
    revalidatePath('/operators');
    revalidatePath('/operators/edit/' + id);
}

export async function saveOperatorLogoAction(id: string, logoSrc: string): Promise<void> {
    await updateOperatorLogo(id, logoSrc);
    revalidatePath('/operators');
    revalidatePath('/operators/edit/' + id);
    revalidatePath('/offers');
    revalidatePath('/home');
    revalidatePath('/');
}

export async function saveOfferAction(id: string, details: CmsOfferDetails): Promise<void> {
    await updateOffer(id, details);
    revalidatePath('/offers');
    revalidatePath('/offers/edit/' + id);
}
