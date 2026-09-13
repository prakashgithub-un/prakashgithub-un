// A gentle S-curve between two points instead of a sharp straight line —
// used for every diagram connector so flows read as smooth pipes rather
// than rigid wireframe segments.
export function smoothPath(x1: number, y1: number, x2: number, y2: number) {
  const my = (y1 + y2) / 2;
  return `M ${x1} ${y1} C ${x1} ${my}, ${x2} ${my}, ${x2} ${y2}`;
}
