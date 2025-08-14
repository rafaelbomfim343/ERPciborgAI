import {
  AverageTicketsTetrapak,
  ConversionsTetrapak,
  CustomerSatisficationTetrapak,
  MetricsTetrapak,
  TicketByChannelsTetrapak,
} from "@/components/chart-blocks";
import Container from "@/components/container";
export default function TetrapakPage() {
  return (
    <div>
      <MetricsTetrapak />
      <div className="grid grid-cols-1 divide-y border-b border-border laptop:grid-cols-3 laptop:divide-x laptop:divide-y-0 laptop:divide-border">
        <Container className="py-4 laptop:col-span-2">
          <AverageTicketsTetrapak/>
        </Container>
        <Container className="py-4 laptop:col-span-1">
          <ConversionsTetrapak />
        </Container>
      </div>
      <div className="grid grid-cols-1 divide-y border-b border-border laptop:grid-cols-2 laptop:divide-x laptop:divide-y-0 laptop:divide-border">
        <Container className="py-4 laptop:col-span-1">
          <TicketByChannelsTetrapak />
        </Container>
        <Container className="py-4 laptop:col-span-1">
          <CustomerSatisficationTetrapak />
        </Container>
      </div>
    </div>
  );
}