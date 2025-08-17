const hostnames = ["localhost", "sayan.website"];

export function hasSubdomain() {
  const hostname = window.location.hostname;
  return hostname.includes(".") && !hostnames.includes(hostname);
}

export function getAcademyPath({ academySlug }: { academySlug?: string }) {
  const subdomain = window.location.hostname.split(".")[0];
  const academyPath = hasSubdomain() ? subdomain : `/academy/${academySlug}`;
  return academyPath;
}
