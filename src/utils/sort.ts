// orders strings like "07-tendermint-0" numerically
export function compareComponentWise(a: string, b: string): number {
  const arrayA = a.split("-");
  const arrayB = b.split("-");

  const length = Math.max(arrayA.length, arrayB.length);

  for (let i = 0; i < length; ++i) {
    const compA = arrayA[i];
    const compB = arrayB[i];
    if (compA === undefined) return -1;
    if (compB === undefined) return 1;

    if (compA.match(/^[0-9]+$/) && compB.match(/^[0-9]+$/)) {
      const valA = Number.parseInt(compA, 10);
      const valB = Number.parseInt(compB, 10);
      if (valA > valB) return 1;
      if (valA < valB) return -1;
    } else {
      // string compare
      const comp = compA.localeCompare(compB);
      if (comp !== 0) return comp;
    }
  }

  // all components compared and no difference found
  return 0;
}
