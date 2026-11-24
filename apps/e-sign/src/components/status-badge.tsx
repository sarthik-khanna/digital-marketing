import { statusLabel, type AgreementStatus } from "@tdm/esign-core/types";
import { Badge } from "@/components/ui/badge";

const variant: Record<AgreementStatus, "outline" | "secondary" | "default"> = {
  pending: "outline",
  signed: "secondary",
  completed: "default",
};

export function StatusBadge({ status }: { status: AgreementStatus }) {
  return <Badge variant={variant[status]}>{statusLabel[status]}</Badge>;
}
