import atob from 'atob';
import btoa from 'btoa';
import {VMessV2} from "./types";

const v1ToV2Mapper = {
  remarks: 'ps',
  obfsParam: 'host',
  obfs: 'net',
};

const v2ToV1Mapper = {
  ps: 'remarks',
  host: 'obfsParam',
  net: 'obfs',
};

const v1Converter = {
};

const v2Converter = {
  ps: v => encodeURIComponent(v),
};

const tryToParseJson = (str: string): any => {
  try {
    return JSON.parse(str);
  } catch (e) {}
};

const tryAToB = (encoded: string) => {
  try {
    return atob(encoded);
  } catch (e) {}
};

export const isVMessLink = (link: string): boolean => {
  return /^vmess:\/\//i.test(link) && (
    Boolean(parseV1Link(link))
    || Boolean(parseV2Link(link))
  );
};

export const isVMessLinkV1 = (link: string): boolean => {
  const linkBody = link.replace(/^vmess:\/\//i, '');
  return linkBody.includes('?');
};

export const isVMessLinkV2 = (link: string): boolean => {
  const linkBody = link.replace(/^vmess:\/\//i, '');
  return !linkBody.includes('?')
    && tryToParseJson(tryAToB(linkBody));
};

export const parseV1Link = (v1Link: string): VMessV2 | undefined => {
  if (!isVMessLinkV1(v1Link)) return;
  const [main, searchStr] = v1Link.replace(/^vmess:\/\//i, '').split('?');
  const s = tryAToB(main);
  if (!s) return;
  const [type, id, add, port] = s.split(/[@:]/);
  const search = {};
  const searchParams = new URLSearchParams(searchStr);
  searchParams.forEach((value, key) => {
    const newKey = v1ToV2Mapper[key] || key;
    search[newKey] = (v2Converter[newKey] ? v2Converter[newKey](value) : value);
  });
  return {
    v: '2',
    type,
    id,
    add,
    port: Number(port),
    ...search,
  };
};

export const parseV2Link = (link: string): VMessV2 | undefined => {
  if (!isVMessLinkV2(link)) return;
  const s = atob(link.replace(/^vmess:\/\//i, ''));
  if (!s) return;
  return JSON.parse(s);
};

export const toV1Link = (link: string): string => {
  if (!isVMessLink(link)) return '';
  if (isVMessLinkV1(link)) return link;
  const parsed = parseV2Link(link);
  if (!parsed) return '';
  return objToV1Link(parsed);
};

export const toV2Link = (link: string): string => {
  if (!isVMessLink(link)) return '';
  if (isVMessLinkV2(link)) return link;
  const v2 = parseV1Link(link);
  if (!v2) return '';
  return objToV2Link(v2);
};

export const objToV1Link = (obj: VMessV2): string => {
  const { v, type, id, port, add, ...others} = obj;
  const searchParams = new URLSearchParams();
  Object.keys(others).forEach(k => {
    const newKey = v2ToV1Mapper[k] || k;
    const newValue = v1Converter[newKey] ? v1Converter[newKey](others[k]) : others[k];
    searchParams.append(newKey, newValue);
  });
  return `vmess://${btoa(`${type}:${id}@${add}:${port}`)}?${decodeURIComponent(searchParams.toString())}`;
};

export const objToV2Link = (obj: VMessV2): string => {
  return `vmess://${btoa(JSON.stringify({ ...obj, v: '2' }))}`;
};

export const objToQuantumult = (obj: VMessV2, group: string = 'v2ray-tools'): string => {
  let s = `${obj.ps}= vmess, ${obj.add}, ${obj.port}, ${obj.type || 'chacha20-ietf-poly1305'}, "${obj.id}", over-tls=${obj.tls}`;
  s = `${s}, certificate=0, group=${group}`;
  if (obj.net === 'ws') {
    s = `${s}, obfs=ws`;
    if (obj.path) s = `${s}, obfs-path="${obj.path}"`;
    if (obj.host) s = `${s}, obfs-header="Host: ${obj.host}"`;
  }
  return `vmess://${btoa(s)}`;
};

export const objToQuantumultX = (obj: VMessV2): string => {
  let s = `vmess=${obj.add}:${obj.port}, method=${obj.type||'none'}, password=${obj.id}, fast-open=false, udp-relay=false, tag=${obj.ps}`;
  if (obj.net === 'ws') {
    s = `${s}, obfs=ws${obj.tls ? 's' : ''}`;
    if (obj.path) s = `${s}, obfs-uri=${obj.path}`;
    if (obj.host) s = `${s}, obfs-host=${obj.host}`;
  }
  return s;
};
