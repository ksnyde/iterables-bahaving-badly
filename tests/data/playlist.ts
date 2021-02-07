import * as t from "io-ts";

export const Playlist = t.intersection(
  [
    t.type({
      name: t.string,
    }),
    t.partial({
      description: t.string,
      genre: t.string,
    }),
  ],
  "Playlist"
);
