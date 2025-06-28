import type { Metadata } from 'next';

import { SITE } from '~/config.js';
import { getClient } from '~/api/config';
import { GetCountriesDocument } from '~/api/__generated__/graphql';

export const metadata: Metadata = {
  title: SITE.title,
};

export default async function Home() {
  const { data } = await getClient().query({
    query: GetCountriesDocument,
    context: {
      fetchOptions: {
        next: { revlidte: 10 },
      },
    },
  });

  return (
    <main className="">
      {data?.countries?.map((country: any, index: number) => {
        return (
          <div key={index} className="border-white border-b-2">
            <ul>
              <li>{country?.name}</li>
              <li>{country?.code}</li>
            </ul>
          </div>
        );
      })}
    </main>
  );
}
