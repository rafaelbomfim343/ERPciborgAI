import {
  AverageTicketsTNT,
  ConversionsTNT,
  CustomerSatisficationTNT,
  MetricsTNT,
  TicketByChannelsTNT,
} from "@/components/chart-blocks";
import Container from "@/components/container";
export default function IsoporPage() {
  return (
    <div>
      <MetricsTNT />
      <div className="grid grid-cols-1 divide-y border-b border-border laptop:grid-cols-3 laptop:divide-x laptop:divide-y-0 laptop:divide-border">
        <Container className="py-4 laptop:col-span-2">
          <AverageTicketsTNT />
        </Container>
        <Container className="py-4 laptop:col-span-1">
          <ConversionsTNT />
        </Container>
      </div>
      <div className="grid grid-cols-1 divide-y border-b border-border laptop:grid-cols-2 laptop:divide-x laptop:divide-y-0 laptop:divide-border">
        <Container className="py-4 laptop:col-span-1">
          <TicketByChannelsTNT />
        </Container>
        <Container className="py-4 laptop:col-span-1">
          <CustomerSatisficationTNT />
        </Container>
      </div>
    </div>
  );
}