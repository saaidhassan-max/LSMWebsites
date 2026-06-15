import type React from 'react';
import { listOffers, listOperators } from '@/lib/cms-content-store';
import { getHomeConfig } from '@/lib/home-store';
import { getSiteSettings } from '@/lib/site-settings-store';
import { HomeEditor } from '@/components/home-editor';

export const dynamic = 'force-dynamic';

export default async function HomeScreen(): Promise<React.ReactElement> {
    const [offers, operators, config, settings] = await Promise.all([
        listOffers(),
        listOperators(),
        getHomeConfig(),
        getSiteSettings()
    ]);

    return <HomeEditor config={config} offers={offers} operators={operators} settings={settings} />;
}
