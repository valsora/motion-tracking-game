export default function areCoordsClose(
  value1: number,
  value2: number,
): boolean {
  return Math.abs(value1 - value2) <= 0.05
}
