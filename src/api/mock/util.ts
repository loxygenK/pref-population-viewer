export function delay(milliseocnds: number): Promise<void> {
  return new Promise((res) => setTimeout(res, milliseocnds));
}
