import { HttpParams } from '@angular/common/http';

type Primitive = string | number | boolean | bigint;

export function toHttpParams(obj: Record<string, Primitive | readonly Primitive[] | null | undefined>): HttpParams {
  const out: Record<string, string | string[]> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value === null || value === undefined) {
      continue;
    }
    out[key] = Array.isArray(value) ? value.map(String) : String(value);
  }

  return new HttpParams({ fromObject: out });
}
