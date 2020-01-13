import {VMessV2} from "./types";

const v1ToV2Mapper = {
  remarks:    'ps',
  obfsParam:  'host',
  obfs:       'net',
};

const v2ToV1Mapper = {
  ps:     'remarks',
  host:   'obfsParam',
  net:   'obfs',
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

export const isVMessLink = (link: string): boolean => /^vmess:\/\//i.test(link);

export const isVMessLinkV1 = (link: string): boolean => {
  return /^vmess:\/\//i.test(link) && link.includes('?');
};

export const isVMessLinkV2 = (link: string): boolean => {
  return isVMessLink(link)
    && !link.includes('?')
    && tryToParseJson(atob(link.replace(/^vmess:\/\//i, '')));
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

export const parseV2Link = (link: string): VMessV2 => {
  if (!isVMessLinkV2(link)) {
    throw new Error('不是 v2 版本的 VMess 链接');
  }
  return JSON.parse(atob(link.replace(/^vmess:\/\//i, '')));
};

export const toV1Link = (link: string) => {
  if (!isVMessLink(link)) throw new Error('不是合法的 VMess 链接');
  if (isVMessLinkV1(link)) return link;
  const { v, type, id, port, add, ...others} = parseV2Link(link);
  const searchParams = new URLSearchParams();
  Object.keys(others).forEach(k => {
    const newKey = v2ToV1Mapper[k] || k;
    const newValue = v1Converter[newKey] ? v1Converter[newKey](others[k]) : others[k];
    searchParams.append(newKey, newValue);
  });
  return `vmess://${btoa(`${type}:${id}@${add}:${port}`)}?${decodeURIComponent(searchParams.toString())}`;
};

export const toV2Link = (link: string) => {
  if (!isVMessLink(link)) throw new Error('不是合法的 VMess 链接');
  if (isVMessLinkV2(link)) return link;
  const v2 = parseV1Link(link);
  return `vmess://${btoa(JSON.stringify({ ...v2, v: '2' }))}`;
};

