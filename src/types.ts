export type Tone = "executive" | "analyst" | "plain" | "short";
export type NumberFormat = "auto" | "currency" | "percentage" | "decimal" | "whole";
export type TargetStatus = "Above target" | "On track" | "Below target" | "Declining" | "Improving";

export interface NarrativeMeasures {
    currentValue?: number;
    previousValue?: number;
    targetValue?: number;
    varianceValue?: number;
    variancePercent?: number;
    topDriverName?: string;
    topDriverValue?: number;
    worstDriverName?: string;
    worstDriverValue?: number;
    measureLabel?: string;
    category?: string;
    customPrefix?: string;
    customSuffix?: string;
}

export interface NarrativeOptions {
    tone: Tone;
    numberFormat: NumberFormat;
    currencySymbol: string;
    decimalPlaces: number;
    positiveThreshold: number;
    negativeThreshold: number;
    targetTolerance: number;
}

export interface NarrativeResult {
    text: string;
    badge: TargetStatus;
    direction: "up" | "down" | "flat";
    varianceValue?: number;
    variancePercent?: number;
    targetVariance?: number;
    targetVariancePercent?: number;
    formattedCurrent?: string;
    formattedVariance?: string;
    formattedVariancePct?: string;
    formattedTargetStatus?: string;
    hasData: boolean;
    category?: string;
    measureLabel?: string;
    topDriverName?: string;
    worstDriverName?: string;
    formattedTopDriverValue?: string;
    formattedWorstDriverValue?: string;
}

export interface ColorScheme {
    background: string;
    text: string;
    positive: string;
    negative: string;
    neutral: string;
    badge: string;
}
