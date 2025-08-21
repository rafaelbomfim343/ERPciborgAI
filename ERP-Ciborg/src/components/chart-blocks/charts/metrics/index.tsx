import Container from "@/components/container";
import { metrics } from "@/data/metrics";
import MetricCard from "./components/metric-card";

export default function Metrics() {
  return (
    <Container className="grid grid-cols-1 gap-y-6 border-b border-border py-4 phone:grid-cols-2 laptop:grid-cols-4">
      
      <MetricCard title="Meta de produção" />
      <MetricCard title="Produção Real" />
      <MetricCard title="Produção Planejada" />
      <MetricCard title="Horas de Trabalho" />

      
    </Container>
  );
}
