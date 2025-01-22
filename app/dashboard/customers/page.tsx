import { fetchFilteredCustomers } from '@/app/lib/data';
import Search from '@/app/ui/search';
import Table from '@/app/ui/customers/table';
import { Suspense } from 'react';
import { CustomersTableSkeleton } from '@/app/ui/skeletons';

export default async function Page( props: {
    searchParams?: Promise<{
      query?: string;
    }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const customers = await fetchFilteredCustomers(query);
  

  return (
    <>
      <Suspense key={query} fallback={<CustomersTableSkeleton />}>
              <Table customers={customers} />
      </Suspense>
    </>
  );
}