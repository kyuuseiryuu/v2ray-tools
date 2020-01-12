import {VMessV2} from "./types";

const v1SearchToV2Mapper = {
  remarks: 'ps',
};

const converter = {
  ps: v => encodeURIComponent(v),
};


export const isVMessLink = (link: string): boolean => /^vmess:\/\//i.test(link);

export const isVMessLinkV1 = (link: string): boolean => {
  return /^vmess:\/\//i.test(link) && link.includes('?');
};

export const isVMessLinkV2 = (link: string): boolean => {
  return isVMessLink(link) && !link.includes('?');
};

export const parseV1Link = (v1Link: string): VMessV2 => {
  if (!isVMessLinkV1(v1Link)) {
    throw new Error('不是 v1 版本的 VMess 链接');
  }
  const [main, searchStr] = v1Link.replace(/^vmess:\/\//i, '').split('?');
  const [type, id, host, port] = atob(main).split(/[@:]/);
  const search = {};
  const searchParams = new URLSearchParams(searchStr);
  searchParams.forEach((value, key) => {
    const newKey = v1SearchToV2Mapper[key] || key;
    search[newKey] = (converter[newKey] ? converter[newKey](value) : value);
  });
  return {
    v: '2',
    type,
    id,
    host,
    port: Number(port),
    ...search,
  };
};

export const parseV2Link = (v2Link: string): VMessV2 => {
  return JSON.parse(atob(v2Link.replace(/^vmess:\/\//i, '')));
};

export const toV1Link = (v2Link: string) => {
  if (!isVMessLink(v2Link)) throw new Error('不是合法的 VMess 链接');
  if (isVMessLinkV1(v2Link)) return v2Link;
};

export const toV2Link = (v1Link: string) => {
  if (!isVMessLink(v1Link)) throw new Error('不是合法的 VMess 链接');
  if (isVMessLinkV2(v1Link)) return v1Link;
  const v2 = parseV1Link(v1Link);
  return `vmess://${btoa(JSON.stringify({ ...v2, v: '2' }))}`;
};

export const vMessLink = (link: string) => {

};
