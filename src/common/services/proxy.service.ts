import { Dictionary } from "../types/general.type";
import { getData, postData } from "./http.service";

type UrlAndProxy = {
  url: string,
  proxyUrl?: string | null,
  proxyHeader?: Dictionary | null,
}

const urlsNeedToBeProxied: { [key: string]: boolean } = {}

function getURLHash(method: string, url: string) {
  return window.btoa(method + url);
}

function post({ url = '', proxyUrl, proxyHeader }: UrlAndProxy, data = {}) {

  const urlHash = getURLHash('post', url);
  const needToBeProxied = urlsNeedToBeProxied[urlHash] || false;

  if (!needToBeProxied) {
    return postData(url, data)
      .catch(_ => {
        if (proxyUrl) {
          urlsNeedToBeProxied[urlHash] = true;
          return post({ url, proxyUrl, proxyHeader }, data);
        }
        else throw _ as Dictionary;
      })
  } else {
    return postData(proxyUrl as string, data, proxyHeader || {})
  }
}

function get({ url = '', proxyUrl, proxyHeader }: UrlAndProxy) {

  const urlHash = getURLHash('get', url);
  const needToBeProxied = urlsNeedToBeProxied[urlHash] || false;

  if (!needToBeProxied) {
    return getData(url)
      .catch(_ => {
        if (proxyUrl) {
          urlsNeedToBeProxied[urlHash] = true;
          return get({ url, proxyUrl, proxyHeader });
        }
        else throw _ as Dictionary;
      })
  } else {
    return getData(proxyUrl as string, proxyHeader || {})
  }
}

export default {
  post, get,
}

