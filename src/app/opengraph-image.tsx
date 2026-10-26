import { LOGO_PATHS, LOGO_VIEWBOX } from '@/components/logo-paths'
import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

export const alt = 'Aranés, original abstract expressionist paintings from Naples, Florida'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const INK = '#f4f3ee'
const BACKGROUND = '#10110d'

/** The preview shown when aranesart.com is shared: a painting beside the signature. */
export default async function Image() {
  const painting = await readFile(join(process.cwd(), 'public', 'Ocean Ballet.jpg'))
  const signature = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${LOGO_VIEWBOX}">${LOGO_PATHS.map(
    (d) => `<path fill="${INK}" d="${d}"/>`,
  ).join('')}</svg>`

  return new ImageResponse(
    <div style={{ display: 'flex', width: '100%', height: '100%', background: BACKGROUND }}>
      <img
        src={`data:image/jpeg;base64,${painting.toString('base64')}`}
        alt=""
        width={600}
        height={630}
        style={{ objectFit: 'cover' }}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
          gap: 28,
          padding: 48,
        }}
      >
        <img
          src={`data:image/svg+xml;base64,${Buffer.from(signature).toString('base64')}`}
          alt=""
          width={440}
          height={227}
        />
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <div style={{ fontSize: 32, color: INK }}>Original abstract paintings</div>
          <div style={{ fontSize: 26, color: '#a8a99d' }}>Naples, Florida</div>
        </div>
      </div>
    </div>,
    size,
  )
}
