# NarrativeRules — Usage Guide

1. Import the `.pbiviz` and drop the visual onto a report page.
2. In the **Fields** well bind:
   - **Current Value** — required.
   - **Previous Value** and/or **Target Value** — enables comparison sentences.
   - Optional driver fields to add a "top positive driver / largest negative driver" line.
   - Optional Measure Label / Category to flavour the title and main sentence (e.g. `Revenue`).
   - Optional Custom Prefix / Suffix groupings for fixed lead-in or trailing phrases.
3. In the **Format** pane configure:
   - **Display** — title, toggles, compact mode, narrative tone (Executive / Analyst / Plain English / Short).
   - **Thresholds** — positive/negative percentage cut-offs and target tolerance.
   - **Formatting** — number format (auto, currency, percentage, decimal, whole), currency symbol, decimals.
   - **Colors** — full palette overrides for background, text, positive, negative, neutral, badge.

The narrative regenerates each time the underlying measures change (slicers, filters, drill).
