import powerbi from "powerbi-visuals-api";
import DataView = powerbi.DataView;
import DataViewTableRow = powerbi.DataViewTableRow;
import { NarrativeMeasures } from "./types";

const safeNumber = (v: powerbi.PrimitiveValue | undefined | null): number | undefined => {
    if (v === undefined || v === null) return undefined;
    const n = Number(v);
    return isFinite(n) ? n : undefined;
};

const safeString = (v: powerbi.PrimitiveValue | undefined | null): string | undefined => {
    return v == null ? undefined : String(v);
};

export function extractMeasures(dataView: DataView | undefined): NarrativeMeasures {
    const m: NarrativeMeasures = {};
    if (!dataView || !dataView.table) return m;
    const table = dataView.table;
    if (!table.columns || !table.rows || table.rows.length === 0) return m;

    // Single-value card: read the first row only.
    const row: DataViewTableRow = table.rows[0];

    for (let i = 0; i < table.columns.length; i++) {
        const roles = table.columns[i].roles || {};
        const raw = row[i];

        if (roles.currentValue) m.currentValue = safeNumber(raw);
        if (roles.previousValue) m.previousValue = safeNumber(raw);
        if (roles.targetValue) m.targetValue = safeNumber(raw);
        if (roles.varianceValue) m.varianceValue = safeNumber(raw);
        if (roles.variancePercent) m.variancePercent = safeNumber(raw);
        if (roles.topDriverValue) m.topDriverValue = safeNumber(raw);
        if (roles.worstDriverValue) m.worstDriverValue = safeNumber(raw);

        if (roles.measureLabel) m.measureLabel = safeString(raw);
        if (roles.category) m.category = safeString(raw);
        if (roles.topDriverName) m.topDriverName = safeString(raw);
        if (roles.worstDriverName) m.worstDriverName = safeString(raw);
        if (roles.customPrefix) m.customPrefix = safeString(raw);
        if (roles.customSuffix) m.customSuffix = safeString(raw);
    }

    return m;
}
