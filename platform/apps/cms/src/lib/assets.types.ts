export interface AssetRecord {
    path: string;
    name: string;
    uploadedAt: string;
}

export interface AssetListResponse {
    assets: AssetRecord[];
}

export interface AssetDeleteResponse {
    ok: boolean;
    usedIn: string[];
}

export interface AssetUploadResponse {
    path?: string;
    error?: string;
}
