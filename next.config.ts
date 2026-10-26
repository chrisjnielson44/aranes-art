import { withBotId } from 'botid/next/config'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Lets the dev server be previewed from other devices on the tailnet.
  allowedDevOrigins: ['100.79.232.123', 'christophers-mac-studio.tailf9c2e3.ts.net'],
}

// BotID proxies its invisible bot check through this site; see src/instrumentation-client.ts.
export default withBotId(nextConfig)
