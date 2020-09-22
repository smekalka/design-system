import { useServicesByLocale, SHARE_DATA, PRIORITY_MAP } from '../src/utils';

describe('useServicesByLocale', () => {
  const servicesByLocale = PRIORITY_MAP[1].order;
  const locale = PRIORITY_MAP[1].locales[0];

  const featuredServices = servicesByLocale.map((service) => ({
    label: service,
    link: SHARE_DATA[service],
  }));

  const otherServices = Object.entries(SHARE_DATA)
    .filter(([ label ]) => !servicesByLocale.includes(label))
    .map(([ label, link ]) => ({
      label,
      link,
    }));

  const allServices = Object.entries(SHARE_DATA).map(([ label, link ]) => ({
    label,
    link,
  }));

  it('should return appropriate featured services for current locale', () => {
    const { featured } = useServicesByLocale(locale);

    expect(featured).toEqual(featuredServices);
  });

  it('should return appropriate left services for current locale', () => {
    const { other } = useServicesByLocale(locale);

    expect(other).toEqual(otherServices);
  });

  it('should throw error if type of props is incorrect', () => {
    expect(() => useServicesByLocale(null)).toThrow('Type Error: locale should be a string.');
    expect(() => useServicesByLocale('en', [])).toThrow('Type Error: servicesData should be an object.');
    expect(() => useServicesByLocale('en', null)).toThrow('Type Error: servicesData should be an object.');
    expect(() => useServicesByLocale('en', {}, null)).toThrow('Type Error: priorityMap should be an array.');
    expect(() => useServicesByLocale('en', {}, {})).toThrow('Type Error: priorityMap should be an array.');
  });

  it('should return all services as others if prioritize map is incorrect', () => {
    const priorityMap = [
      {
        locales: [ 'en' ],
        order: [ 'test' ],
      },
      {
        locales: [ 'ru' ],
        order: [ 'test' ],
      },
      {
        locales: [ 'zh' ],
        order: [ 'test' ],
      },
    ];

    const { featured, other } = useServicesByLocale(locale, undefined, priorityMap);

    expect(featured).toEqual([]);
    expect(other).toEqual(allServices);
  });

  it('should return appropriate services if priority map or services data is not provided', () => {
    const { featured, other } = useServicesByLocale(locale, undefined, undefined);

    expect(featured).toEqual(featuredServices);
    expect(other).toEqual(otherServices);
  });

  it('should return appropriate services if priority map or services data is not provided', () => {
    const { featured, other } = useServicesByLocale(locale, undefined, undefined);

    expect(featured).toEqual(featuredServices);
    expect(other).toEqual(otherServices);
  });

  it('should return no return featured services if priority map is empty', () => {
    const { featured, other } = useServicesByLocale(locale, undefined, []);

    expect(featured).toEqual([]);
    expect(other).toEqual(allServices);
  });

  it('should return no return services services data is empty', () => {
    const { featured, other } = useServicesByLocale(locale, {});

    expect(featured).toEqual([]);
    expect(other).toEqual([]);
  });

  it('should return no return featured services if locale not present in priority map', () => {
    const { featured, other } = useServicesByLocale('tu');

    expect(featured).toEqual([]);
    expect(other).toEqual(allServices);
  });
});
