import type {
    CmsOffer,
    CmsOfferDetails,
    CmsOperator,
    CmsOperatorDetails,
    CmsRecordStatus
} from './cms-content.types';
import { readDoc, writeDoc } from './cms-storage';

const OPERATORS_FILE = 'operators';
const OFFERS_FILE = 'offers';

function now(): string {
    return new Date().toISOString();
}

function makeId(prefix: string): string {
    return prefix + '_' + Math.random().toString(36).slice(2, 10);
}

function toSlug(value: string): string {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

function seedOperators(): CmsOperator[] {
    return [
        {
            id: 'op_betfair_casino',
            name: 'Betfair Casino',
            slug: 'betfair-casino',
            logoSrc: '/sfb/brands/placeholder.png',
            status: 'active',
            reviewIntro:
                'Betfair Casino is one of the most trusted names in online gaming, with a premium casino experience and a no-deposit free spins offer for new players.',
            reviewBody:
                'Betfair Casino combines sport-betting heritage with a top-tier casino experience, a broad game library, secure payments, and responsible gambling tools.',
            updatedAt: '2026-06-08T09:00:00.000Z'
        },
        {
            id: 'op_ladbrokes',
            name: 'Ladbrokes',
            slug: 'ladbrokes',
            logoSrc: '/sfb/brands/placeholder.png',
            status: 'active',
            reviewIntro:
                'Ladbrokes is one of the most recognisable names in UK gambling, with a long history and a polished online casino and bingo experience.',
            reviewBody:
                'Ladbrokes Casino delivers a trusted gambling experience with a large game library, live casino tables, bingo rooms, and familiar payment methods.',
            updatedAt: '2026-06-08T09:00:00.000Z'
        },
        {
            id: 'op_buzz_bingo',
            name: 'Buzz Bingo',
            slug: 'buzz-bingo',
            logoSrc: '/sfb/brands/placeholder.png',
            status: 'active',
            reviewIntro:
                'Buzz Bingo is a leading UK bingo brand, combining online bingo rooms, slots, and an established real-world club presence.',
            reviewBody:
                'Buzz Bingo offers a community-driven bingo experience with online rooms, slot games, daily deals, and safer gambling support.',
            updatedAt: '2026-06-08T09:00:00.000Z'
        }
    ];
}

function seedOffers(): CmsOffer[] {
    return [
        {
            id: 'off_betfair_free_spins',
            operatorId: 'op_betfair_casino',
            headline: '50 FREE SPINS',
            label: 'NO DEPOSIT',
            labelColor: 'orange',
            details: ['No Deposit', 'No Wagering'],
            howToClaimSteps: [
                'Click "Click To Claim" to visit Betfair Casino.',
                'Register a new account with your details.',
                'Your 50 free spins are added automatically — no deposit needed.'
            ],
            termsText:
                '18+. New customers only. Free spins valued at £0.10. Winnings paid in cash. T&Cs apply. BeGambleAware.org.',
            ctaHref: '#',
            status: 'active',
            startDate: null,
            endDate: null,
            banner: null,
            updatedAt: '2026-06-08T09:00:00.000Z'
        },
        {
            id: 'off_ladbrokes_free_spins',
            operatorId: 'op_ladbrokes',
            headline: '50 FREE SPINS',
            label: 'NO DEPOSIT',
            labelColor: 'red',
            details: ['No Deposit', 'No Wagering'],
            howToClaimSteps: [
                'Click "Click To Claim" to visit Ladbrokes.',
                'Complete the new-customer registration.',
                '50 free spins are credited upon registration.'
            ],
            termsText:
                '18+. New Casino players only. 50 Free Spins awarded upon registration. T&Cs apply. BeGambleAware.org.',
            ctaHref: '#',
            status: 'active',
            startDate: null,
            endDate: null,
            banner: null,
            updatedAt: '2026-06-08T09:00:00.000Z'
        },
        {
            id: 'off_buzz_bingo_spins',
            operatorId: 'op_buzz_bingo',
            headline: '10 FREE SPINS',
            label: 'NO DEPOSIT',
            labelColor: 'red',
            details: ['No Deposit', 'No Wagering'],
            howToClaimSteps: [
                'Click "Click To Claim" to visit Buzz Bingo.',
                'Register online as a new customer.',
                'Receive 10 free spins — no deposit required.'
            ],
            termsText:
                '18+. New customers only. Register online to receive 10 free spins. No deposit required. T&Cs apply. BeGambleAware.org.',
            ctaHref: '#',
            status: 'active',
            startDate: null,
            endDate: null,
            banner: null,
            updatedAt: '2026-06-08T09:00:00.000Z'
        }
    ];
}

async function readJsonFile<T>(key: string, seed: () => T[]): Promise<T[]> {
    return readDoc<T[]>(key, seed);
}

async function writeJsonFile<T>(key: string, rows: T[]): Promise<void> {
    await writeDoc(key, rows);
}

export async function listOperators(): Promise<CmsOperator[]> {
    const operators = await readJsonFile<CmsOperator>(OPERATORS_FILE, seedOperators);
    return [...operators].sort((a, b) => a.name.localeCompare(b.name));
}

function normalizeOffer(offer: CmsOffer): CmsOffer {
    return {
        ...offer,
        details: Array.isArray(offer.details) ? offer.details : [],
        howToClaimSteps: Array.isArray(offer.howToClaimSteps) ? offer.howToClaimSteps : [],
        startDate: offer.startDate ?? null,
        endDate: offer.endDate ?? null,
        banner: offer.banner ?? null
    };
}

export async function listOffers(): Promise<CmsOffer[]> {
    const offers = await readJsonFile<CmsOffer>(OFFERS_FILE, seedOffers);
    return [...offers].map(normalizeOffer).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export async function getOperator(id: string): Promise<CmsOperator | undefined> {
    const operators = await readJsonFile<CmsOperator>(OPERATORS_FILE, seedOperators);
    return operators.find((operator) => operator.id === id);
}

export async function getOffer(id: string): Promise<CmsOffer | undefined> {
    const offers = await readJsonFile<CmsOffer>(OFFERS_FILE, seedOffers);
    const offer = offers.find((item) => item.id === id);
    return offer === undefined ? undefined : normalizeOffer(offer);
}

export async function createOperator(): Promise<string> {
    const operators = await readJsonFile<CmsOperator>(OPERATORS_FILE, seedOperators);
    const id = makeId('op');
    const name = 'New operator';
    const operator: CmsOperator = {
        id,
        name,
        slug: toSlug(name + '-' + id.slice(-4)),
        logoSrc: '/sfb/brands/placeholder.png',
        status: 'active',
        reviewIntro: '',
        reviewBody: '',
        updatedAt: now()
    };
    await writeJsonFile(OPERATORS_FILE, [operator, ...operators]);
    return id;
}

export async function createOffer(): Promise<string> {
    const [operators, offers] = await Promise.all([
        readJsonFile<CmsOperator>(OPERATORS_FILE, seedOperators),
        readJsonFile<CmsOffer>(OFFERS_FILE, seedOffers)
    ]);
    const operator = operators[0];
    if (operator === undefined) return '';
    const id = makeId('off');
    const offer: CmsOffer = {
        id,
        operatorId: operator.id,
        headline: 'New offer',
        label: 'NO DEPOSIT',
        labelColor: 'red',
        details: ['No Deposit', 'No Wagering'],
        howToClaimSteps: [],
        termsText: '18+. New customers only. T&Cs apply. BeGambleAware.org.',
        ctaHref: '#',
        status: 'active',
        startDate: null,
        endDate: null,
        banner: null,
        updatedAt: now()
    };
    await writeJsonFile(OFFERS_FILE, [offer, ...offers]);
    return id;
}

export async function createOfferForOperator(operatorId: string): Promise<string> {
    const [operators, offers] = await Promise.all([
        readJsonFile<CmsOperator>(OPERATORS_FILE, seedOperators),
        readJsonFile<CmsOffer>(OFFERS_FILE, seedOffers)
    ]);
    const operator = operators.find((item) => item.id === operatorId) ?? operators[0];
    if (operator === undefined) return '';
    const id = makeId('off');
    const offer: CmsOffer = {
        id,
        operatorId: operator.id,
        headline: 'New offer',
        label: 'NO DEPOSIT',
        labelColor: 'red',
        details: ['No Deposit', 'No Wagering'],
        howToClaimSteps: [],
        termsText: '18+. New customers only. T&Cs apply. BeGambleAware.org.',
        ctaHref: '#',
        status: 'active',
        startDate: null,
        endDate: null,
        banner: null,
        updatedAt: now()
    };
    await writeJsonFile(OFFERS_FILE, [offer, ...offers]);
    return id;
}

export async function duplicateOffer(id: string): Promise<string> {
    const offers = await readJsonFile<CmsOffer>(OFFERS_FILE, seedOffers);
    const source = offers.find((offer) => offer.id === id);
    if (source === undefined) return '';
    const copyId = makeId('off');
    const copy: CmsOffer = {
        ...source,
        id: copyId,
        headline: 'Copy of ' + source.headline,
        status: 'hidden',
        updatedAt: now()
    };
    await writeJsonFile(OFFERS_FILE, [copy, ...offers]);
    return copyId;
}

export async function setOperatorStatus(id: string, status: CmsRecordStatus): Promise<void> {
    const [operators, offers] = await Promise.all([
        readJsonFile<CmsOperator>(OPERATORS_FILE, seedOperators),
        readJsonFile<CmsOffer>(OFFERS_FILE, seedOffers)
    ]);
    const next = operators.map((operator) =>
        operator.id === id ? { ...operator, status, updatedAt: now() } : operator
    );
    const nextOffers =
        status === 'hidden'
            ? offers.map((offer) =>
                  offer.operatorId === id
                      ? { ...offer, status: 'hidden' as const, updatedAt: now() }
                      : offer
              )
            : offers;
    await Promise.all([
        writeJsonFile(OPERATORS_FILE, next),
        writeJsonFile(OFFERS_FILE, nextOffers)
    ]);
}

export async function setOfferStatus(id: string, status: CmsRecordStatus): Promise<void> {
    const offers = await readJsonFile<CmsOffer>(OFFERS_FILE, seedOffers);
    const next = offers.map((offer) =>
        offer.id === id ? { ...offer, status, updatedAt: now() } : offer
    );
    await writeJsonFile(OFFERS_FILE, next);
}

export async function updateOperator(id: string, details: CmsOperatorDetails): Promise<void> {
    const operators = await readJsonFile<CmsOperator>(OPERATORS_FILE, seedOperators);
    const next = operators.map((operator) =>
        operator.id === id
            ? {
                  ...operator,
                  name: details.name.trim() || operator.name,
                  slug: toSlug(details.slug) || operator.slug,
                  logoSrc: details.logoSrc.trim() || operator.logoSrc,
                  reviewIntro: details.reviewIntro,
                  reviewBody: details.reviewBody,
                  updatedAt: now()
              }
            : operator
    );
    await writeJsonFile(OPERATORS_FILE, next);
}

export async function countOffersByOperator(): Promise<Record<string, number>> {
    const offers = await readJsonFile<CmsOffer>(OFFERS_FILE, seedOffers);
    return offers.reduce<Record<string, number>>((acc, offer) => {
        acc[offer.operatorId] = (acc[offer.operatorId] ?? 0) + 1;
        return acc;
    }, {});
}

export async function deleteOperator(id: string): Promise<string[]> {
    const [operators, offers] = await Promise.all([
        readJsonFile<CmsOperator>(OPERATORS_FILE, seedOperators),
        readJsonFile<CmsOffer>(OFFERS_FILE, seedOffers)
    ]);
    const removedOfferIds = offers
        .filter((offer) => offer.operatorId === id)
        .map((offer) => offer.id);
    await Promise.all([
        writeJsonFile(
            OPERATORS_FILE,
            operators.filter((operator) => operator.id !== id)
        ),
        writeJsonFile(
            OFFERS_FILE,
            offers.filter((offer) => offer.operatorId !== id)
        )
    ]);
    return removedOfferIds;
}

export async function updateOperatorLogo(id: string, logoSrc: string): Promise<void> {
    const trimmed = logoSrc.trim();
    if (trimmed === '') return;
    const operators = await readJsonFile<CmsOperator>(OPERATORS_FILE, seedOperators);
    const next = operators.map((operator) =>
        operator.id === id ? { ...operator, logoSrc: trimmed, updatedAt: now() } : operator
    );
    await writeJsonFile(OPERATORS_FILE, next);
}

export async function deleteOffer(id: string): Promise<void> {
    const offers = await readJsonFile<CmsOffer>(OFFERS_FILE, seedOffers);
    await writeJsonFile(
        OFFERS_FILE,
        offers.filter((offer) => offer.id !== id)
    );
}

export async function updateOffer(id: string, details: CmsOfferDetails): Promise<void> {
    const [operators, offers] = await Promise.all([
        readJsonFile<CmsOperator>(OPERATORS_FILE, seedOperators),
        readJsonFile<CmsOffer>(OFFERS_FILE, seedOffers)
    ]);
    const operatorExists = operators.some((operator) => operator.id === details.operatorId);
    const next = offers.map((offer) =>
        offer.id === id
            ? {
                  ...offer,
                  operatorId: operatorExists ? details.operatorId : offer.operatorId,
                  headline: details.headline.trim() || offer.headline,
                  label: details.label.trim() || offer.label,
                  labelColor: details.labelColor,
                  details: details.details.map((line) => line.trim()).filter(Boolean),
                  howToClaimSteps: details.howToClaimSteps
                      .map((line) => line.trim())
                      .filter(Boolean),
                  termsText: details.termsText,
                  ctaHref: details.ctaHref.trim() || '#',
                  startDate: details.startDate,
                  endDate: details.endDate,
                  banner: details.banner,
                  updatedAt: now()
              }
            : offer
    );
    await writeJsonFile(OFFERS_FILE, next);
}
