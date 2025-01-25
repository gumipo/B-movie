"use server";

import { HttpError } from "./http-error";
import { parseURLSearchParams } from "./query-param";

interface Options<T = object> {
  params?: T;
  headers?: HeadersInit;
  validateStatus?: (status: number) => boolean;
}

/** 絶対URLかどうかを判定する　*/
function isAbsoluteURL(url: string): boolean {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(url);
}

/** URLとパスを連結する */
function combineUrls(baseURL: string, relativeURL: string): string {
  return relativeURL
    ? baseURL.replace(/\/+$/, "") + "/" + relativeURL.replace(/^\/+/, "")
    : baseURL;
}

/** URLを構築する */
function buildFullPath(baseURL: string, requestedURL: string): string {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineUrls(baseURL, requestedURL);
  }
  return requestedURL;
}

/** リクエストヘッダを構築する */
async function buildHeaders<T = HeadersInit>(
  headers?: T,
  body?: unknown
): Promise<HeadersInit> {
  const defaultHeaders: HeadersInit = {
    Referer: process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000",
    Origin: process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000",
  };

  if (body instanceof FormData) return { ...defaultHeaders, ...headers };

  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...defaultHeaders,
    ...headers,
  };
}

/** リクエストボディを構築する */
function buildRequestBody<T = object>(body: T): string | FormData | null {
  // FormDataの場合、 `JSON.stringify()` せずそのまま返す
  if (body instanceof FormData) return body;

  // bodyがnull,undefinedの場合はnullを返して終了する
  // JSON.stringifyにnullを渡すとエラーになるため
  if (!body) return null;

  return JSON.stringify(body);
}

/** クエリパラメータ付きのURLパスを構築する */
function buildPathWithSearchParams<T = object>(path: string, params?: T) {
  // パラメータがない場合、URLパスをそのまま返す
  if (!params || Object.keys(params).length === 0) return path;

  const urlSearchParams = parseURLSearchParams(params);
  return `${path}?${urlSearchParams.toString()}`;
}

/** 通信処理を共通化した関数 */
async function http<T>(path: string, config: RequestInit): Promise<T> {
  console.log(process.env.API_END_POINT);
  const request = new Request(
    // NEXT_PUBLIC_API_ROOTは必ず値が存在する想定なので `!` で型エラーを回避する
    buildFullPath(process.env.API_END_POINT!, path),
    config
  );

  const res = await fetch(request);

  if (!res.ok) {
    const error = new HttpError(res);
    const data = await res.json();
    const errors = data.errors;
    const errorMessage = errors
      ? data.message + "\n" + Object.values(errors).join("\n")
      : data.message;
    error.message = errorMessage;
    error.status = res.status;
    throw error;
  }

  // statusCodeが204のときにres.json()を実行するとエラーになるため
  if (res.status === 204) return {} as T;

  return await res.json();
}

export async function get<T, U = object>(
  path: string,
  options?: Options<U>
): Promise<T> {
  return http<T>(
    buildPathWithSearchParams(
      path,
      options?.params ? options.params : undefined
    ),
    {
      method: "GET",
      headers: await buildHeaders(options?.headers),
    }
  );
}

export async function post<T, U, V = object>(
  path: string,
  body: T,
  options?: Options<V>
): Promise<U> {
  return http<U>(path, {
    method: "POST",
    headers: await buildHeaders(options?.headers, body),
    body: buildRequestBody(body),
  });
}

export async function put<T, U = object>(
  path: string,
  body: T,
  options?: Options<U>
): Promise<U> {
  return http<U>(path, {
    method: "PUT",
    body: buildRequestBody(body),
    headers: await buildHeaders(options?.headers, body),
  });
}

// deleteはJSの予約語であるためdestroyとする
export async function destroy<T = object>(
  path: string,
  options?: Options<T>
): Promise<unknown> {
  return http(
    buildPathWithSearchParams(
      path,
      options?.params ? options.params : undefined
    ),
    {
      method: "DELETE",
      headers: await buildHeaders(options?.headers),
    }
  );
}
