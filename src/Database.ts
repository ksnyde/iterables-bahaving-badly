import { ITableDefinition } from "./Table";

export function Database(...tables: ITableDefinition<any>[]) {
  const names: string[] = [];
  for (const table of tables) {
    names.push(table.name);
  }

  return {
    tables,
    tableNames: tables.forEach((table) => table.name),
    tableNamesWithForOf: names,
  };
}
