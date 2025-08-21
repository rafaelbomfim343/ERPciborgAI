import { addDays, endOfDay, isWithinInterval, startOfDay } from "date-fns";
import { atom } from "jotai";
import type { DateRange } from "react-day-picker";
import { productionData } from "@/data/production-data";
import type { ProductionMetric } from "@/types/types";

const defaultStartDate = new Date(2025, 11, 18);

export const dateRangeAtom = atom<DateRange | undefined>({
  from: defaultStartDate,
  to: addDays(defaultStartDate, 6),
});

export const productionChartDataAtom = atom((get) => {
  const dateRange = get(dateRangeAtom);

  if (!dateRange?.from || !dateRange?.to) return [];

  const startDate = startOfDay(dateRange.from);
  const endDate = endOfDay(dateRange.to);

  return productionData
    .filter((item) => {
      const [year, month, day] = item.date.split("-").map(Number);
      const date = new Date(year, month - 1, day);
      return isWithinInterval(date, { start: startDate, end: endDate });
    })
    .flatMap((item) => {
      const res: ProductionMetric[] = [
        {
          date: item.date,
          type: "Produção Real",
          count: item.resolved,
        },
        {
          date: item.date,
          type: "Produção Planejada",
          count: item.created,
        },
      ];
      return res;
    });
});
