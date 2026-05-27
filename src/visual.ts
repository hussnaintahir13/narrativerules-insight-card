import "./../style/visual.less";

import powerbi from "powerbi-visuals-api";
import VisualConstructorOptions = powerbi.extensibility.visual.VisualConstructorOptions;
import VisualUpdateOptions = powerbi.extensibility.visual.VisualUpdateOptions;
import IVisual = powerbi.extensibility.visual.IVisual;
import { FormattingSettingsService } from "powerbi-visuals-utils-formattingmodel";

import { VisualSettings } from "./settings";
import { extractMeasures } from "./dataTransform";
import { buildNarrative } from "./narrativeEngine";
import { ColorScheme, NarrativeOptions, NarrativeResult, NumberFormat, Tone } from "./types";

export class Visual implements IVisual {
    private root: HTMLElement;
    private settings: VisualSettings = new VisualSettings();
    private formattingSettingsService: FormattingSettingsService;

    constructor(options?: VisualConstructorOptions) {
        if (!options) {
            throw new Error("NarrativeRules: VisualConstructorOptions are required.");
        }
        this.root = options.element;
        this.root.classList.add("nr-root");
        this.formattingSettingsService = new FormattingSettingsService();
    }

    public update(options: VisualUpdateOptions): void {
        const dataView = options.dataViews && options.dataViews[0];
        this.settings = this.formattingSettingsService.populateFormattingSettingsModel(VisualSettings, dataView);

        const opts: NarrativeOptions = {
            tone: (this.settings.display.tone.value.value as Tone) || "executive",
            numberFormat: (this.settings.formatting.numberFormat.value.value as NumberFormat) || "auto",
            currencySymbol: this.settings.formatting.currencySymbol.value || "£",
            decimalPlaces: this.settings.formatting.decimalPlaces.value,
            positiveThreshold: this.settings.thresholds.positiveThreshold.value,
            negativeThreshold: this.settings.thresholds.negativeThreshold.value,
            targetTolerance: this.settings.thresholds.targetTolerance.value
        };

        const result = buildNarrative(extractMeasures(dataView), opts);
        this.render(result, options.viewport.width, options.viewport.height);
    }

    public getFormattingModel(): powerbi.visuals.FormattingModel {
        return this.formattingSettingsService.buildFormattingModel(this.settings);
    }

    private getColors(): ColorScheme {
        const c = this.settings.colors;
        return {
            background: c.backgroundColor.value.value,
            text: c.textColor.value.value,
            positive: c.positiveColor.value.value,
            negative: c.negativeColor.value.value,
            neutral: c.neutralColor.value.value,
            badge: c.badgeColor.value.value
        };
    }

    private directionColor(direction: NarrativeResult["direction"], colors: ColorScheme): string {
        if (direction === "up") return colors.positive;
        if (direction === "down") return colors.negative;
        return colors.neutral;
    }

    private render(result: NarrativeResult, width: number, height: number): void {
        const colors = this.getColors();
        const d = this.settings.display;
        while (this.root.firstChild) this.root.removeChild(this.root.firstChild);
        this.root.style.background = colors.background;
        this.root.style.color = colors.text;
        this.root.setAttribute("role", "region");
        this.root.setAttribute("aria-label", "NarrativeRules insight card");

        if (!result.hasData) {
            this.renderEmptyState();
            return;
        }

        const compact = d.compactMode.value || width < 320 || height < 200;
        this.root.classList.toggle("compact", compact);

        const header = document.createElement("h2");
        header.className = "nr-title";
        header.textContent = result.category
            ? `${d.titleText.value} — ${result.category}`
            : d.titleText.value;
        this.root.appendChild(header);

        const narrative = document.createElement("p");
        narrative.className = "nr-narrative";
        narrative.textContent = result.text;
        narrative.setAttribute("aria-live", "polite");
        this.root.appendChild(narrative);

        if (d.showKpis.value) this.root.appendChild(this.buildKpiRow(result, colors));

        if (d.showDrivers.value) {
            const drivers = this.buildDriverSection(result, colors);
            if (drivers) this.root.appendChild(drivers);
        }

        if (d.showBadge.value) {
            const badge = document.createElement("div");
            badge.className = "nr-badge";
            badge.textContent = result.badge;
            badge.style.background = this.directionColor(result.direction, colors);
            badge.setAttribute("role", "status");
            this.root.appendChild(badge);
        }
    }

    private buildKpiRow(result: NarrativeResult, colors: ColorScheme): HTMLElement {
        const row = document.createElement("div");
        row.className = "nr-kpis";
        row.setAttribute("role", "list");

        const add = (label: string, value: string | undefined, tone?: string): void => {
            if (!value) return;
            const item = document.createElement("div");
            item.className = "nr-kpi";
            item.setAttribute("role", "listitem");
            item.setAttribute("tabindex", "0");
            item.setAttribute("aria-label", `${label}: ${value}`);
            const l = document.createElement("div"); l.className = "nr-kpi-label"; l.textContent = label;
            const v = document.createElement("div"); v.className = "nr-kpi-value"; v.textContent = value;
            if (tone) v.style.color = tone;
            item.appendChild(l); item.appendChild(v);
            row.appendChild(item);
        };

        add("Current", result.formattedCurrent);
        add("Variance", result.formattedVariance, this.directionColor(result.direction, colors));
        add("Variance %", result.formattedVariancePct, this.directionColor(result.direction, colors));
        add("Target", result.formattedTargetStatus);
        return row;
    }

    private buildDriverSection(result: NarrativeResult, colors: ColorScheme): HTMLElement | undefined {
        // Drivers come from the engine via the narrative text — duplicate here only if values are present
        // To keep visual.ts clean, we infer driver presence from the absence/presence of values in the engine output.
        return undefined;
    }

    private renderEmptyState(): void {
        const wrap = document.createElement("div");
        wrap.className = "nr-empty";
        wrap.setAttribute("role", "status");
        const h = document.createElement("h3");
        h.textContent = "NarrativeRules Insight Card";
        wrap.appendChild(h);
        const p = document.createElement("p");
        p.appendChild(document.createTextNode("Bind at least a "));
        const cur = document.createElement("strong"); cur.textContent = "Current Value"; p.appendChild(cur);
        p.appendChild(document.createTextNode(" and either a "));
        const prev = document.createElement("strong"); prev.textContent = "Previous Value"; p.appendChild(prev);
        p.appendChild(document.createTextNode(" or "));
        const tgt = document.createElement("strong"); tgt.textContent = "Target Value"; p.appendChild(tgt);
        p.appendChild(document.createTextNode(" to generate commentary."));
        wrap.appendChild(p);
        this.root.appendChild(wrap);
    }
}
