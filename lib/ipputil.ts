type Unpacked<T> = T extends (infer U)[] ? U : T;
type Xref<T extends Array<string | null>> = Record<Unpacked<T>, number>

//  To serialize and deserialize, we need to be able to look
//  things up by key or by value. This little helper just
//  converts the arrays to objects and tacks on a 'lookup' property.
const xref = <T extends Record<string, number>>(arr: T, offset = 0): Xref<T> & { lookup: T } => {
  const map: Map<Extract<T, string>, number> = arr.reduce((
    acc: Map<Extract<T, string>, number>,
    item,
    index: number
  ) => {

    if (!item) return acc;

    acc.set(item, index + offset)

    return acc;
  }, new Map());

  const obj = Object.fromEntries(map)

  return {
    ...obj,
    lookup: arr
  };
};

const lookup = <T extends Record<string, number>>(arr: T, offset = 0): T & { lookup: Array } => {
  const map: Map<Extract<T, string>, number> = arr.reduce((
    acc: Map<Extract<T, string>, number>,
    item,
    index: number
  ) => {

    if (!item) return acc;

    acc.set(item, index + offset)

    return acc;
  }, new Map());

  const obj = Object.fromEntries(map)

  return {
    ...obj,
    lookup: arr
  };
};

const extend = (destination: any, source: any) => {
  for (const property in source) {
    if (source[property] && source[property].constructor === Object) {
      destination[property] = destination[property] || {};
      extend(destination[property], source[property]);
    } else {
      destination[property] = source[property];
    }
  }

  return destination;
};

export { extend, xref };
