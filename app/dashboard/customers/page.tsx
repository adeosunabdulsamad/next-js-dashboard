import { fetchFilteredCustomers } from '@/app/lib/data';
import Search from '@/app/ui/search';
import Image from 'next/image';

type Customer = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export default async function Page( props: {
    searchParams?: Promise<{
      query?: string;
    }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const customers = await fetchFilteredCustomers(query);
  

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Customers</h1>
      <Search placeholder="Search customers..."/>
      <table className="hidden min-w-full text-gray-900 md:table">
                  <thead className="rounded-lg text-left text-sm font-normal">
                    <tr>
                      <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                        Customer
                      </th>
                      <th scope="col" className="px-3 py-5 font-medium">
                        Email
                      </th>
                      <th scope="col" className="px-3 py-5 font-medium">
                        invoices
                      </th>
                      <th scope="col" className="px-3 py-5 font-medium">
                        Pending
                      </th>
                      <th scope="col" className="px-3 py-5 font-medium">
                        Paid
                      </th>
                      <th scope="col" className="relative py-3 pl-6 pr-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {customers?.map((customer) => (
                      <tr
                        key={customer.id}
                        className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                      >
                        <td className="whitespace-nowrap py-3 pl-6 pr-3">
                          <div className="flex items-center gap-3">
                            <Image
                              src={customer.image_url}
                              className="rounded-full"
                              width={28}
                              height={28}
                              alt={`${customer.name}'s profile picture`}
                            />
                            <p>{customer.name}</p>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-3">
                          {customer.email}
                        </td>
                        <td className="whitespace-nowrap px-3 py-3">
                          {customer.total_invoices}
                        </td>
                        <td className="whitespace-nowrap px-3 py-3">
                          {customer.total_pending}
                        </td>
                        <td className="whitespace-nowrap px-3 py-3">
                          {customer.total_paid}
                        </td>
                        <td className="whitespace-nowrap py-3 pl-6 pr-3">
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
    </div>
  );
}