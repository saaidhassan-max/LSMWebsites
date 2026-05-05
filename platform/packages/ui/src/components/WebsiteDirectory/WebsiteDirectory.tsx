import React from 'react';

export interface DirectoryItem {
  name: string;
  href?: string;
}

export interface WebsiteDirectoryProps {
  title: string;
  sites: DirectoryItem[];
}

export function WebsiteDirectory({ title, sites }: WebsiteDirectoryProps) {
  return (
    <div className="flex flex-col gap-4 py-4 px-2">
      <h2 className="text-2xl font-bold leading-8 text-tertiary">{title}</h2>
      <div className="flex flex-wrap gap-y-[10px]">
        {sites.map((site, i) =>
          site.href ? (
            <a
              key={i}
              href={site.href}
              className="w-[165px] text-sm leading-5 tracking-[0.25px] text-on-surface-light hover:underline"
            >
              {site.name}
            </a>
          ) : (
            <span
              key={i}
              className="w-[165px] text-sm leading-5 tracking-[0.25px] text-on-surface-light"
            >
              {site.name}
            </span>
          )
        )}
      </div>
    </div>
  );
}
