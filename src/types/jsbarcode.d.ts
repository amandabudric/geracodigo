declare module 'jsbarcode' {
  interface JsBarcodeOptions {
    format?: string
    width?: number
    height?: number
    displayValue?: boolean
    text?: string
    fontOptions?: string
    font?: string
    textAlign?: 'left' | 'center' | 'right'
    textPosition?: 'bottom' | 'top'
    textMargin?: number
    fontSize?: number
    background?: string
    lineColor?: string
    margin?: number
    marginTop?: number
    marginBottom?: number
    marginLeft?: number
    marginRight?: number
    flat?: boolean
    valid?: (valid: boolean) => void
  }

  function JsBarcode(
    element: SVGSVGElement | HTMLCanvasElement | HTMLImageElement | string | null,
    value: string,
    options?: JsBarcodeOptions,
  ): void

  export = JsBarcode
}
