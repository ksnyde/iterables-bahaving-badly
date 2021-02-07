import * as t from "io-ts";

export const SongMeta = t.partial({ year: t.number, genre: t.string });
export const Song_RequiredProps = t.type({
  song: t.string,
  artist: t.string,
});
export const Song_OptionalProps = t.partial({
  album: t.string,
  meta: SongMeta,
});

export const Song = t.intersection([Song_RequiredProps, Song_OptionalProps], "Song");

export type ISong = t.TypeOf<typeof Song>;
export const mySong: ISong = {
  artist: "Billy Idol",
  song: "Whiplash Smile",
  album: "Best of",
};
