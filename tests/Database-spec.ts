import { createClient } from "@supabase/supabase-js";
import { Database } from "~/Database";
import { Table } from "~/Table";
import { Playlist, Song } from "./data";

describe("Trouble with iterables => ", () => {
  it("for ... of returns the names of the tables correctly", () => {
    const client = createClient("https://fake.url", "fake-key");
    const db = Database(Table(client)(Song), Table(client)(Playlist));

    expect(db.tableNamesWithForOf).toHaveLength(2);
    expect(db.tableNamesWithForOf).toContain("Song");
    expect(db.tableNamesWithForOf).toContain("Playlist");
  });

  it("forEach returns the names of the tables correctly", () => {
    const client = createClient("https://fake.url", "fake-key");
    const db = Database(Table(client)(Song), Table(client)(Playlist));

    expect(db.tableNames).toHaveLength(2);
    expect(db.tableNames).toContain("Song");
    expect(db.tableNames).toContain("Playlist");
  });
});
