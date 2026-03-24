import { generatePixPayload } from './pix'

function runTests() {
  const payload = generatePixPayload({
    keyType: 'EMAIL',
    key: 'fulano@email.com',
    name: 'Fulano de Tal',
    city: 'Sao Paulo',
    value: 10.50,
    txid: 'PEDIDO123',
  })

  console.log('Payload gerado:')
  console.log(payload)
  console.log()

  const startOk = payload.startsWith('000201')
  const crcPart = payload.slice(-8)
  const endOk = crcPart.startsWith('6304') && /^[0-9A-F]{4}$/.test(crcPart.slice(4))

  console.log(`✓ Começa com "000201": ${startOk ? 'PASS' : 'FAIL'}`)
  console.log(`✓ Termina com "6304" + 4 chars hex: ${endOk ? 'PASS' : 'FAIL'}`)

  if (startOk && endOk) {
    console.log('\n✅ Todos os testes passaram!')
  } else {
    console.error('\n❌ Testes falharam!')
    process.exit(1)
  }
}

runTests()
