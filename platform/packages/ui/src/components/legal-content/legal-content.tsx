import type React from 'react';
import { LegalText } from '../legal-text/legal-text';
import type { LegalBlock, LegalContentProps, LegalTextSegment } from './legal-content.types';

const inlineSegments = (segments: LegalTextSegment[]): React.ReactElement => (
    <LegalText segments={segments} inline />
);

function renderBlock(block: LegalBlock, index: number): React.ReactElement {
    if (block.kind === 'heading') {
        return block.level <= 2 ? (
            <h2 key={index} className="pt-2 text-xl font-bold leading-7">
                {inlineSegments(block.segments)}
            </h2>
        ) : (
            <h3 key={index} className="pt-2 text-lg font-bold leading-6">
                {inlineSegments(block.segments)}
            </h3>
        );
    }

    if (block.kind === 'list') {
        const items = block.items.map((item, itemIndex) => (
            <li key={itemIndex}>{inlineSegments(item)}</li>
        ));
        return block.ordered ? (
            <ol key={index} className="flex list-decimal flex-col gap-1 pl-6">
                {items}
            </ol>
        ) : (
            <ul key={index} className="flex list-disc flex-col gap-1 pl-6">
                {items}
            </ul>
        );
    }

    if (block.kind === 'table') {
        return (
            <table key={index} className="w-full border-collapse text-sm">
                <tbody>
                    {block.rows.map((row, rowIndex) => (
                        <tr
                            key={rowIndex}
                            className={
                                'flex flex-col border-b border-outline-variant py-2 align-top md:table-row md:py-0' +
                                (rowIndex === 0 ? ' font-bold' : '')
                            }
                        >
                            {row.map((cell, cellIndex) => (
                                <td key={cellIndex} className="block py-1 md:table-cell md:py-3 md:pr-4">
                                    <div className="flex flex-col gap-2">{cell.map(renderBlock)}</div>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }

    return <p key={index}>{inlineSegments(block.segments)}</p>;
}

export const LegalContent = ({ blocks }: LegalContentProps): React.ReactElement => (
    <div className="flex w-full flex-col gap-4 text-base leading-6 tracking-[0.5px] text-on-surface-light md:max-w-[948px]">
        {blocks.map(renderBlock)}
    </div>
);
