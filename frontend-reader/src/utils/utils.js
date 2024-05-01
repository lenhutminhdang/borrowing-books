export function formatCurrency(value) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
}

export function getDomainName(url) {
  const protocolSeparatorIndex = url.indexOf("://");
  let startIndex = 0;

  if (protocolSeparatorIndex > -1) {
    startIndex = protocolSeparatorIndex + 3;
  }

  const pathSeparatorIndex = url.indexOf("/", startIndex);
  const domainEndIndex =
    pathSeparatorIndex !== -1 ? pathSeparatorIndex : url.length;
  const domain = url.substring(startIndex, domainEndIndex);

  if (domain.startsWith("www.")) {
    return domain.substring(4);
  }

  return domain;
}
