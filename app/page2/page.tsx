import type { Metadata } from 'next';

import { SITE } from '~/config.js';

export const metadata: Metadata = {
  title: SITE.title,
};

export default function Page() {
  return (
    <section>
      <h1>Page2</h1>
    </section>
  );
}
