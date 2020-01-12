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
  const [type, id, add, port] = atob(main).split(/[@:]/);
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
    add,
    port: Number(port),
    ...search,
  };
};

export const parseV2Link = (link: string): VMessV2 => {
  return JSON.parse(atob(link.replace(/^vmess:\/\//i, '')));
};

export const toV1Link = (link: string) => {
  if (!isVMessLink(link)) throw new Error('不是合法的 VMess 链接');
  if (isVMessLinkV1(link)) return link;
  const { type, id, port, add, ...others} = parseV2Link(link);
  const searchParams = new URLSearchParams();
  Object.keys(others).forEach(k => {
    searchParams.append(k, others[k]);
  });
  return `vmess://${btoa(`${type}:${id}@${add}:${port}`)}?${searchParams.toString()}`;
};

export const toV2Link = (link: string) => {
  if (!isVMessLink(link)) throw new Error('不是合法的 VMess 链接');
  if (isVMessLinkV2(link)) return link;
  const v2 = parseV1Link(link);
  return `vmess://${btoa(JSON.stringify({ ...v2, v: '2' }))}`;
};

