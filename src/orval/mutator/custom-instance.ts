export type ErrorType<Error> = Error;
export type BodyType<BodyData> = BodyData;

type QueryValue = string | number | boolean | null | undefined;

type CustomInstanceOptions = Omit<RequestInit, "body"> & {
  body?: BodyInit | BodyType<unknown> | null;
  params?: Record<string, QueryValue | QueryValue[]>;
};

function buildUrl(
  url: string,
  params?: Record<string, QueryValue | QueryValue[]>,
) {
  const isAbsoluteUrl = /^https?:\/\//i.test(url);
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const targetUrl = isAbsoluteUrl || baseUrl ? new URL(url, baseUrl) : null;

  if (!params) {
    return targetUrl?.toString() ?? url;
  }

  const searchParams = targetUrl?.searchParams ?? new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        if (item !== undefined && item !== null) {
          searchParams.append(key, String(item));
        }
      }

      continue;
    }

    if (value !== undefined && value !== null) {
      searchParams.set(key, String(value));
    }
  }

  if (targetUrl) {
    return targetUrl.toString();
  }

  const queryString = searchParams.toString();
  return queryString ? `${url}?${queryString}` : url;
}

function serializeBody(body: CustomInstanceOptions["body"], headers: Headers) {
  if (
    body == null ||
    typeof body === "string" ||
    body instanceof Blob ||
    body instanceof FormData ||
    body instanceof URLSearchParams ||
    body instanceof ArrayBuffer
  ) {
    return body;
  }

  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  return JSON.stringify(body);
}

async function parseResponse(response: Response) {
  if (response.status === 204) {
    return undefined;
  }

  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    return response.json();
  }

  return response.text();
}

export function customInstance<T>(
  url: string,
  options?: CustomInstanceOptions,
): Promise<T>;
export function customInstance<T>(
  url: string,
  options?: RequestInit,
): Promise<T>;
export async function customInstance<T>(
  url: string,
  {
    body,
    params,
    headers: requestHeaders,
    ...requestInit
  }: CustomInstanceOptions = {},
): Promise<T> {
  const headers = new Headers(requestHeaders);
  const response = await fetch(buildUrl(url, params), {
    ...requestInit,
    headers,
    body: serializeBody(body, headers),
    credentials: requestInit.credentials ?? "same-origin",
  });

  if (!response.ok) {
    throw await parseResponse(response);
  }

  return (await parseResponse(response)) as T;
}

export default customInstance;
