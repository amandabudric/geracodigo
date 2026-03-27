export function triggerDownload(url: string, filename: string): void {
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.style.display = 'none'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

export function downloadDataUrl(dataUrl: string, filename: string): void {
  triggerDownload(dataUrl, filename)
}

export function downloadBlob(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob)
  triggerDownload(url, filename)
  setTimeout(() => URL.revokeObjectURL(url), 100)
}

export function downloadSvgFromElement(
  svgElement: SVGSVGElement,
  filename: string,
): void {
  const svgStr = new XMLSerializer().serializeToString(svgElement)
  const blob = new Blob([svgStr], { type: 'image/svg+xml' })
  const url = URL.createObjectURL(blob)
  triggerDownload(url, filename)
  setTimeout(() => URL.revokeObjectURL(url), 100)
}

export async function svgToDataUrl(
  svg: SVGSVGElement,
  bgColor = '#ffffff',
  width = 800,
  height = 300,
): Promise<string | null> {
  const svgStr = new XMLSerializer().serializeToString(svg)
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  if (!ctx) return null

  const loaded = await new Promise<boolean>((resolve) => {
    const img = new Image()
    const blob = new Blob([svgStr], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    img.onload = () => {
      ctx.fillStyle = bgColor
      ctx.fillRect(0, 0, width, height)
      ctx.drawImage(img, 0, 0, width, height)
      URL.revokeObjectURL(url)
      resolve(true)
    }
    img.onerror = () => { URL.revokeObjectURL(url); resolve(false) }
    img.src = url
  })

  return loaded ? canvas.toDataURL('image/png') : null
}

export async function exportSvgsToPdf(
  svgs: SVGSVGElement[],
  filename: string,
  bgColor = '#ffffff',
): Promise<void> {
  const { jsPDF } = await import('jspdf')
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })

  let y = 15
  const pageW = 210
  const maxW = 120
  const margins = 30

  for (const svg of svgs) {
    const svgW = svg.width.baseVal.value
      || parseFloat(svg.getAttribute('width') ?? '0')
      || 300
    const svgH = svg.height.baseVal.value
      || parseFloat(svg.getAttribute('height') ?? '0')
      || 150
    const aspect = svgH / svgW

    const barcodeW = Math.min(maxW, pageW - margins)
    const barcodeH = barcodeW * aspect

    if (y + barcodeH + 10 > 280) {
      doc.addPage()
      y = 15
    }

    const renderScale = Math.max(1, Math.ceil(800 / svgW))
    const dataUrl = await svgToDataUrl(svg, bgColor, svgW * renderScale, svgH * renderScale)
    if (!dataUrl) continue

    const x = (pageW - barcodeW) / 2
    doc.addImage(dataUrl, 'PNG', x, y, barcodeW, barcodeH)
    y += barcodeH + 8
  }

  doc.save(filename)
}

export function downloadPngFromElement(
  svgElement: SVGSVGElement,
  filename: string,
  scale = 2,
  bgColor = '#ffffff',
): Promise<void> {
  return new Promise((resolve, reject) => {
    let svgW: number
    let svgH: number
    try {
      const bbox = svgElement.getBBox()
      svgW = svgElement.width.baseVal.value || bbox.width + bbox.x * 2
      svgH = svgElement.height.baseVal.value || bbox.height + bbox.y * 2
    } catch {
      svgW = svgElement.width.baseVal.value
        || parseFloat(svgElement.getAttribute('width') ?? '0')
        || 300
      svgH = svgElement.height.baseVal.value
        || parseFloat(svgElement.getAttribute('height') ?? '0')
        || 150
    }
    if (svgW <= 0) svgW = 300
    if (svgH <= 0) svgH = 150
    const width = Math.round(svgW * scale)
    const height = Math.round(svgH * scale)

    const svgStr = new XMLSerializer().serializeToString(svgElement)
    const canvas = document.createElement('canvas')
    canvas.width = width
    canvas.height = height
    const ctx = canvas.getContext('2d')
    if (!ctx) {
      reject(new Error('Não foi possível criar o contexto do canvas'))
      return
    }
    const img = new Image()
    const url = URL.createObjectURL(
      new Blob([svgStr], { type: 'image/svg+xml' }),
    )
    img.onload = () => {
      ctx.fillStyle = bgColor
      ctx.fillRect(0, 0, width, height)
      ctx.drawImage(img, 0, 0, width, height)
      URL.revokeObjectURL(url)
      triggerDownload(canvas.toDataURL('image/png'), filename)
      resolve()
    }
    img.onerror = () => {
      URL.revokeObjectURL(url)
      reject(new Error('Falha ao converter SVG para PNG'))
    }
    img.src = url
  })
}
