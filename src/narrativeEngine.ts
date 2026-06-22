import { NarrativeMeasures, NarrativeOptions, NarrativeResult, TargetStatus, Tone } from "./types";
import { formatPercent, formatSignedPercent, formatValue } from "./formatting";

interface TrendVerbs {
    increased: string;
    decreased: string;
    flat: string;
}

const VERBS: Record<Tone, TrendVerbs> = {
    executive: { increased: "increased", decreased: "declined", flat: "remained broadly stable" },
    analyst:   { increased: "is up", decreased: "is down", flat: "is broadly flat" },
    plain:     { increased: "went up", decreased: "went down", flat: "stayed about the same" },
    short:     { increased: "up", decreased: "down", flat: "flat" }
};

export function chooseTrendVerb(variancePercent: number | undefined, opts: NarrativeOptions, tone: Tone): "increased" | "decreased" | "flat" {
    if (variancePercent === undefined || !isFinite(variancePercent)) return "flat";
    if (variancePercent > opts.positiveThreshold) return "increased";
    if (variancePercent < opts.negativeThreshold) return "decreased";
    return "flat";
}

export function chooseTargetPhrase(currentValue: number | undefined, targetValue: number | undefined, opts: NarrativeOptions): { phrase: string; status: TargetStatus } {
    if (currentValue === undefined || targetValue === undefined || !isFinite(currentValue) || !isFinite(targetValue) || targetValue === 0) {
        return { phrase: "", status: "On track" };
    }
    const pct = ((currentValue - targetValue) / Math.abs(targetValue)) * 100;
    if (Math.abs(pct) <= opts.targetTolerance) return { phrase: "broadly on target", status: "On track" };
    if (pct > 0) return { phrase: "above target", status: "Above target" };
    return { phrase: "below target", status: "Below target" };
}

