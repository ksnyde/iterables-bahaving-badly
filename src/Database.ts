// import { SupabaseClient } from "@supabase/supabase-js";
import { ITableDefinition } from "./Table";

export function Database(...tables: ITableDefinition<any>[]) {
  const names: string[] = [];
  for (const table of tables) {
    console.log("for..of:", table.name);
    names.push(table.name);
  }
  tables.forEach((table) => console.log("forEach:", table.name));

  return {
    tables,
    tableNames: tables.forEach((t) => t.name),
    tableNamesWithForOf: names,
  };
}
