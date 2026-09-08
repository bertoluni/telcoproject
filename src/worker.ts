export interface Env {
  DB: D1Database;
  ASSETS: Fetcher;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Content-Type': 'application/json',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    if (url.pathname === '/api/contact' && request.method === 'POST') {
      try {
        const body = (await request.json()) as {
          email?: string;
          name?: string;
          company?: string;
          message?: string;
        };

        if (!body.email || !body.email.includes('@')) {
          return new Response(
            JSON.stringify({ success: false, error: 'A valid email address is required.' }),
            { status: 400, headers: corsHeaders }
          );
        }

        if (!env.DB) {
          return new Response(
            JSON.stringify({ success: false, error: 'Database binding (env.DB) not found.' }),
            { status: 500, headers: corsHeaders }
          );
        }

        const result = await env.DB.prepare(
          'INSERT INTO leads (email, name, company, message) VALUES (?, ?, ?, ?)'
        )
          .bind(body.email, body.name || '', body.company || '', body.message || '')
          .run();

        return new Response(
          JSON.stringify({
            success: true,
            message: 'Inquiry saved successfully!',
            insertedId: result.meta?.last_row_id || null,
            email: body.email,
          }),
          { status: 200, headers: corsHeaders }
        );
      } catch (err: any) {
        return new Response(
          JSON.stringify({ success: false, error: err.message || 'Database execution failed' }),
          { status: 500, headers: corsHeaders }
        );
      }
    }

    if (url.pathname === '/api/stats' && request.method === 'GET') {
      try {
        let count = 0;
        if (env.DB) {
          const result = await env.DB.prepare('SELECT COUNT(*) as count FROM leads').all<{ count: number }>();
          if (result.results && result.results[0]) {
            count = result.results[0].count;
          }
        }
        return new Response(
          JSON.stringify({
            activeNodes: 99.99,
            latencyMs: 14.2,
            totalLeads: count,
            timestamp: new Date().toISOString(),
          }),
          { status: 200, headers: corsHeaders }
        );
      } catch (err: any) {
        return new Response(
          JSON.stringify({ error: err.message }),
          { status: 500, headers: corsHeaders }
        );
      }
    }

    return env.ASSETS.fetch(request);
  },
};
