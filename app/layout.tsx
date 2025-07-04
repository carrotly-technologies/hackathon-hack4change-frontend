import { Metadata } from 'next';

import { SITE } from '~/config.js';

import { Inter as CustomFont } from 'next/font/google';
import '~/assets/styles/base.css';
import ApolloWrapper from '../src/components/common/ApolloWrapper';
import ConditionalFlyingEmojis from '../src/components/common/ConditionalFlyingEmojis';

const customFont = CustomFont({ subsets: ['latin'], variable: '--font-custom' });

export interface LayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: {
    template: `%s — ${SITE.name}`,
    default: SITE.title,
  },
  description: SITE.description,
};

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en" className={`motion-safe:scroll-smooth ${customFont.variable} font-sans `}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="tracking-tight antialiased text-gray-900 dark:text-slate-300">
        <ConditionalFlyingEmojis />
        <ApolloWrapper>
          <main>{children}</main>
        </ApolloWrapper>
      </body>
    </html>
  );
}
