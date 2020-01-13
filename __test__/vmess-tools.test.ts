import { VMessTools } from '../src/index';
const { isVMessLink, parseV1Link, parseV2Link, toV1Link, toV2Link } = VMessTools;

const v1Link = 'vmess://bm9uZTo0NjFiNzM3Mi1iMjg2LTRkZTgtODJlNi0yMWYxMzAxMzFmMDRAbHMuaGt0bHMubWw6NjAxMjA=?remarks=%E9%82%80%E8%AF%B7%E7%A0%81NEUK.%E8%B0%B7%E6%AD%8C%E6%90%9CNEUK%E5%85%AC%E7%9B%8A%E5%8A%A0%E9%80%9F&cert=';
const v2Link = 'vmess://eyJhZGQiOiJ1bmkua2l0c3VuZWJpLmZ1biIsImFpZCI6IjAiLCJob3N0IjoiIiwiaWQiOiI5NTEzNzg1Ny03MGZhLTRhYzgtOGY5MC00ZTIwYWViNjYyY2YiLCJuZXQiOiJ0Y3AiLCJwYXRoIjoiIiwicG9ydCI6MTAwMjUsInBzIjoiU1NSVE9PTC5DT00iLCJ0bHMiOiIiLCJ0eXBlIjoibm9uZSIsInYiOiIyIn0=';
describe('test vmess-tools', () => {
  test('test parseV1Link', () => {
    const v2Obj = parseV1Link(v1Link);
    expect(v2Obj).toHaveProperty('add');
    expect(v2Obj).toHaveProperty('cert');
    expect(v2Obj).toHaveProperty('ps');
    expect(v2Obj).toMatchObject({ v: '2' });
  });
  test('test parseV2Link', () => {
    const v2 = parseV2Link(v2Link);
    expect(v2).toHaveProperty('port');
    expect(v2).toHaveProperty('id');
    expect(v2).toHaveProperty('host');
    expect(v2).toHaveProperty('type');
  });
  test('test v1 -> v2', () => {
    const l = toV2Link(v1Link);
    expect(l).toBeTruthy();
    expect(toV2Link(v2Link)).toEqual(v2Link);
  });
  test('test v2 -> v1', () => {
    const l = toV1Link(v2Link);
    expect(toV1Link(v1Link)).toEqual(v1Link);
    expect(isVMessLink(l)).toBeTruthy();
  });
  test('test v1 -> v2 -> v1', () => {
    const l2 = toV2Link(v1Link);
    const l1 = toV1Link(l2);
    expect(l1).toEqual(v1Link);
  });
  test('test v2 -> v1 -> v2', () => {
    const l1 = toV1Link(v2Link);
    const l2 = toV2Link(l1);
    const a = parseV2Link(v2Link);
    const b = parseV2Link(l2);
    expect(a).toMatchObject(b);
  });
});