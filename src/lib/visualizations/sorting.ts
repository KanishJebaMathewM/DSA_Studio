import type { ParseResult, SortingInput, SortingStep } from "./types";

export const DEFAULT_SORTING_INPUT: SortingInput = {
  values: [42, 17, 68, 5, 33, 91, 24],
};

export function parseSortingInput(raw: string): ParseResult<SortingInput> {
  const tokens = raw
    .split(/[,\s]+/)
    .map((token) => token.trim())
    .filter(Boolean);

  if (tokens.length < 2) {
    return { ok: false, error: "Enter at least two numbers separated by commas." };
  }
  if (tokens.length > 20) {
    return { ok: false, error: "Keep the array to 20 numbers or fewer." };
  }

  const values: number[] = [];
  for (const token of tokens) {
    const value = Number(token);
    if (!Number.isFinite(value) || !Number.isInteger(value)) {
      return { ok: false, error: `"${token}" is not a whole number.` };
    }
    if (Math.abs(value) > 999) {
      return { ok: false, error: "Use numbers between -999 and 999." };
    }
    values.push(value);
  }

  return { ok: true, input: { values } };
}

export function formatSortingInput(input: SortingInput): string {
  return input.values.join(", ");
}

export function generateBubbleSortSteps(input: SortingInput): SortingStep[] {
  const array = [...input.values];
  const sorted = new Set<number>();
  const steps: SortingStep[] = [
    {
      array: [...array],
      comparing: null,
      swapped: false,
      sortedIndices: [],
      message: "Start bubble sort. Compare adjacent values from left to right.",
    },
  ];

  for (let pass = 0; pass < array.length - 1; pass++) {
    let swappedThisPass = false;
    for (let i = 0; i < array.length - 1 - pass; i++) {
      const left = array[i];
      const right = array[i + 1];
      if (left > right) {
        array[i] = right;
        array[i + 1] = left;
        swappedThisPass = true;
        steps.push({
          array: [...array],
          comparing: [i, i + 1],
          swapped: true,
          sortedIndices: [...sorted],
          message: `${left} > ${right}, swap positions ${i} and ${i + 1}.`,
        });
      } else {
        steps.push({
          array: [...array],
          comparing: [i, i + 1],
          swapped: false,
          sortedIndices: [...sorted],
          message: `${left} ≤ ${right}, keep the order.`,
        });
      }
    }

    sorted.add(array.length - 1 - pass);
    steps.push({
      array: [...array],
      comparing: null,
      swapped: false,
      sortedIndices: [...sorted],
      message: `Position ${array.length - 1 - pass} is now sorted.`,
    });

    if (!swappedThisPass) {
      for (let i = 0; i < array.length; i++) sorted.add(i);
      break;
    }
  }

  for (let i = 0; i < array.length; i++) sorted.add(i);
  steps.push({
    array: [...array],
    comparing: null,
    swapped: false,
    sortedIndices: [...sorted],
    message: "Array sorted.",
  });

  return steps;
}

export function generateSelectionSortSteps(input: SortingInput): SortingStep[] {
  const array = [...input.values];
  const sorted = new Set<number>();
  const steps: SortingStep[] = [
    {
      array: [...array],
      comparing: null,
      swapped: false,
      sortedIndices: [],
      message: "Start selection sort. Find the smallest value in the unsorted part.",
    },
  ];

  for (let i = 0; i < array.length - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < array.length; j++) {
      steps.push({
        array: [...array],
        comparing: [minIndex, j],
        swapped: false,
        sortedIndices: [...sorted],
        message: `Compare current minimum ${array[minIndex]} with ${array[j]}.`,
      });
      if (array[j] < array[minIndex]) minIndex = j;
    }

    if (minIndex !== i) {
      const temp = array[i];
      array[i] = array[minIndex];
      array[minIndex] = temp;
      steps.push({
        array: [...array],
        comparing: [i, minIndex],
        swapped: true,
        sortedIndices: [...sorted],
        message: `Swap ${array[minIndex]} and ${array[i]} to place the minimum at position ${i}.`,
      });
    } else {
      steps.push({
        array: [...array],
        comparing: null,
        swapped: false,
        sortedIndices: [...sorted],
        message: `${array[i]} is already the minimum for position ${i}.`,
      });
    }

    sorted.add(i);
  }

  for (let i = 0; i < array.length; i++) sorted.add(i);
  steps.push({
    array: [...array],
    comparing: null,
    swapped: false,
    sortedIndices: [...sorted],
    message: "Array sorted.",
  });

  return steps;
}
