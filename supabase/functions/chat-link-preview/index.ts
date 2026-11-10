// Supabase Edge Function: chat-link-preview
// Secure OpenGraph metadata scraper with SSRF protection

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

function isPrivateIpOrHost(urlStr: string): boolean {
  try {
    const parsed = new URL(urlStr);
    const host = parsed.hostname.toLowerCase();
    
    // Disallow loopback, private networks, cloud metadata
    if (
      host === "localhost" ||
      host.endsWith(".local") ||
      host.endsWith(".internal") ||
      host === "127.0.0.1" ||
      host === "0.0.0.0" ||
      host === "169.254.169.254" ||
      host.startsWith("10.") ||
      host.startsWith("192.168.") ||
      host.startsWith("172.16.") ||
      host.startsWith("172.17.") ||
      host.startsWith("172.18.") ||
      host.startsWith("172.19.") ||
      host.startsWith("172.2") ||
      host.startsWith("172.30.") ||
      host.startsWith("172.31.")
    ) {
      return true;
    }
    return false;
  } catch {
    return true;
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { url } = await req.json();

    if (!url || typeof url !== "string") {
      return new Response(JSON.stringify({ error: "Missing url parameter" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      return new Response(JSON.stringify({ error: "Only http/https URLs are supported" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (isPrivateIpOrHost(url)) {
      return new Response(JSON.stringify({ error: "Forbidden URL target" }), {
        status: 403,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Fetch the target URL with a timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent": "IkaaiChatBot/1.0 (+https://ikaaiindia.in)",
        "Accept": "text/html,application/xhtml+xml",
      },
    });
    clearTimeout(timeoutId);

    const html = await response.text();

    // Extract title
    const titleMatch = html.match(/<meta property=["']og:title["'] content=["'](.*?)["']/i) ||
                       html.match(/<title>(.*?)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : new URL(url).hostname;

    // Extract description
    const descMatch = html.match(/<meta property=["']og:description["'] content=["'](.*?)["']/i) ||
                      html.match(/<meta name=["']description["'] content=["'](.*?)["']/i);
    const description = descMatch ? descMatch[1].trim() : "";

    // Extract image
    const imgMatch = html.match(/<meta property=["']og:image["'] content=["'](.*?)["']/i);
    const image = imgMatch ? imgMatch[1].trim() : null;

    // Extract site name
    const siteMatch = html.match(/<meta property=["']og:site_name["'] content=["'](.*?)["']/i);
    const siteName = siteMatch ? siteMatch[1].trim() : new URL(url).hostname;

    return new Response(
      JSON.stringify({
        url,
        title,
        description,
        image,
        siteName,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message || "Failed to fetch link preview" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});

