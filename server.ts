export interface OrganicResult {
  position: number;
  title: string;
  url: string;
  snippet: string;
}

export interface LocalResult {
  position: number;
  business_name: string;
  rating: number | null;
  reviews: number | null;
  address: string | null;
}

export interface SearchObservation {
  query: string;
  observed_at: string;
  organic_results: OrganicResult[];
  local_results: LocalResult[];
}
