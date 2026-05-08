export interface DirectoryItem {
    name: string;
    href?: string;
}

export interface WebsiteDirectoryProps {
    title: string;
    sites: DirectoryItem[];
}
