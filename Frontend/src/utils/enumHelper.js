const add = (value, valueToAdd) => value | valueToAdd;

const has = (value, valueToFind) => (value & valueToFind) === valueToFind;

const hasAny = (value, valuesToFind) => valuesToFind.some(valueToFind => has(value, valueToFind));

const is = (value, valueToCompare) => value === valueToCompare;

const remove = (value, valueToRemove) => value & ~valueToRemove;

export { add, has, hasAny, is, remove }