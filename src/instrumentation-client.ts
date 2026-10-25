import { initBotId } from 'botid/client/core'

// The contact form is a server action, which posts to the page it lives on. BotID attaches its invisible bot check
// to those requests, and sendInquiry rejects the ones it flags. BotID needs Web Crypto, which browsers only offer on
// secure pages; the live site is always HTTPS, and BotID's server check is bypassed in local development anyway.
if (window.isSecureContext) initBotId({ protect: [{ path: '/contact', method: 'POST' }] })
