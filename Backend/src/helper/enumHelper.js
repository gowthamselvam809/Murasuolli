exports.has = (value, valueToFind) => (value & valueToFind) === valueToFind;

exports.hasAny = (value, valuesToFind) => valuesToFind.some(valueToFind => this.has(value, valueToFind));

exports.is = (value, valueToCompare) => value === valueToCompare;

exports.add = (value, valueToAdd) => value | valueToAdd;

exports.remove = (value, valueToRemove) => value & ~valueToRemove;