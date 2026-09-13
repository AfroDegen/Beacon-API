const SERPAPI_BASE =
  "https://serpapi.com/search.json";

export async function getObservation(
  query: string
) {
  const apiKey = process.env.SERPAPI_KEY;

  if (!apiKey) {
    throw new Error(
      "SERPAPI_KEY is missing"
    );
  }

  const response = await fetch(
    `${SERPAPI_BASE}?engine=google&q=${encodeURIComponent(
      query
    )}&api_key=${apiKey}`
  );

  if (!response.ok) {
    throw new Error(
      `SerpAPI failed: ${response.status}`
    );
  }

  const data = await response.json();

  return {
    query,
    observed_at:
      new Date().toISOString(),
    results: data
  };
}
