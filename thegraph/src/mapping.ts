import { BadgeIssued } from "../generated/Badge/Badge";
import { Badge } from "../generated/schema";

// Custom handler, maps event to entity and saves it to the store
export function handleBadgeIssued(event: BadgeIssued): void {
  let entity = new Badge(event.params.id.toString());

  entity.issuerName = event.params.issuerName;
  entity.recipientName = event.params.recipientName;

  entity.save();
}
