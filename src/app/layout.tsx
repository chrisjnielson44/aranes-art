import { SIGNED_STORAGE_KEY } from '@/components/signature-strokes'
import type { Metadata } from 'next'
import './globals.css'

const description =
  'Original abstract expressionist paintings by Aranes, a self-taught artist based in Naples, Florida. Available through gallery representation.'

export const metadata: Metadata = {
  metadataBase: new URL('https://www.aranesart.com'),
  title: 'Aranes - Abstract Expressionist Artist',
  description,
  openGraph: {
    title: 'Aranés · Original Abstract Paintings',
    description,
    url: '/',
    siteName: 'Aranés',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Runs before first paint so signatures already written this session don't flash empty; see logo.tsx. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var s=sessionStorage.getItem(${JSON.stringify(SIGNED_STORAGE_KEY)});if(s)document.documentElement.dataset.signed=s}catch(e){}`,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap" rel="stylesheet" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
