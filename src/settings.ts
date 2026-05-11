import { formattingSettings } from "powerbi-visuals-utils-formattingmodel";

import FormattingSettingsCard = formattingSettings.SimpleCard;
import FormattingSettingsModel = formattingSettings.Model;
import FormattingSettingsSlice = formattingSettings.Slice;

class DisplayCard extends FormattingSettingsCard {
    name = "display";
    displayName = "Display";

    titleText = new formattingSettings.TextInput({ name: "titleText", displayName: "Visual title", value: "NarrativeRules Insight Card", placeholder: "NarrativeRules Insight Card" });
    showKpis = new formattingSettings.ToggleSwitch({ name: "showKpis", displayName: "Show KPI summary row", value: true });
    showDrivers = new formattingSettings.ToggleSwitch({ name: "showDrivers", displayName: "Show driver section", value: true });
    showBadge = new formattingSettings.ToggleSwitch({ name: "showBadge", displayName: "Show status badge", value: true });
    compactMode = new formattingSettings.ToggleSwitch({ name: "compactMode", displayName: "Compact mode", value: false });
    tone = new formattingSettings.ItemDropdown({
        name: "tone",
        displayName: "Narrative tone",
        items: [
            { value: "executive", displayName: "Executive" },
            { value: "analyst", displayName: "Analyst" },
            { value: "plain", displayName: "Plain English" },
            { value: "short", displayName: "Short" }
        ],
        value: { value: "executive", displayName: "Executive" }
    });

    slices: FormattingSettingsSlice[] = [
        this.titleText, this.showKpis, this.showDrivers, this.showBadge, this.compactMode, this.tone
    ];
}

class ThresholdsCard extends FormattingSettingsCard {
    name = "thresholds";
    displayName = "Thresholds";
    positiveThreshold = new formattingSettings.NumUpDown({ name: "positiveThreshold", displayName: "Positive ≥ (%)", value: 1 });
    negativeThreshold = new formattingSettings.NumUpDown({ name: "negativeThreshold", displayName: "Negative ≤ (%)", value: -1 });
    targetTolerance = new formattingSettings.NumUpDown({ name: "targetTolerance", displayName: "Target tolerance (%)", value: 2 });
    slices: FormattingSettingsSlice[] = [this.positiveThreshold, this.negativeThreshold, this.targetTolerance];
}

class FormattingCard extends FormattingSettingsCard {
    name = "formatting";
    displayName = "Formatting";
    numberFormat = new formattingSettings.ItemDropdown({
        name: "numberFormat", displayName: "Number format",
        items: [
            { value: "auto", displayName: "Auto" },
            { value: "currency", displayName: "Currency" },
            { value: "percentage", displayName: "Percentage" },
            { value: "decimal", displayName: "Decimal" },
            { value: "whole", displayName: "Whole number" }
        ],
        value: { value: "auto", displayName: "Auto" }
    });
    currencySymbol = new formattingSettings.TextInput({ name: "currencySymbol", displayName: "Currency symbol", value: "£", placeholder: "£" });
    decimalPlaces = new formattingSettings.NumUpDown({ name: "decimalPlaces", displayName: "Decimal places", value: 1 });
    slices: FormattingSettingsSlice[] = [this.numberFormat, this.currencySymbol, this.decimalPlaces];
}

class ColorsCard extends FormattingSettingsCard {
    name = "colors";
    displayName = "Colors";
    backgroundColor = new formattingSettings.ColorPicker({ name: "backgroundColor", displayName: "Background", value: { value: "#FFFFFF" } });
    textColor = new formattingSettings.ColorPicker({ name: "textColor", displayName: "Text", value: { value: "#252423" } });
    positiveColor = new formattingSettings.ColorPicker({ name: "positiveColor", displayName: "Positive", value: { value: "#107C10" } });
    negativeColor = new formattingSettings.ColorPicker({ name: "negativeColor", displayName: "Negative", value: { value: "#A4262C" } });
    neutralColor = new formattingSettings.ColorPicker({ name: "neutralColor", displayName: "Neutral", value: { value: "#605E5C" } });
    badgeColor = new formattingSettings.ColorPicker({ name: "badgeColor", displayName: "Badge", value: { value: "#0078D4" } });
    slices: FormattingSettingsSlice[] = [
        this.backgroundColor, this.textColor, this.positiveColor, this.negativeColor, this.neutralColor, this.badgeColor
    ];
}

export class VisualSettings extends FormattingSettingsModel {
    display = new DisplayCard();
    thresholds = new ThresholdsCard();
    formatting = new FormattingCard();
    colors = new ColorsCard();
    cards = [this.display, this.thresholds, this.formatting, this.colors];
}
