# NarrativeRules Insight Card

**Author:** [Syed Hussnain Tahir Sherazi](https://www.syedhussnain.com)
**License:** MIT
**Category:** Commentary / no-AI narrative / executive reporting

## Short description (≤100 chars, for AppSource listing)
Deterministic, rule-based executive commentary from DAX measures. No AI, no API calls, privacy-friendly.

## Long description
NarrativeRules Insight Card generates executive-style written commentary from DAX measures — **without AI, external services, or any data leaving Power BI**. You bind Current, Previous, Target, and (optionally) top/worst driver fields, and the visual produces deterministic sentences such as: _"Revenue increased by 12.4% versus the previous period and is currently above target. The largest positive driver was North Region, contributing £230k."_ Four tones (Executive, Analyst, Plain English, Short) flex the wording for different audiences.

## What it solves
Most generated-commentary tools rely on AI services that send data to a third party, cost per token, and produce different wording each run. Finance, FP&A, audit, and compliance teams need commentary that is reproducible, free of external calls, and predictable in tone. NarrativeRules is that — every phrase is rule-driven and documented.

## Why no-AI matters
- **Privacy** — nothing leaves the Power BI sandbox; no third-party endpoint sees your figures.
- **Determinism** — the same numbers always produce the same sentences. Reproducible for audit and finance.
- **Cost** — no per-token charges and no rate limits.
- **Offline** — works in air-gapped tenants and Power BI Report Server.

## Who it's for
- Finance teams producing month-end commentary packs.
- FP&A and ops analysts who need a consistent commentary tile across reports.
- Public sector / regulated industries that cannot send data to third-party AI services.

## Key features
- Four tones: Executive, Analyst, Plain English, Short.
- Auto-derived variance and variance %; auto-target comparison with configurable tolerance.
- Optional Top / Worst driver sentences when name + value supplied.
- Custom Prefix / Suffix groupings for fixed lead-ins or trailing disclaimers.
- KPI summary row (Current / Variance / Variance % / Target).
- Status badge (Above target / On track / Below target / Improving / Declining).
- Configurable thresholds, number format (auto/currency/percentage/decimal/whole), currency symbol, decimals, full palette, compact mode.

## Privacy & security
Zero network calls. No third-party JS. `privileges` array is empty. Read-only.

## Author
**Syed Hussnain Tahir Sherazi** — Power BI / Microsoft Fabric developer building the NarrativeRules Insight Card and other Power BI custom visuals.

- Website: [www.syedhussnain.com](https://www.syedhussnain.com)
- Email: [Contact@syedhussnain.com](mailto:Contact@syedhussnain.com)
- LinkedIn: [linkedin.com/in/hussnainsherazi](https://www.linkedin.com/in/hussnainsherazi)
- GitHub: [github.com/hussnaintahir13](https://github.com/hussnaintahir13)
