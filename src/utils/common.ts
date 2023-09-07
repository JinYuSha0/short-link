import { FastifyRequest as Request } from 'fastify';
import { isArray } from 'lodash';

export function getReallyIp(req: Request): string {
  try {
    let header = req.headers['x-forwarded-for'];
    header = isArray(header) ? header[0] : header;
    const ip =
      header ??
      req.ip ??
      req.connection.remoteAddress ??
      req.socket.remoteAddress ??
      '';
    return ip;
  } catch {
    return '';
  }
}

export function getReferer(req: Request): string {
  const referer = req.headers['Referer'];
  return isArray(referer) ? referer[0] : referer;
}

export function getControllerName(req: Request): string {
  return req.raw.url.match(/\/(.*?)\//)[1];
}

export function getCurrTimestampWithPadding(padding = 0): number {
  return +new Date() + padding;
}

export function isRealIp(ip?: string) {
  if (!ip) return false;
  const ipv4Regex =
    /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
  return ipv4Regex.test(ip);
}
