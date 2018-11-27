
import produce from 'immer'
import cuid from 'cuid'

import { ILoadingResource, ILoadFailedResource, ILoadedResource, IResourceState, ILoadableResource } from '~types'
import { createLoadingResource, createLoadFailedResource, createLoadedResource, createNonRequestedResource } from '~/util'

export type IFetchFailureError = object

export interface IActionFetchRequest<TActionType, TMeta> {
  type: TActionType,
  id: string,
  meta: TMeta,
}

export interface IActionFetchSuccess<TActionType, TData> {
  type: TActionType,
  id: string,
  data: TData,
}

export interface IActionFetchFailure<TActionType, TError = IFetchFailureError> {
  type: TActionType,
  id: string,
  error: TError,
}

export type IStoredFetchStatus<LoadedData, Meta> = ILoadingResource<Meta> | ILoadFailedResource<Meta> | ILoadedResource<LoadedData, Meta>

export interface IFetchStatusesById<LoadedData, Meta> {
  [id: string]: IStoredFetchStatus<LoadedData, Meta>
}

export interface IFetchStatusesReducerState<LoadedData, Meta> extends IResourceState<IStoredFetchStatus<LoadedData, Meta>> {}

export function getLoadableResource<TData, TMeta, TResource>(
  resource: TResource,
  fetchStatus: IStoredFetchStatus<TData, TMeta>,
): ILoadableResource<TResource, TMeta> {
  if (fetchStatus == null) {
    return createNonRequestedResource()
  }

  const status = {
    meta: fetchStatus.meta,
    id: cuid(),
  }

  if (fetchStatus.isLoading) {
    return createLoadingResource(status)
  } else if (fetchStatus.isFailed) {
    return createLoadFailedResource(status)
  }

  if (fetchStatus.isLoaded && resource == null) {
    // The fetch has completed, but the resource hasn't been created in its own state,
    // so this is still technically considered loading
    return createLoadingResource(status)
  }

  return createLoadedResource(status, resource)
}

export function createFetchReducer<LoadedData, Meta>(types: {
  REQUEST: string,
  SUCCESS: string,
  FAILURE: string,
}) {
  return function fetchReducer(
    state: IFetchStatusesReducerState<LoadedData, Meta> = {
      allIds: [],
      byId: {},
    },
    action,
  ): IFetchStatusesReducerState<LoadedData, Meta> {
    return produce(state, (draft) => {
      switch (action.type) {
        case types.REQUEST: {
          draft.byId[action.id] = {
            id: action.id,
            isLoaded: false,
            isLoading: true,
            isFailed: false,
            isRequested: true,
            data: null,
            meta: action.meta,
          }

          draft.allIds.push(action.id)

          return
        }

        case types.FAILURE: {
          const status = draft.byId[action.id]

          status.isLoading = false
          status.isFailed = true

          return
        }

        case types.SUCCESS: {
          const status = draft.byId[action.id]

          status.data = action.data
          status.isLoaded = true
          status.isLoading = false
          status.isFailed = false

          return
        }
      }
    })
  }
}
