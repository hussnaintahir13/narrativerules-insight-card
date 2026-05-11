# Narrative Rules

This visual is **deterministic** — the same inputs always produce the same sentences. The rules below document every phrase decision.

## Inputs derived

```
variance       = varianceValue  ?? (currentValue - previousValue)
variancePct    = variancePercent ?? (variance / |previousValue| * 100)
targetVariance = currentValue - targetValue
targetPct      = targetVariance / |targetValue| * 100
```

If `previousValue` is `0` or missing and `variance%` isn't supplied directly, the period-over-period sentence is suppressed.

## Trend verbs

| Tone | Increased | Decreased | Flat |
| --- | --- | --- | --- |
| Executive | increased | declined | remained broadly stable |
| Analyst | is up | is down | is broadly flat |
| Plain English | went up | went down | stayed about the same |
| Short | up | down | flat |

The choice is:

```
variancePct >  positiveThreshold → increased
variancePct <  negativeThreshold → decreased
otherwise                         → flat
```

## Target phrases

```
|currentValue - targetValue| / |targetValue| * 100 ≤ targetTolerance → "broadly on target"
currentValue > targetValue                                            → "above target"
otherwise                                                             → "below target"
```

If `targetValue` is missing, the target clause is omitted.

## Driver sentences

Drivers only appear when both the name (grouping) and value (measure) are supplied.

- **Top driver**:
  - Executive: _The largest positive driver was {name}, contributing {value}._
  - Analyst: _Largest positive driver: {name} contributing {value}._
  - Plain: _The biggest positive contribution came from {name} at {value}._
  - Short: _Top driver: {name} ({value})._
- **Worst driver**: same templates, swapping "positive" → "negative" and "contributing" → "reducing performance by".

## Status badge

| Condition | Badge |
| --- | --- |
| Above target | Above target |
| Within tolerance | On track |
| Below target | Below target |
| No target supplied & trend up | Improving |
| No target supplied & trend down | Declining |
| No target supplied & flat | On track |

## Custom prefix / suffix

When supplied, the custom prefix is prepended and custom suffix is appended verbatim. Use this for fixed lead-ins like _"Weekly trading update:"_ or trailing disclaimers.

## Example: Executive tone, full inputs

```
currentValue   = 1_240_000
previousValue  = 1_103_000
targetValue    = 1_190_000
topDriverName  = "North Region", topDriverValue = 230_000
worstDriverName = "Product B", worstDriverValue = 48_000

→ "Revenue increased by 12.4% versus the previous period and is currently above target.
   The largest positive driver was North Region, contributing £230k.
   The largest negative driver was Product B, reducing performance by £48k."
```
