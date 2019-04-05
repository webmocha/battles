/* eslint-disable @typescript-eslint/camelcase */
export const GA_TRACKING_ID = process.env.GA_TRACKING_ID;

declare global {
  interface Window {
    gtag: any;
  }
}

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageview = (url: string): void =>
  GA_TRACKING_ID &&
  window.gtag("config", GA_TRACKING_ID, {
    page_location: url,
  });

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label: string;
  value?: number;
}): void =>
  GA_TRACKING_ID &&
  window.gtag("event", action, {
    event_category: category,
    event_label: label,
    value: value || 1,
  });
