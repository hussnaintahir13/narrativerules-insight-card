import powerbi from "powerbi-visuals-api";
import DataView = powerbi.DataView;
import DataViewValueColumn = powerbi.DataViewValueColumn;
import DataViewCategoryColumn = powerbi.DataViewCategoryColumn;
import { NarrativeMeasures } from "./types";

const safeNumber = (v: powerbi.PrimitiveValue | undefined | null): number | undefined => {
    if (v === undefined || v === null) return undefined;
    const n = Number(v);
    return isFinite(n) ? n : undefined;
};

const firstStringFromCategory = (c: DataViewCategoryColumn): string | undefined => {
    if (!c.values || c.values.length === 0) return undefined;
    const v = c.values[0];
    return v == null ? undefined : String(v);
};

export function extractMeasures(dataView: DataView | undefined): NarrativeMeasures {
    const m: NarrativeMeasures = {};
    if (!dataView || !dataView.categorical) return m;
    const cat = dataView.categorical;

    if (cat.values) {
        for (const v of cat.values as DataViewValueColumn[]) {
            const roles = v.source.roles || {};
            const value = v.values && v.values.length > 0 ? v.values[0] : undefined;
            const n = safeNumber(value);
            if (roles.currentValue) m.currentValue = n;
            if (roles.previousValue) m.previousValue = n;
            if (roles.targetValue) m.targetValue = n;
            if (roles.varianceValue) m.varianceValue = n;
            if (roles.variancePercent) m.variancePercent = n;
            if (roles.topDriverValue) m.topDriverValue = n;
            if (roles.worstDriverValue) m.worstDriverValue = n;
        }
    }

    if (cat.categories) {
        for (const c of cat.categories) {
            const roles = c.source.roles || {};
            const s = firstStringFromCategory(c);
            if (s == null) continue;
            if (roles.topDriverName) m.topDriverName = s;
            if (roles.worstDriverName) m.worstDriverName = s;
            if (roles.measureLabel) m.measureLabel = s;
            if (roles.category) m.category = s;
            if (roles.customPrefix) m.customPrefix = s;
            if (roles.customSuffix) m.customSuffix = s;
        }
    }

    return m;
}
