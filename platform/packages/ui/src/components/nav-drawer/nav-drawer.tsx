import type React from 'react';
import { X } from 'lucide-react';
import { cn } from '../../lib/generic/cn';
import { NavCapsule } from '../nav-capsule/nav-capsule';
import type { NavDrawerProps } from './nav-drawer.types';

export function NavDrawer({ isOpen, onClose, items }: NavDrawerProps): React.ReactElement {
    return (
        <>
            <div
                className={cn(
                    'fixed inset-0 z-40 hidden md:block bg-black/50 transition-opacity duration-300',
                    isOpen === true ? 'opacity-100' : 'opacity-0 pointer-events-none'
                )}
                onClick={onClose}
                aria-hidden="true"
            />

            <div
                role="dialog"
                aria-modal="true"
                className={cn(
                    'fixed top-0 z-50 flex flex-col',
                    'right-0',
                    'w-full md:w-[422px] h-dvh',
                    'bg-surface',
                    'pt-6 px-6 pb-12',
                    'justify-between md:justify-start',
                    'transition-transform duration-300',
                    isOpen === true ? 'translate-x-0' : 'translate-x-full'
                )}
            >
                <div className="flex justify-end py-1 border-b border-outline">
                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Luk menu"
                        className={cn(
                            'flex items-center justify-center rounded-full p-3 transition-colors',
                            'w-12 h-12 md:w-14 md:h-14',
                            'text-on-surface-light hover:bg-outline'
                        )}
                    >
                        <X className="w-6 h-6 md:w-8 md:h-8" />
                    </button>
                </div>

                <nav className="flex flex-col gap-2 items-end md:items-start md:mt-8">
                    {items.map((item) => (
                        <NavCapsule
                            key={item.label}
                            emoji={item.emoji}
                            label={item.label}
                            href={item.href}
                            isActive={item.isActive}
                            fluid
                        />
                    ))}
                </nav>
            </div>
        </>
    );
}
