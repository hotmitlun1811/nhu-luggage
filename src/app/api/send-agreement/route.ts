import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Absolute URL is required because these links go out in an email, not a page.
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://nhu-luggage.vercel.app").replace(/\/$/, "");

// Gmail SMTP relay: authenticates as GMAIL_USER via an app password, so the
// "from" address must match the authenticated account (Gmail rewrites/rejects
// mismatched From headers on its relay). Customer replies land on REPLY_TO instead.
const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
const REPLY_TO = process.env.EMAIL_REPLY_TO || "stowdanang@gmail.com";

type Body = {
  to?: string;
  name?: string;
  ref?: string;
  planName?: string;
  planDuration?: string;
  lane?: "flexible" | "flatrate";
};

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string));
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as Body;
  const { to, name, ref, planName, planDuration, lane } = body;

  if (!to) {
    return NextResponse.json({ error: "Missing recipient email" }, { status: 400 });
  }

  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
    return NextResponse.json(
      { error: "Email service not configured — set GMAIL_USER and GMAIL_APP_PASSWORD to enable this." },
      { status: 503 }
    );
  }

  const laneLabel = lane === "flexible" ? "Lane 1 — Flexible" : "Lane 2 — Flat Rate";

  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; color: #0D1829;">
      <h2 style="margin-bottom: 4px;">Hi ${escapeHtml(name || "there")},</h2>
      <p>Thanks for storing your luggage with Stow Da Nang. Here's your booking summary and our storage policy.</p>
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr><td style="padding: 4px 0; color: #666;">Reference</td><td style="padding: 4px 0; font-weight: bold;">${escapeHtml(ref || "—")}</td></tr>
        <tr><td style="padding: 4px 0; color: #666;">Plan</td><td style="padding: 4px 0; font-weight: bold;">${escapeHtml(planName || "—")}${planDuration ? ` — ${escapeHtml(planDuration)}` : ""}</td></tr>
        <tr><td style="padding: 4px 0; color: #666;">Lane</td><td style="padding: 4px 0; font-weight: bold;">${laneLabel}</td></tr>
      </table>
      <p>By dropping off your luggage with us, you agree to our:</p>
      <ul>
        <li><a href="${SITE_URL}/terms-of-service">Terms of Service</a></li>
        <li><a href="${SITE_URL}/privacy-policy">Privacy Policy</a></li>
      </ul>
      <p>Keep this email for your records. See you soon!</p>
      <p style="color: #999; font-size: 12px; margin-top: 24px;">— Stow Da Nang · WhatsApp 0905 955 161</p>
    </div>
  `;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
  });

  try {
    await transporter.sendMail({
      from: `Stow Da Nang <${GMAIL_USER}>`,
      to,
      replyTo: REPLY_TO,
      subject: `Your Stow Da Nang booking${ref ? ` (${ref})` : ""} — policy & agreement`,
      html,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: `Gmail SMTP error: ${message}` }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
