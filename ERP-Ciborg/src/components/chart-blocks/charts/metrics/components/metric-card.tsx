import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { chartTitle } from "@/components/primitives";
import { cn } from "@/lib/utils";
import { metricConfig, type MetricConfig } from "@/data/metric-config";

export default function MetricCard({
  title,
  value,
  change,
  className,
}: {
  title: string;
  value?: string;
  change?: number;
  className?: string;
}) {
  // Obtém configuração do título
  const config = metricConfig[title];
  
  // Define valores para exibição (usa config externa ou props)
  const displayValue = value || getDisplayValue(config);
  const displayChange = change !== undefined ? change : (config?.change || 0);
  const comparisonText = config?.comparisonText || "comparado ao mês anterior";
  const invertedLogic = config?.invertedLogic || false;

  return (
    <section className={cn("flex flex-col", className)}>
      <h2 className={cn(chartTitle({ color: "mute", size: "sm" }), "mb-1")}>
        {title}
      </h2>
      <div className="flex items-center gap-2">
        <span className="text-xl font-medium">{displayValue}</span>
        <ChangeIndicator 
          change={displayChange} 
          invertedLogic={invertedLogic} 
        />
      </div>
      <div className="text-xs text-muted-foreground">{comparisonText}</div>
    </section>
  );
}

// Função auxiliar para formatar o valor de exibição
function getDisplayValue(config?: MetricConfig): string {
  if (!config) return "0";
  
  return config.unit 
    ? `${config.value} ${config.unit}`
    : config.value;
}

// Componente ChangeIndicator atualizado
function ChangeIndicator({ 
  change, 
  invertedLogic = false 
}: { 
  change: number; 
  invertedLogic?: boolean;
}) {
  const isPositive = invertedLogic ? change < 0 : change > 0;
  
  return (
    <span
      className={cn(
        "flex items-center rounded-sm px-1 py-0.5 text-xs",
        isPositive
          ? "bg-green-50 text-green-500 dark:bg-green-950"
          : "bg-red-50 text-red-500 dark:bg-red-950",
      )}
    >
      {change > 0 ? "+" : ""}
      {Math.round(change * 100)}%
      {isPositive ? (
        <ArrowUpRight className="ml-0.5 inline-block h-3 w-3" />
      ) : (
        <ArrowDownRight className="ml-0.5 inline-block h-3 w-3" />
      )}
    </span>
  );
}
