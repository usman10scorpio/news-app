import moment from "moment";

export const header = (category) => `${category} Headlines`;
export const getNewsChannel = (channel) => `${channel}`;
export const formatLastUpdate = (published) =>`${moment(published).format("ddd, DD MMM YYYY HH:mm:ss")}`;

export const sources = [
  {
    name: "All Data Sources",
    key: "all",
  },
  {
    name: "News API",
    key: "news-api",
  },
  {
    name: "The Guardian API",
    key: "guardian-api",
  },
  {
    name: "New Yourk Times API",
    key: "ny-times",
  }
];

export const newsCategories = ['general', 'business', 'entertainment', 'sports', 'technology'];

export const capitalizeString = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};
