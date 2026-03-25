export function calculateEan13CheckDigit(digits12: string): string {
  if (digits12.length !== 12 || !/^\d{12}$/.test(digits12)) return ''
  let sum = 0
  for (let i = 0; i < 12; i++) {
    const d = parseInt(digits12[i], 10)
    sum += i % 2 === 0 ? d : d * 3
  }
  const check = (10 - (sum % 10)) % 10
  return check.toString()
}

export function calculateEan8CheckDigit(digits7: string): string {
  if (digits7.length !== 7 || !/^\d{7}$/.test(digits7)) return ''
  let sum = 0
  for (let i = 0; i < 7; i++) {
    const d = parseInt(digits7[i], 10)
    sum += i % 2 === 0 ? d * 3 : d
  }
  const check = (10 - (sum % 10)) % 10
  return check.toString()
}
