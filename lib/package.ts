export type PackageItem = { name: string; detail: string; qty: string; unit: number; total: number }

export const PACKAGE_ITEMS: PackageItem[] = [
  { name: 'Wooden bed frame', detail: '4ft x 6ft', qty: '1', unit: 9000, total: 9000 },
  { name: 'Mattress', detail: '4ft x 6ft, 8-inch', qty: '1', unit: 7999, total: 7999 },
  { name: 'Pillows', detail: '', qty: '1 pair', unit: 800, total: 800 },
  { name: 'Bedsheet set', detail: '3 bedsheets, 2 pillowcases and 1 duvet cover', qty: '1 set', unit: 2500, total: 2500 },
  { name: 'Duvet', detail: '', qty: '1', unit: 900, total: 900 },
  { name: 'Mosquito net', detail: '', qty: '1', unit: 800, total: 800 },
]

export const PACKAGE_TOTAL = PACKAGE_ITEMS.reduce((sum, x) => sum + x.total, 0)
