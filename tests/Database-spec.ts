import { Database } from "~/Database";
import { Table } from "~/Table";
import { Playlist, Song } from "./data";

describe("Trouble with iterables => ", () => {
  // db.tables is received as an array
  it("tables property is an array", () => {
    const db = Database(Table(Song), Table(Playlist));
    expect(Array.isArray(db.tables)).toBe(true);
    expect(typeof db.tables[0]).toBe("object");
  });

  // for..of iterates over the array correctly and extracts the "name" prop
  it("for ... of returns the names of the tables correctly", () => {
    const db = Database(Table(Song), Table(Playlist));

    expect(db.tableNamesWithForOf).toHaveLength(2);
    expect(db.tableNamesWithForOf).toContain("Song");
    expect(db.tableNamesWithForOf).toContain("Playlist");
  });

  // shockingly, forEach doesn't iterate at all and returns `undefined`!
  it("forEach returns the names of the tables correctly", () => {
    const db = Database(Table(Song), Table(Playlist));

    expect(db.tableNames).toHaveLength(2);
    expect(db.tableNames).toContain("Song");
    expect(db.tableNames).toContain("Playlist");
  });
});
