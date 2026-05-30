# Welta Chikankari — WhatsApp Auto-Reply (Reference Copy)

This is the customer-facing auto-reply copy for the Welta atelier's WhatsApp Business inbox. The same text is surfaced on `/size-guide` (Section 8) in a softened, editorial-page form so customers know what to expect when they message us.

The copy is **reference material only** — wire it into WhatsApp Business → Settings → Business Tools → Quick Replies / Away Message yourself. No code in this repo automates it.

## Auto-reply message

```
🌸 Namaste from Welta Chikankari! 🌸

Thank you for reaching out to us. We would love to help you find or create your perfect handcrafted outfit.

If you are looking for a Custom Size / Plus Size order from 4XL to 10XL+, or want a bespoke outfit tailored just for you, please reply with:

1. Your Full Name
2. Product Link or Screenshot
3. Your Standard Size, or mention "Custom Size"
4. Bust, Waist, Hips, Shoulder, Garment Length, Sleeve Length, Bicep, and Height

Our personal styling assistant will guide you through the measurement confirmation.

Pure Heritage. Perfect Fit.
Team Welta
https://www.weltachikankari.in
```

## Where else this content lives in the site

- `/size-guide` → Section 8 (rendered as an editorial "A note from the atelier" card)
- `/size-guide` → Hero CTA opens `wa.me/<NEXT_PUBLIC_WHATSAPP_NUMBER>` with a measurement template pre-filled
- `/size-guide` → Final CTA card reuses the same WhatsApp URL

## Notes for the atelier team

- Customers who arrive via the `/size-guide` CTAs already have a measurement template pre-filled in their WhatsApp message — they only need to fill the blanks.
- The auto-reply asks for the same fields, so even customers who message you directly (without going through the site) will give you a consistent data shape.
- The site WhatsApp number is read from `NEXT_PUBLIC_WHATSAPP_NUMBER` in `.env.local` and falls back to `918468900336` if unset. Update the env var if the atelier number changes; no code edit needed.
