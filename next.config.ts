import { withBotId } from 'botid/next/config'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
}

// BotID proxies its invisible bot check through this site; see src/instrumentation-client.ts.
export default withBotId(nextConfig)
