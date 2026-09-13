import { SearchObservation } from "./types";

const SERPAPI_BASE =
  "https://serpapi.com/search.json";

export async function getObservation(
  query: string
): Promise<SearchObservation> {
  const apiKey = process.env.SERPAPI_KEY;

  if (!apiKey) {
    throw new Error(
      "SERPAPI_KEY is missing."
    );
  }

  const url =
    `${SERPAPI_BASE}?engine=google&q=${encodeURIComponent(
      query
    )}&api_key=${apiKey}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `SerpAPI error: ${response.status}`
    );
  }

  const raw = await response.json();

  return {
    query,
    observed_at: new Date().toISOString(),

    organic_results:
      (raw.organic_results || [])
        .slice(0, 10)
        .map((r: any) => ({
          position: r.position || 0,
          title: r.title || "",
          url: r.link || "",
          snippet: r.snippet || ""
        })),

    local_results:
      (
        raw.local_results ||
        raw.local_map_results ||
        []
      )
        .slice(0, 10)
        .map((r: any, i: number) => ({
          position:
            r.position || i + 1,

          business_name:
            r.title ||
            r.name ||
            "Unknown Business",

          rating:
            typeof r.rating === "number"
              ? r.rating
              : null,

          reviews:
            typeof r.reviews === "number"
              ? r.reviews
              : null,

          address:
            r.address ||
            r.address_line ||
            null
        }))
  };
}
