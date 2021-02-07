import type { PostgrestFilterBuilder } from "@supabase/postgrest-js";
import type { SupabaseClient } from "@supabase/supabase-js";

export type ISelect<T> = (
  ...columns: ["*"] | Array<keyof T>
) => PostgrestFilterBuilder<T>;

export function selectDefinition<T>(
  tableName: string,
  client: SupabaseClient
): ISelect<T> {
  return (...columns: ["*"] | Array<keyof T>) => {
    const cols =
      columns.length === 0 || (columns.length === 1 && columns[0]) === "*"
        ? "*"
        : columns.join(",");

    // receives a _typed_ filter operator which can
    const filter = (client
      .from<T>(tableName)
      .select(cols) as unknown) as PostgrestFilterBuilder<T>;

    return filter;
  };
}
