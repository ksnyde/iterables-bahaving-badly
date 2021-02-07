# Trouble with Iterables

In cases where I'd expect `forEach` and `for .. of` to behave identically ... somehow they do not!

1. Run tests to observe behavior ( `tests/Database-spec.ts` )
2. Main code reference found in `src/Database.ts` but basically is this:

    ```ts
    function Database(...tables: ITableDefinition<any>[]) {
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
    ```

## Supposition

- Using the spread operator we are getting an array of items. 
- These items are objects of type `ITableDefinition`
- both `for..of` and `array.forEach` should be able to iterate over the array

This strikes me as truely bizarre that _only_ `for..of` works!

## Test

From the terminal:

```sh
# install deps
yarn
# run tests
yarn test
```