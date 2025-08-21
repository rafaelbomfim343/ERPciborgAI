import { addDays, endOfDay, isWithinInterval, startOfDay } from "date-fns";
import { atom } from "jotai";
import type { DateRange } from "react-day-picker";
import { productionData } from "@/data/production-data";
import type { ProductionMetric } from "@/types/types";

// Data inicial padrão (18 de dezembro de 2025)
const defaultStartDate = new Date(2025, 11, 18);

// Átomo para range de datas
export const dateRangeAtom = atom<DateRange | undefined>({
  from: defaultStartDate,
  to: addDays(defaultStartDate, 6),
});

// Átomo para os dados do gráfico
export const productionChartDataAtom = atom<ProductionMetric[]>((get) => {
  const dateRange = get(dateRangeAtom);

  if (!dateRange?.from || !dateRange?.to) return [];

  const startDate = startOfDay(dateRange.from);
  const endDate = endOfDay(dateRange.to);

  return productionData
    .filter((item) => {
      // item.date no formato "YYYY-MM-DD"
      const [year, month, day] = item.date.split("-").map(Number);
      const date = new Date(year, month - 1, day);
      return isWithinInterval(date, { start: startDate, end: endDate });
    })
    .flatMap<ProductionMetric>((item) => [
      {
        date: item.date,
        type: "Real",
        count: item.Real ?? 0, // garante que não quebra se faltar valor
      },
      {
        date: item.date,
        type: "Planejada",
        count: item.Planejada ?? 0,
      },
    ]);
});
