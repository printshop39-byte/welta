// Server-only ORDS / Oracle APEX REST wrapper. Reads APEX_API_TOKEN from
// process.env — never import this module from a client component. Until
// ORDS is provisioned, USE_MOCK flips callers to mock data (src/lib/api/*).

export const USE_MOCK =
  !process.env.APEX_ORDS_BASE_URL || !process.env.APEX_API_TOKEN;

type ApexFetchOptions = {
  revalidate?: number | false;
  tags?: string[];
  signal?: AbortSignal;
};

function baseHeaders(): HeadersInit {
  const token = process.env.APEX_API_TOKEN;
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

function joinUrl(path: string): string {
  const base = process.env.APEX_ORDS_BASE_URL ?? "";
  if (!base) throw new Error("APEX_ORDS_BASE_URL is not configured");
  const trimmedBase = base.endsWith("/") ? base.slice(0, -1) : base;
  const trimmedPath = path.startsWith("/") ? path : `/${path}`;
  return `${trimmedBase}${trimmedPath}`;
}

export async function apexGet<T>(
  path: string,
  options: ApexFetchOptions = {},
): Promise<T> {
  const { revalidate = 300, tags, signal } = options;
  const res = await fetch(joinUrl(path), {
    method: "GET",
    headers: baseHeaders(),
    next: { revalidate, tags },
    signal,
  });
  if (!res.ok) {
    throw new Error(`APEX GET ${path} failed: ${res.status} ${res.statusText}`);
  }
  return (await res.json()) as T;
}

export async function apexPost<T, B = unknown>(
  path: string,
  body: B,
  options: { signal?: AbortSignal } = {},
): Promise<T> {
  const res = await fetch(joinUrl(path), {
    method: "POST",
    headers: baseHeaders(),
    body: JSON.stringify(body),
    signal: options.signal,
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(
      `APEX POST ${path} failed: ${res.status} ${res.statusText}`,
    );
  }
  return (await res.json()) as T;
}
