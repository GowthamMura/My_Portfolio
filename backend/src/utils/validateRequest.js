export class HttpError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const pick = (obj, keys) => {
  const out = {};
  for (const k of keys) {
    if (obj[k] !== undefined) out[k] = obj[k];
  }
  return out;
};

export const requireBodyFields = (body, fields) => {
  const missing = [];
  for (const field of fields) {
    const val = body?.[field];
    if (val === undefined || val === null || String(val).trim() === "") {
      missing.push(field);
    }
  }
  if (missing.length) {
    throw new HttpError(400, `Missing required fields: ${missing.join(", ")}`);
  }
};

export const parsePagination = (query, defaults = { page: 1, limit: 10 }) => {
  const page = Math.max(1, Number(query?.page || defaults.page));
  const limit = Math.min(100, Math.max(1, Number(query?.limit || defaults.limit)));
  const skip = (page - 1) * limit;
  return { page, limit, skip };
};

