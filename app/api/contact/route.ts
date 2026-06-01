import { NextResponse } from "next/server";

export const runtime = "nodejs";

const MAX_FILE_BYTES = 8 * 1024 * 1024; // 8 MB

interface Lead {
  name: string;
  email: string;
  company: string;
  revenue: string;
  service: string;
  timeline: string;
  current: string;
  message: string;
  leadScore: string;
}

export async function POST(req: Request) {
  let lead: Lead;
  let file: File | null = null;

  try {
    const fd = await req.formData();
    lead = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      company: String(fd.get("company") || ""),
      revenue: String(fd.get("revenue") || ""),
      service: String(fd.get("service") || ""),
      timeline: String(fd.get("timeline") || ""),
      current: String(fd.get("current") || ""),
      message: String(fd.get("message") || ""),
      leadScore: String(fd.get("leadScore") || "0"),
    };
    const f = fd.get("file");
    if (f && f instanceof File && f.size > 0) file = f;
  } catch {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }

  // Server-side validation
  if (!lead.name.trim() || !/\S+@\S+\.\S+/.test(lead.email)) {
    return NextResponse.json({ error: "Name and a valid email are required." }, { status: 422 });
  }
  if (file && file.size > MAX_FILE_BYTES) {
    return NextResponse.json({ error: "File too large (max 8 MB)." }, { status: 413 });
  }

  // Fan out to email + CRM in parallel; never fail the user if an integration is down.
  const results = await Promise.allSettled([sendEmail(lead, file), pushToCrm(lead)]);
  results.forEach((r) => r.status === "rejected" && console.error("[contact] integration error:", r.reason));

  return NextResponse.json({ ok: true });
}

/* ----------------------------- Email (Resend) ----------------------------- */
async function sendEmail(lead: Lead, file: File | null) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_NOTIFY_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL || "ACCOUNTCLERKS <noreply@accountclerks.com>";

  if (!key || !to) {
    console.info("[contact] email not configured — lead captured:", lead);
    return;
  }

  const attachments: { filename: string; content: string }[] = [];
  if (file) {
    const buf = Buffer.from(await file.arrayBuffer());
    attachments.push({ filename: file.name, content: buf.toString("base64") });
  }

  const html = `
    <h2>New enquiry — lead score ${lead.leadScore}/100</h2>
    <table cellpadding="6" style="font-family:sans-serif;font-size:14px">
      <tr><td><b>Name</b></td><td>${esc(lead.name)}</td></tr>
      <tr><td><b>Email</b></td><td>${esc(lead.email)}</td></tr>
      <tr><td><b>Company</b></td><td>${esc(lead.company)}</td></tr>
      <tr><td><b>Revenue</b></td><td>${esc(lead.revenue)}</td></tr>
      <tr><td><b>Needs</b></td><td>${esc(lead.service)}</td></tr>
      <tr><td><b>Timeline</b></td><td>${esc(lead.timeline)}</td></tr>
      <tr><td><b>Current setup</b></td><td>${esc(lead.current)}</td></tr>
      <tr><td><b>Message</b></td><td>${esc(lead.message)}</td></tr>
    </table>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: [to],
      reply_to: lead.email,
      subject: `New enquiry: ${lead.company || lead.name} (score ${lead.leadScore})`,
      html,
      attachments: attachments.length ? attachments : undefined,
    }),
  });
  if (!res.ok) throw new Error(`Resend failed: ${res.status}`);
}

/* ------------------------------- CRM push --------------------------------- */
async function pushToCrm(lead: Lead) {
  // Generic CRM webhook (Zapier/Make/HubSpot workflow/custom endpoint).
  const webhook = process.env.CRM_WEBHOOK_URL;
  if (webhook) {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ source: "website-contact", ...lead, createdAt: new Date().toISOString() }),
    });
    if (!res.ok) throw new Error(`CRM webhook failed: ${res.status}`);
    return;
  }

  // Optional native HubSpot Forms submission.
  const portalId = process.env.HUBSPOT_PORTAL_ID;
  const formGuid = process.env.HUBSPOT_FORM_GUID;
  if (portalId && formGuid) {
    const res = await fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fields: [
          { name: "email", value: lead.email },
          { name: "firstname", value: lead.name },
          { name: "company", value: lead.company },
          { name: "message", value: `${lead.service} · ${lead.revenue} · ${lead.timeline} · score ${lead.leadScore}\n${lead.message}` },
        ],
      }),
    });
    if (!res.ok) throw new Error(`HubSpot failed: ${res.status}`);
    return;
  }

  console.info("[contact] CRM not configured — lead captured:", lead.email, "score", lead.leadScore);
}

function esc(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
