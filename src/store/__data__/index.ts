import cuid from 'cuid'

import { IStoredFetchStatus, IFetchStatusesReducerState } from '~/store/fetch/util'

export interface IMeta { readonly mustard: string }
export interface IData { readonly id: string }

export const resource: Readonly<IData> = {
  id: cuid(),
}

export const itemLoaded: Readonly<IStoredFetchStatus<IData, IMeta>> = {
  id: cuid(),
  data: resource,
  meta: { mustard: cuid() },
  isLoaded: true,
  isLoading: false,
  isFailed: false,
  isRequested: true,
}

export const itemLoading: Readonly<IStoredFetchStatus<IData, IMeta>> = {
  id: cuid(),
  data: null,
  meta: { mustard: cuid() },
  isLoading: true,
  isFailed: false,
  isLoaded: false,
  isRequested: true,
}

export const itemLoadFailed: Readonly<IStoredFetchStatus<IData, IMeta>> = {
  id: cuid(),
  data: null,
  meta: { mustard: cuid() },
  isLoading: false,
  isFailed: true,
  isLoaded: false,
  isRequested: true,
}

export const fetchState: Readonly<IFetchStatusesReducerState<IData, IMeta>> = {
  byId: {
    [itemLoaded.id]: itemLoaded,
    [itemLoading.id]: itemLoading,
    [itemLoadFailed.id]: itemLoadFailed,
  },
  allIds: [
    itemLoaded.id,
    itemLoading.id,
    itemLoadFailed.id,
  ],
}
