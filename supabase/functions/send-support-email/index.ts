// ====================================================================
// IKAAI ACADEMY – SUPABASE EDGE FUNCTION: SUPPORT EMAIL NOTIFICATIONS
// Path: supabase/functions/send-support-email/index.ts
// ====================================================================

import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

interface EmailPayload {
  type: "learner_reply" | "instructor_reply" | "new_thread";
  thread_id: string;
  recipient_email: string;
  recipient_name: string;
  sender_name: string;
  subject: string;
  message_preview: string;
  programme: string;
}

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const SENDER_EMAIL = Deno.env.get("SENDER_EMAIL") || "support@ikaaiindia.in";

serve(async (req: Request) => {
  // CORS Headers
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Content-Type": "application/json"
  };

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const payload: EmailPayload = await req.json();

    if (!payload.recipient_email || !payload.subject) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: recipient_email, subject" }),
        { status: 400, headers: corsHeaders }
      );
    }

    // If Resend API Key is not set, exit gracefully without failing frontend requests
    if (!RESEND_API_KEY) {
      console.log(`[Email Skipped] No RESEND_API_KEY configured. Email to ${payload.recipient_email} logged: "${payload.subject}"`);
      return new Response(
        JSON.stringify({
          success: true,
          status: "skipped",
          message: "Email provider not configured. Notification skipped gracefully."
        }),
        { status: 200, headers: corsHeaders }
      );
    }

    // Build branded HTML template
    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; background: #ffffff;">
        <div style="background-color: #00511e; padding: 20px; color: #ffffff;">
          <h2 style="margin: 0; font-size: 20px; font-weight: 700;">Ikaai India Library – Support</h2>
          <p style="margin: 4px 0 0; font-size: 13px; color: #5ee9b5;">${payload.programme.toUpperCase()} PROGRAMME SUPPORT</p>
        </div>
        <div style="padding: 24px; color: #1e293b; line-height: 1.6;">
          <p style="margin-top: 0;">Hello <strong>${payload.recipient_name}</strong>,</p>
          <p>You have a new update regarding: <strong>${payload.subject}</strong></p>
          <div style="background-color: #f8fafc; border-left: 4px solid #00a544; padding: 14px 16px; margin: 18px 0; border-radius: 4px; font-style: italic; color: #334155;">
            "${payload.message_preview}"
          </div>
          <p style="font-size: 13px; color: #64748b;">
            Sent by <strong>${payload.sender_name}</strong>.
          </p>
          <div style="margin-top: 24px; text-align: center;">
            <a href="https://ikaaiindia.in" style="background-color: #00a544; color: #ffffff; text-decoration: none; padding: 10px 22px; border-radius: 6px; font-weight: 600; font-size: 14px; display: inline-block;">View in Portal</a>
          </div>
        </div>
        <div style="background-color: #f1f5f9; padding: 14px 20px; font-size: 11.5px; color: #94a3b8; text-align: center; border-top: 1px solid #e2e8f0;">
          Ikaai India Foundation · Academy Support Inbox · Confidential & Internal
        </div>
      </div>
    `;

    // Send via Resend API
    const resendRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: `Ikaai Academy Support <${SENDER_EMAIL}>`,
        to: [payload.recipient_email],
        subject: `[Ikaai Support] ${payload.subject}`,
        html: htmlContent
      })
    });

    const resendData = await resendRes.json();

    if (!resendRes.ok) {
      console.error("[Email Error] Resend API error:", resendData);
      return new Response(JSON.stringify({ error: resendData }), { status: 500, headers: corsHeaders });
    }

    return new Response(
      JSON.stringify({ success: true, emailId: resendData.id }),
      { status: 200, headers: corsHeaders }
    );
  } catch (err: any) {
    console.error("[Email Exception]:", err.message);
    return new Response(JSON.stringify({ error: err.message }), { status: 500, headers: corsHeaders });
  }
});

