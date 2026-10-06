import { site } from '../config/site';

export const pageTitle = (t: string) => (`${t} | ${site.name}`.length <= 60 ? `${t} | ${site.name}` : t);
