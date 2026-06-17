import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

type Env = {
  TARGET_PHONE_NUMBER?: string;
};

/**
 * Generate a WhatsApp Web URL with a pre‑filled message.
 * The URL can be opened client‑side to start a WhatsApp chat.
 */
async function generateWhatsAppUrl(message: string, env: Env) {
  const phone = (env.TARGET_PHONE_NUMBER ?? '9258410701').replace(/^\+/, '');
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encoded}`;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const entries: Record<string, string> = {};
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        entries[key] = `File: ${value.name} (${value.type}, ${value.size} bytes)`;
      } else {
        entries[key] = String(value);
      }
    }

    const lines = ['New Form Submission:'];
    for (const [k, v] of Object.entries(entries)) {
      lines.push(`${k}: ${v}`);
    }
    const message = lines.join('\n');

    const whatsappUrl = await generateWhatsAppUrl(message, process.env as unknown as Env);
    return NextResponse.json({ success: true, whatsappUrl }, { status: 200 });
  } catch (error) {
    console.error('Error in /api/send-to-phone:', error);
    return NextResponse.json({ success: false, error: 'Failed to process form' }, { status: 500 });
  }
}
