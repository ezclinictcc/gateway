export function findMatchAttributes(
  notNullAttributes: any[],
  filter: any,
  entity: any
): boolean {
  let match: boolean = false;
  let attributeMatchQtt: number = 0;
  notNullAttributes.forEach((attributeKey: string) => {
    if (entity[attributeKey] === filter[attributeKey]) {
      attributeMatchQtt += 1;
    }
  });
  if (attributeMatchQtt === notNullAttributes.length) {
    match = true;
  }
  return match;
}

export function findNotNullAttributes(entityFilter: any): string[] {
  const notNullAttributes: string[] = [];
  Object.keys(entityFilter).forEach((key: string) => {
    if (entityFilter[key]) {
      notNullAttributes.push(key);
    }
  });
  return notNullAttributes;
}
