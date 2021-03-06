import { Array1DTracer, ChartTracer, LogTracer, Randomize } from 'algorithm-visualizer';

const chart = new ChartTracer();
const tracer = new Array1DTracer().chart(chart);
const logger = new LogTracer();
const D = new Randomize.Array1D(10).create();
tracer.set(D).delay();

logger.print(`Original array = [${D.join(', ')}]`);

function heapSort(array, size) {
  let i;
  let j;
  let temp;

  for (i = Math.ceil(size / 2) - 1; i >= 0; i--) {
    heapify(array, size, i);
  }

  for (j = size - 1; j >= 0; j--) {
    temp = array[0];
    array[0] = array[j];
    array[j] = temp;

    tracer.patch(0, array[0]).patch(j, array[j]);
    logger.print(`Swapping elements : ${array[0]} & ${array[j]}`).delay();
    tracer.depatch(0).depatch(j);
    tracer.select(j).delay();

    heapify(array, j, 0);

    tracer.deselect(j);
  }
}

function heapify(array, size, root) {
  let largest = root;
  const left = 2 * root + 1;
  const right = 2 * root + 2;
  let temp;

  if (left < size && array[left] > array[largest]) {
    largest = left;
  }

  if (right < size && array[right] > array[largest]) {
    largest = right;
  }

  if (largest !== root) {
    temp = array[root];
    array[root] = array[largest];
    array[largest] = temp;

    tracer.patch(root, array[root]).patch(largest, array[largest]);
    logger.print(`Swapping elements : ${array[root]} & ${array[largest]}`).delay();
    tracer.depatch(root).depatch(largest);

    heapify(array, size, largest);
  }
}

heapSort(D, D.length);

logger.print(`Final array = [${D.join(', ')}]`);
