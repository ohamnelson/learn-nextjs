import CardWrapper from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import { fetchLatestInvoices, fetchCardData } from '../../lib/data';
import { Suspense } from 'react';
import { RevenueChartSkeleton, CardsSkeleton } from '@/app/ui/skeletons';

 
/**
 * The Page component is an asynchronous function that fetches the latest invoices and card data,
 * and renders the dashboard page with various cards and charts.
 *
 * @returns {JSX.Element} The rendered dashboard page.
 *
 * @description
 * This function fetches the latest invoices and card data, and then renders the dashboard page.
 * The page includes a title, a grid of cards displaying various statistics, and a section with
 * a revenue chart and the latest invoices.
 *
 * @remarks
 * The Suspense component is used to display a fallback UI (RevenueChartSkeleton) while the RevenueChart component is being loaded.
 */
export default async function Page() {
    const latestInvoices = await fetchLatestInvoices();
  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>
        <LatestInvoices latestInvoices={latestInvoices} />
      </div>
    </main>
  );
}