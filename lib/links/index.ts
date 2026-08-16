export { validateUrl, validateLinkInput, isExternalUrl, isNewTabRecommended, sanitizeUrl, getProtocolType } from "./link-validation";
export type { ValidationResult } from "./link-validation";

export {
  getLinkHref,
  isInternalLink,
  getInternalPath,
  filterActiveLinks,
  filterLinksByCategory,
  filterLinksByType,
  sortLinksByOrder,
  getSocialLinks,
  getContactLinks,
  getLinkByType,
  formatHealthStatus,
  formatResponseTime,
  buildMailtoUrl,
  buildTelUrl,
  extractDomain,
  getLinkAnalytics,
} from "./link-utils";

export {
  getAllLinks,
  getActiveLinks,
  getLinksByCategory,
  getLinksByType,
  getLinkById,
  createLink,
  updateLink,
  deleteLink,
  reorderLinks,
  toggleLinkActive,
  trackLinkClick,
  updateLinkHealth,
  getLinkHealthSummary,
} from "./link-service";

export type {
  LinkData,
  LinkType,
  LinkCategory,
  LinkHealth,
  LinkHealthStatus,
  CreateLinkInput,
  UpdateLinkInput,
  LinkHealthSummary,
  LINK_TYPE_LABELS,
  LINK_CATEGORY_LABELS,
  LINK_TYPE_ICONS,
} from "./link-types";
