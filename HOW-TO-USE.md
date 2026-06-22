# NarrativeRules Insight Card — Simple Guide

## What this visual does

This visual turns your numbers into a short, written sentence. It reads your measures and writes plain-English commentary about them, like "Revenue went up by 12.4% versus last period and is above target." It does this on its own, using simple rules. There is no AI, and none of your data leaves Power BI.

## What data you need

Drag fields into these wells. Only the first one is required. The rest are optional and add more detail to the sentence.

- **Current Value** — the main number you want to talk about. *Required.*
- **Previous Value** — the same number from the last period. Lets the visual compare. *Optional.*
- **Target Value** — your goal or budget number. Lets the visual say if you beat the target. *Optional.*
- **Variance Value** — the difference between current and previous. The visual works this out for you if you leave it blank. *Optional.*
- **Variance Percent** — that difference as a percent. The visual works this out for you if you leave it blank. *Optional.*
- **Top Driver Name** — the name of the thing that helped the most (e.g. "North Region"). *Optional.*
- **Top Driver Value** — how much that top thing added. *Optional.*
- **Worst Driver Name** — the name of the thing that hurt the most (e.g. "Product B"). *Optional.*
- **Worst Driver Value** — how much that worst thing took away. *Optional.*
- **Measure Label** — a friendly name for your number (e.g. "Revenue"), used inside the sentence. *Optional.*
- **Category** — a label shown in the title (e.g. a region or product name). *Optional.*
- **Custom Prefix** — your own words added to the start of the sentence. *Optional.*
- **Custom Suffix** — your own words added to the end (e.g. a note or disclaimer). *Optional.*

## How to add it to your report (step by step)

1. Open Power BI Desktop and open or create a report.
2. In the **Visualizations** pane, click the **•••** (more options) button.
3. Choose **Import a visual from a file**.
4. If a warning about custom visuals appears, click **Import**.
5. Pick the file **dist\narrativeRulesInsightCardF7BCE16A2D08423FAB73C1FAE5D041A6.1.0.0.0.pbiviz** and open it.
6. Click the new icon in the Visualizations pane to add the visual to the page.
7. Select the visual, then drag your fields into the wells listed above.

## Buttons & options you can change

You change these in the **Format** pane (the paint-roller icon) after you select the visual. They are grouped into cards.

**Display card**
- **Visual title** — type your own heading for the card.
- **Narrative tone** — pick the writing style of the sentence:
  - *Executive* — polished, full sentences for leaders.
  - *Analyst* — a bit more detail and numbers.
  - *Plain English* — simple, everyday wording.
  - *Short* — the briefest version.
- **Show KPI summary row** — turn the row of key numbers (Current, Variance, Variance %, Target) on or off.
- **Show driver section** — turn the "top driver / worst driver" sentence on or off.
- **Show status badge** — turn the little label (like "Above target" or "Improving") on or off.
- **Compact mode** — shrink the layout to fit a small tile.

**Thresholds card**
- **Positive ≥ (%)** — how big a rise must be to count as "up".
- **Negative ≤ (%)** — how big a drop must be to count as "down".
- **Target tolerance (%)** — how close to target still counts as "on track".

**Formatting card**
- **Number format** — choose Auto, Currency, Percentage, Decimal, or Whole number.
- **Currency symbol** — set the money sign, like £ or $.
- **Decimal places** — how many digits after the dot.

**Colors card**
- Set the **Background**, **Text**, **Positive**, **Negative**, **Neutral**, and **Badge** colors.

## If it looks empty or wrong

- **Nothing shows up?** Make sure you put a field in the **Current Value** well. Nothing works without it.
- **No comparison sentence?** Add a **Previous Value** or **Target Value** so the visual has something to compare against.
- **No driver sentence?** A driver needs both its name and its value. Fill in both the name well and the value well, and check **Show driver section** is on.
- **Numbers look odd (wrong sign or too many digits)?** Check the **Formatting** card for the number format, currency symbol, and decimal places.
