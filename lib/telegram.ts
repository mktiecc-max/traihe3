import type { Lead } from './supabase'

/**
 * Fire-and-forget: send new lead notification to Telegram bot.
 */
export async function notifyTelegram(lead: Partial<Lead> & { id?: string }) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!token || !chatId) return

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? ''
  const text =
    `🔥 *Lead mới — Trại hè UCMAS 2026*\n` +
    `👶 Bé: ${lead.child_name} (${lead.birth_year})\n` +
    `📞 SĐT: \`${lead.phone}\`\n` +
    `📅 Kỳ: ${lead.session}\n` +
    `📍 ${lead.address || '—'}\n` +
    `💭 ${lead.notes || '—'}\n` +
    `🔗 [Mở trong admin](${siteUrl}/admin/leads/${lead.id})`

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'Markdown' }),
    })
  } catch (err) {
    console.warn('[telegram] notify failed:', err instanceof Error ? err.message : err)
  }
}
