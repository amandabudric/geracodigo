/**
 * Estado de engajamento por ferramenta + pathname para disparar `qualified_session` (uma vez por sessão).
 * Regras: scroll+tempo, fluxo tool_start+tool_complete, ou cta_click.
 */

import type { ToolName } from '@/lib/analytics-types'

type EngagementBucket = {
  maxScrollPct: number
  maxTimeSec: number
  ctaClicks: number
  hadToolStart: boolean
  hadToolComplete: boolean
}

const buckets = new Map<string, EngagementBucket>()

function bucketKey(tool: ToolName, pathname: string) {
  return `${tool}::${pathname}`
}

function getBucket(tool: ToolName, pathname: string): EngagementBucket {
  const k = bucketKey(tool, pathname)
  let b = buckets.get(k)
  if (!b) {
    b = {
      maxScrollPct: 0,
      maxTimeSec: 0,
      ctaClicks: 0,
      hadToolStart: false,
      hadToolComplete: false,
    }
    buckets.set(k, b)
  }
  return b
}

/** Apenas para testes */
export function resetEngagementForTests() {
  buckets.clear()
}

export function markToolStartState(tool: ToolName, pathname: string) {
  getBucket(tool, pathname).hadToolStart = true
}

export function markToolCompleteState(tool: ToolName, pathname: string) {
  getBucket(tool, pathname).hadToolComplete = true
}

export function updateScrollState(tool: ToolName, pathname: string, scrollDepthPct: number) {
  const b = getBucket(tool, pathname)
  b.maxScrollPct = Math.max(b.maxScrollPct, scrollDepthPct)
}

export function updateTimeState(tool: ToolName, pathname: string, seconds: number) {
  const b = getBucket(tool, pathname)
  b.maxTimeSec = Math.max(b.maxTimeSec, seconds)
}

export function incrementCtaClick(tool: ToolName, pathname: string) {
  getBucket(tool, pathname).ctaClicks += 1
}

export function shouldQualifyByEngagement(tool: ToolName, pathname: string): { ok: boolean; reason: string } {
  const b = getBucket(tool, pathname)
  if (b.ctaClicks >= 1) return { ok: true, reason: 'cta_click' }
  if (b.hadToolStart && b.hadToolComplete) return { ok: true, reason: 'tool_start_and_complete' }
  if (b.maxScrollPct >= 50 && b.maxTimeSec >= 60) return { ok: true, reason: 'scroll_and_time' }
  return { ok: false, reason: 'none' }
}
