# NarrativeRules Insight Card

A Power BI custom visual that generates executive-style commentary from DAX measures — **without AI, external services, or any data leaving Power BI**. Deterministic, rule-based, privacy-friendly.

## Why no-AI commentary matters

- **Privacy** — nothing leaves the Power BI sandbox; no third-party endpoint touches your figures.
- **Determinism** — the same numbers always produce the same sentences. Reproducible for audit and finance.
- **Cost** — no per-token charges and no rate limits.
- **Offline** — works in air-gapped tenants and Power BI Report Server.

## Privacy-friendly

This visual makes **zero network calls**. The `privileges` array in `capabilities.json` is empty, and no external scripts are referenced.

## Screenshots

> _Placeholder — drop screenshots into `assets/screenshots/` before publishing._

## Data fields

| Role | Kind | Notes |
| --- | --- | --- |
| Current Value | Measure | Required for narrative. |
| Previous Value | Measure | Enables PoP commentary. |
| Target Value | Measure | Enables target commentary. |
| Variance Value | Measure (optional) | If omitted, derived. |
| Variance Percent | Measure (optional) | If omitted, derived. |
| Top Driver Name | Grouping (optional) | |
| Top Driver Value | Measure (optional) | |
| Worst Driver Name | Grouping (optional) | |
| Worst Driver Value | Measure (optional) | |
| Measure Label | Grouping (optional) | Used in sentences. |
| Category | Grouping (optional) | Used in title. |
| Custom Prefix | Grouping (optional) | Prepends a sentence. |
| Custom Suffix | Grouping (optional) | Appends a sentence. |

## Example DAX

```DAX
Current Revenue   = SUM('Sales'[Revenue])
Previous Revenue  = CALCULATE([Current Revenue], DATEADD('Date'[Date], -1, MONTH))
Revenue Variance  = [Current Revenue] - [Previous Revenue]
Revenue Variance %= DIVIDE([Revenue Variance], [Previous Revenue]) * 100
Target Variance   = [Current Revenue] - [Target Revenue]
```

## Example generated narratives

- **Executive**: _Revenue increased by 12.4% versus the previous period and is currently above target. The largest positive driver was North Region, contributing £230k. The largest negative driver was Product B, reducing performance by £48k._
- **Analyst**: _Revenue is up 12.4% compared with the previous period and is currently above target. Largest positive driver: North Region contributing £230k._
- **Plain English**: _Revenue went up by 12.4%. The biggest positive contribution came from North Region at £230k._
- **Short**: _Revenue up 12.4%. Top driver: North Region (£230k)._

## Development setup

```bash
npm install
npm install -g powerbi-visuals-tools
pbiviz --create-cert
pbiviz start
pbiviz package
```

## Usage instructions

See [docs/USAGE.md](docs/USAGE.md). All sentence rules are documented in [docs/NARRATIVE_RULES.md](docs/NARRATIVE_RULES.md).

## Test plan

- Current and previous only.
- Current, previous, and target.
- Positive variance.
- Negative variance.
- Stable variance (within thresholds).
- Above target.
- Below target.
- Missing previous value.
- Zero previous value (no divide-by-zero crash).
- Driver fields supplied.
- Compact mode.
- Currency, percentage, decimal, whole-number formats.
- Resize visual to small mobile tile.

## AppSource publishing

See [docs/APP_SOURCE_CHECKLIST.md](docs/APP_SOURCE_CHECKLIST.md).

## Roadmap

- Configurable phrase dictionary (per-language vocab).
- Multi-locale formatting.
- Sentence templates per tone exposed via the Format pane.
- Additional badges (Improving / Declining stronger than On Track).

## Contributing

Fork, branch, PR. By contributing you license your work under MIT.

## License

MIT — see [LICENSE](LICENSE).
