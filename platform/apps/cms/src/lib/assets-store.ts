import type { AssetRecord } from './assets.types';
import {
    deleteStoredImage,
    listStoredImages,
    peekDoc,
    readDoc,
    writeDoc
} from './cms-storage';

const ASSETS_KEY = 'asset-meta';
const EARLIEST_PLAUSIBLE_MS = 1577836800000;

interface UsageDoc {
    key: string;
    label: string;
}

const USAGE_DOCS: UsageDoc[] = [
    { key: 'home-page', label: 'Home page' },
    { key: 'site-pages', label: 'Custom pages' },
    { key: 'landing-pages', label: 'Landing pages' },
    { key: 'operators', label: 'Operators' },
    { key: 'offers', label: 'Offers' },
    { key: 'site-settings', label: 'Site settings' },
    { key: 'content-pages', label: 'Content pages' },
    { key: 'published-site', label: 'Published (live) site' }
];

function timeFromName(fileName: string): string | null {
    const base = fileName.replace(/\.[^.]+$/, '').replace(/^img_/, '');
    const ms = parseInt(base, 36);
    if (Number.isNaN(ms) || ms < EARLIEST_PLAUSIBLE_MS) return null;
    return new Date(ms).toISOString();
}

function deriveName(fileName: string): string {
    return fileName.replace(/^img_/, '').replace(/\.[^.]+$/, '');
}

async function readMeta(): Promise<AssetRecord[]> {
    return readDoc<AssetRecord[]>(ASSETS_KEY, () => []);
}

async function writeMeta(records: AssetRecord[]): Promise<void> {
    await writeDoc(ASSETS_KEY, records);
}

export async function listAssets(): Promise<AssetRecord[]> {
    const [files, meta] = await Promise.all([listStoredImages(), readMeta()]);
    const byPath = new Map(meta.map((record) => [record.path, record]));
    return files.map((file) => {
        const record = byPath.get(file.path);
        return {
            path: file.path,
            name: record?.name ?? deriveName(file.name),
            uploadedAt: record?.uploadedAt ?? timeFromName(file.name) ?? file.uploadedAt
        };
    });
}

export async function recordAsset(
    assetPath: string,
    name: string,
    uploadedAt: string
): Promise<void> {
    const meta = await readMeta();
    const next = meta.filter((record) => record.path !== assetPath);
    next.push({ path: assetPath, name, uploadedAt });
    await writeMeta(next);
}

export async function renameAsset(assetPath: string, name: string): Promise<void> {
    const assets = await listAssets();
    const current = assets.find((asset) => asset.path === assetPath);
    const uploadedAt = current?.uploadedAt ?? new Date().toISOString();
    const meta = await readMeta();
    const next = meta.filter((record) => record.path !== assetPath);
    next.push({ path: assetPath, name, uploadedAt });
    await writeMeta(next);
}

export async function findAssetUsage(assetPath: string): Promise<string[]> {
    const used: string[] = [];
    for (const doc of USAGE_DOCS) {
        const data = await peekDoc<object>(doc.key);
        if (data !== null && JSON.stringify(data).includes(assetPath)) used.push(doc.label);
    }
    return used;
}

export async function deleteAsset(assetPath: string): Promise<void> {
    await deleteStoredImage(assetPath);
    const meta = await readMeta();
    await writeMeta(meta.filter((record) => record.path !== assetPath));
}
