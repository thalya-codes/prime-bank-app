type GenericFilters = Record<string, string | number | string[] | undefined>;

export function generateSearchParams(filters: GenericFilters): string {
  const urlParams = new URLSearchParams(
    Object.entries(filters)
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          return value.map((v) => [key, v]);
        }
        if (typeof value !== "undefined") {
          return [[key, String(value)]];
        }
        return [];
      })
      .flat()
  );
  return urlParams.toString();
}