export function buildNarrative(m: NarrativeMeasures, opts: NarrativeOptions): NarrativeResult {
    const hasAny =
        m.currentValue !== undefined ||
        m.previousValue !== undefined ||
        m.targetValue !== undefined ||
        m.varianceValue !== undefined ||
        m.variancePercent !== undefined;

    if (!hasAny) {
        return { text: "", badge: "On track", direction: "flat", hasData: false };
    }

    const variance = m.varianceValue !== undefined
        ? m.varianceValue
        : (m.currentValue !== undefined && m.previousValue !== undefined)
            ? m.currentValue - m.previousValue
            : undefined;

    const variancePct = m.variancePercent !== undefined
        ? m.variancePercent
        : (variance !== undefined && m.previousValue !== undefined && m.previousValue !== 0)
            ? (variance / Math.abs(m.previousValue)) * 100
            : undefined;

    const targetVariance = (m.currentValue !== undefined && m.targetValue !== undefined)
        ? m.currentValue - m.targetValue : undefined;
    const targetVariancePct = (targetVariance !== undefined && m.targetValue && m.targetValue !== 0)
        ? (targetVariance / Math.abs(m.targetValue)) * 100 : undefined;

    const tone = opts.tone;
    const verbs = VERBS[tone];
    const direction = chooseTrendVerb(variancePct, opts, tone);
    const verb = verbs[direction];

    const target = chooseTargetPhrase(m.currentValue, m.targetValue, opts);
    let badge: TargetStatus = target.status;
    if (target.phrase === "") {
        badge = direction === "increased" ? "Improving" : direction === "decreased" ? "Declining" : "On track";
    }

    const measure = m.measureLabel || m.category || "Performance";
    const pctText = variancePct !== undefined ? Math.abs(variancePct).toFixed(1) + "%" : "";
    const valueText = formatValue(m.currentValue, opts.numberFormat, opts.currencySymbol, opts.decimalPlaces);

    // ----- Compose sentences according to tone -----
    let mainSentence = "";
    if (tone === "short") {
        if (variancePct !== undefined) mainSentence = `${measure} ${verb} ${pctText}.`;
        else mainSentence = `${measure} at ${valueText}.`;
    } else if (tone === "plain") {
        if (variancePct !== undefined) mainSentence = `${measure} ${verb} by ${pctText}.`;
        else mainSentence = `${measure} is at ${valueText}.`;
    } else if (tone === "analyst") {
        if (variancePct !== undefined) {
            mainSentence = `${measure} ${verb} ${pctText} compared with the previous period`;
            if (target.phrase) mainSentence += ` and is currently ${target.phrase}`;
            mainSentence += ".";
        } else {
            mainSentence = `${measure} is currently ${valueText}.`;
        }
    } else {
        // executive
        if (variancePct !== undefined && variance !== undefined) {
            const directionWord = direction === "increased" ? "by" : direction === "decreased" ? "by" : "";
            mainSentence = `${measure} ${verb}${directionWord ? " " + directionWord + " " + pctText : ""} versus the previous period`;
            if (target.phrase) mainSentence += ` and is currently ${target.phrase}`;
            mainSentence += ".";
        } else if (m.currentValue !== undefined) {
            mainSentence = `${measure} stands at ${valueText}${target.phrase ? `, ${target.phrase}` : ""}.`;
        }
    }

    // ----- Driver sentences -----
    const driverLines: string[] = [];
    if (m.topDriverName && m.topDriverValue !== undefined) {
        const v = formatValue(m.topDriverValue, opts.numberFormat, opts.currencySymbol, opts.decimalPlaces);
        if (tone === "short") {
            driverLines.push(`Top driver: ${m.topDriverName} (${v}).`);
        } else if (tone === "plain") {
            driverLines.push(`The biggest positive contribution came from ${m.topDriverName} at ${v}.`);
        } else if (tone === "analyst") {
            driverLines.push(`Largest positive driver: ${m.topDriverName} contributing ${v}.`);
        } else {
            driverLines.push(`The largest positive driver was ${m.topDriverName}, contributing ${v}.`);
        }
    }
    if (m.worstDriverName && m.worstDriverValue !== undefined) {
        const v = formatValue(m.worstDriverValue, opts.numberFormat, opts.currencySymbol, opts.decimalPlaces);
        if (tone === "short") {
            driverLines.push(`Worst: ${m.worstDriverName} (${v}).`);
        } else if (tone === "plain") {
            driverLines.push(`The biggest drag was ${m.worstDriverName} at ${v}.`);
        } else if (tone === "analyst") {
            driverLines.push(`Largest negative driver: ${m.worstDriverName} at ${v}.`);
        } else {
            driverLines.push(`The largest negative driver was ${m.worstDriverName}, reducing performance by ${v}.`);
        }
    }

    const parts: string[] = [];
    if (m.customPrefix) parts.push(m.customPrefix.trim());
    if (mainSentence) parts.push(mainSentence);
    parts.push(...driverLines);
    if (m.customSuffix) parts.push(m.customSuffix.trim());

    return {
        text: parts.join(" "),
        badge,
        direction: direction === "increased" ? "up" : direction === "decreased" ? "down" : "flat",
        varianceValue: variance,
        variancePercent: variancePct,
        targetVariance,
        targetVariancePercent: targetVariancePct,
        formattedCurrent: valueText,
        formattedVariance: variance !== undefined ? formatValue(variance, opts.numberFormat, opts.currencySymbol, opts.decimalPlaces) : undefined,
        formattedVariancePct: variancePct !== undefined ? formatSignedPercent(variancePct) : undefined,
        formattedTargetStatus: target.phrase || (targetVariancePct !== undefined ? formatPercent(targetVariancePct) : undefined),
        hasData: true,
        category: m.category,
        measureLabel: m.measureLabel,
        topDriverName: m.topDriverName,
        worstDriverName: m.worstDriverName,
        formattedTopDriverValue: m.topDriverValue !== undefined ? formatValue(m.topDriverValue, opts.numberFormat, opts.currencySymbol, opts.decimalPlaces) : undefined,
        formattedWorstDriverValue: m.worstDriverValue !== undefined ? formatValue(m.worstDriverValue, opts.numberFormat, opts.currencySymbol, opts.decimalPlaces) : undefined
    };
}
