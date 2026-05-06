import React from 'react';
import { X } from 'lucide-react';
import { NavCapsule } from '../NavCapsule/NavCapsule';

export interface NavItem {
  emoji: string;
  label: string;
  href: string;
  isActive?: boolean;
}

export interface NavDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: NavItem[];
}

export function NavDrawer({ isOpen, onClose, items }: NavDrawerProps) {
  return (
    <>
      {/* Semi-transparent backdrop — desktop only, fades in/out */}
      <div
        className={[
          'fixed inset-0 z-40 hidden md:block bg-black/50 transition-opacity duration-300',
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none',
        ].join(' ')}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel
          Mobile: full screen, slides in from the RIGHT
          Desktop: 422px wide, slides in from the LEFT */}
      <div
        role="dialog"
        aria-modal="true"
        className={[
          'fixed top-0 z-50 flex flex-col',
          'right-0 md:right-auto md:left-0',
          'w-full md:w-[422px] h-dvh',
          'bg-surface',
          'pt-6 px-6 pb-12',
          'justify-between md:justify-start',
          'transition-transform duration-300',
          isOpen ? 'translate-x-0' : 'translate-x-full md:-translate-x-full',
        ].join(' ')}
      >
        {/* Header row — close button right-aligned, bottom border in outline colour */}
        <div className="flex justify-end py-1 border-b border-outline">
          <button
            type="button"
            onClick={onClose}
            aria-label="Luk menu"
            className={[
              'flex items-center justify-center rounded-full p-3 transition-colors',
              'w-12 h-12 md:w-14 md:h-14',
              'text-on-surface-light hover:bg-outline',
            ].join(' ')}
          >
            <X className="w-6 h-6 md:w-8 md:h-8" />
          </button>
        </div>

        {/* Nav list — right-aligned on mobile, 32px below header on desktop */}
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
