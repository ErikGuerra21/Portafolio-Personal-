import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (
      typeof name !== "string" || typeof email !== "string" || typeof message !== "string" ||
      !name.trim() || !email.trim() || !message.trim()
    ) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    if (name.length > 100 || email.length > 200 || message.length > 2000) {
      return NextResponse.json({ error: "Fields too long" }, { status: 400 });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "erik21guerra8@gmail.com",
      replyTo: email,
      subject: `Nuevo mensaje de ${esc(name)} — Portfolio`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;color:#1a1a1a">
          <h2 style="margin-bottom:24px">Nuevo mensaje desde tu portfolio</h2>
          <p><strong>Nombre:</strong> ${esc(name)}</p>
          <p><strong>Email:</strong> ${esc(email)}</p>
          <p><strong>Mensaje:</strong></p>
          <p style="white-space:pre-wrap;background:#f5f5f5;padding:16px;border-radius:8px">${esc(message)}</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
