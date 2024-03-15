export function divideArray(arr: any[], n: number) {
  var divideLength = Math.max(arr.length / n, 1);
  var divides = [];
  for (var i = 0; i < n; i++) {
    if (divideLength * (i + 1) <= arr.length)
      divides.push(arr.slice(divideLength * i, divideLength * (i + 1)));
  }
  return divides;
}
