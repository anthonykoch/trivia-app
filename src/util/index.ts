import { AllHtmlEntities } from 'html-entities'

import { ILoadFailedResource, ILoadedResource, ILoadingResource, INonRequestedResource } from '~types'

export const entities = new AllHtmlEntities()

export interface IStatus<TMeta> {
  id: string
  meta: TMeta,
}

export function createLoadingResource<TMeta>(
  status: IStatus<TMeta>,
): ILoadingResource<TMeta>  {
  return {
    id: status.id,
    isLoading: true,
    isLoaded: false,
    isFailed: false,
    data: null,
    isRequested: true,
    meta: status.meta,
  }
}

export function createLoadedResource<TLoadedData, TMeta>(
  status: IStatus<TMeta>,
  data: TLoadedData,
): ILoadedResource<TLoadedData, TMeta>  {
  return {
    id: status.id,
    isLoading: false,
    isLoaded: true,
    isFailed: false,
    isRequested: true,
    data,
    meta: status.meta,
  }
}

export function createLoadFailedResource<TMeta>(
  status: IStatus<TMeta>,
): ILoadFailedResource<TMeta>  {
  return {
    id: status.id,
    isLoading: false,
    isLoaded: false,
    isFailed: true,
    isRequested: true,
    data: null,
    meta: status.meta,
  }
}

export function createNonRequestedResource<TMeta>(
  status?: IStatus<TMeta> | null,
): INonRequestedResource<TMeta>  {
  return {
    id: status == null ? null : status.id,
    isLoading: false,
    isLoaded: false,
    isFailed: false,
    isRequested: false,
    data: null,
    meta: status == null ? null : status.meta,
  }
}
