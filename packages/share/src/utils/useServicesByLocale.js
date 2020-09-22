import { PRIORITY_MAP, SHARE_DATA } from './data';

const useServicesByLocale = (
  locale = 'en',
  servicesData = SHARE_DATA,
  _priorityMap = PRIORITY_MAP,
) => {
  if (typeof locale !== 'string') throw new Error('Type Error: locale should be a string.');
  if (!(servicesData instanceof Object && !(servicesData instanceof Array)) && typeof servicesData !== 'undefined') throw new Error('Type Error: servicesData should be an object.');
  if (!(_priorityMap instanceof Array) && typeof _priorityMap !== 'undefined') throw new Error('Type Error: priorityMap should be an array.');

  const featured = [];
  const priorityMap = _priorityMap || PRIORITY_MAP;
  const allServices = Object.entries(servicesData || SHARE_DATA);
  const servicesByLocale = priorityMap.find((item) => item.locales.indexOf(locale) >= 0);

  const featuredServices = servicesByLocale?.order || [];

  for (let i = 0; i < featuredServices.length; i++) {
    const featuredService = allServices.find(([ service ]) => service === featuredServices[i]);

    if (featuredService) {
      const [ label, link ] = featuredService;

      featured.push(({
        label,
        link,
      }));
    }
  }


  return {
    featured,
    other: allServices
      .map(([ label, link ]) => ({
        label,
        link,
      }))
      .filter((service) =>
        !featuredServices.includes(service.label)),
  };
};

export default useServicesByLocale;
