import { getStore } from "@netlify/blobs";

const STORE_NAME = "envato-tracker";
const DATA_KEY = "items";

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

export default async function handler(request) {
  const store = getStore({ name: STORE_NAME, consistency: "strong" });

  try {
    if (request.method === "GET") {
      const items = await store.get(DATA_KEY, { type: "json", consistency: "strong" });
      return json({ items: Array.isArray(items) ? items : null });
    }

    if (request.method === "PUT") {
      const body = await request.json();

      if (!body || !Array.isArray(body.items)) {
        return json({ error: "Payload items harus berupa array." }, 400);
      }

      // The whole tracker is stored as one JSON blob.
      // Netlify Blobs persists it outside the deployed HTML, so all visitors
      // share the same data and it survives future deploys.
      await store.setJSON(DATA_KEY, body.items);

      return json({ ok: true, count: body.items.length });
    }

    return json({ error: "Method tidak didukung." }, 405);
  } catch (error) {
    console.error("Envato tracker data function error:", error);
    return json(
      { error: error instanceof Error ? error.message : "Unknown server error" },
      500
    );
  }
}
