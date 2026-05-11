import { NumberFormat } from "./types";

export function formatValue(value: number | undefined, format: NumberFormat, currencySymbol: string, decimals: number): string {
    if (value === undefined || value === null || !isFinite(value)) return "—";
    switch (format) {
        case "currency":
            return `${currencySymbol}${formatNumber(value, decimals)}`;
        case "percentage":
            return `${formatNumber(value, decimals)}%`;
        case "whole":
            return formatNumber(value, 0);
        case "decimal":
            return formatNumber(value, decimals);
        case "auto":
        default:
            return formatAuto(value, decimals);
    }
}

function formatAuto(value: number, decimals: number): string {
    const abs = Math.abs(value);
    if (abs >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(decimals)}B`;
    if (abs >= 1_000_000) return `${(value / 1_000_000).toFixed(decimals)}M`;
    if (abs >= 1_000) return `${(value / 1_000).toFixed(decimals)}K`;
    return formatNumber(value, decimals);
}

function formatNumber(value: number, decimals: number): string {
    return value.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

export function formatPercent(value: number | undefined, decimals = 1): string {
    if (value === undefined || value === null || !isFinite(value)) return "—";
    return `${value.toFixed(decimals)}%`;
}

export function formatSignedPercent(value: number | undefined, decimals = 1): string {
    if (value === undefined || value === null || !isFinite(value)) return "—";
    const sign = value > 0 ? "+" : "";
    return `${sign}${value.toFixed(decimals)}%`;
}
