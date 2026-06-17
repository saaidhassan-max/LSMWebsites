import type React from 'react';

const PROSE_CLASS =
    'w-full md:max-w-[948px] text-base leading-6 tracking-[0.5px] text-on-surface-light ' +
    '[&_h2]:text-lg [&_h2]:font-bold [&_h2]:mt-2 [&_p]:mb-3 ' +
    '[&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-3 ' +
    '[&_li]:mb-1 [&_a]:underline [&_a]:text-tertiary [&_strong]:font-bold ' +
    '[&_table]:w-full [&_table]:my-4 [&_table]:border-collapse [&_table]:text-sm ' +
    '[&_th]:text-left [&_th]:font-bold [&_th]:py-2 [&_th]:pr-4 [&_th]:border-b [&_th]:border-outline-variant ' +
    '[&_td]:py-3 [&_td]:pr-4 [&_td]:align-top [&_td]:border-b [&_td]:border-outline-variant';

export function contentPageBodyHtml(paragraphs: string[]): string {
    return paragraphs.map((paragraph) => '<p>' + paragraph + '</p>').join('');
}

export function ContentPageBody({ bodyHtml }: { bodyHtml: string }): React.ReactElement {
    return <div className={PROSE_CLASS} dangerouslySetInnerHTML={{ __html: bodyHtml }} />;
}
