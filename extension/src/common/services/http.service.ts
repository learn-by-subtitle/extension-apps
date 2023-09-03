import { Dictionary } from "../types/general.type";

type requestMode = 'no-cors' | 'same-origin'

export function postData(url = '', data = {}, header = {}, mode?:requestMode) {
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...header
    },
    mode,
    body: JSON.stringify(data)
  })
    .then((res) => {
      if (res.status == 200) return res.json() as Promise<Dictionary>;
      else throw res as Dictionary;
    });
}

export function getData(url = '', header = {}, mode?:requestMode) {
  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...header
    },
    mode,
  })
    .then((res) => {
      if (res.status == 200) return res.json() as Promise<Dictionary>;
      else throw res as Dictionary;
    })
}

