import { PostgrestFilterBuilder } from "@supabase/postgrest-js";
import { SupabaseClient } from "@supabase/supabase-js";
import * as t from "io-ts";

export interface ITableDefinition<T extends object> {
  kind: "Supabase Table";
  name: Readonly<string>;

  is: t.Mixed["is"];
  encode: t.Mixed["encode"];
  decode: t.Mixed["decode"];

  select: ISelect<T>;
}

export const Table = (client: SupabaseClient) => <T extends object>(
  model: t.Type<T>
): ITableDefinition<T> => {
  return {
    // basics
    name: model.name,
    kind: "Supabase Table",
    // io-ts
    is: model.is,
    encode: model.encode,
    decode: model.decode,
    // crud
    select: selectDefinition<T>(model.name, client),
  };
};

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
