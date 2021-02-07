import * as t from "io-ts";

export interface ITableDefinition<T extends object> {
  kind: "Supabase Table";
  name: Readonly<string>;

  is: t.Mixed["is"];
  encode: t.Mixed["encode"];
  decode: t.Mixed["decode"];
}

export const Table = <T extends object>(model: t.Type<T>): ITableDefinition<T> => {
  return {
    // basics
    name: model.name,
    kind: "Supabase Table",
    // io-ts
    is: model.is,
    encode: model.encode,
    decode: model.decode,
  };
};
