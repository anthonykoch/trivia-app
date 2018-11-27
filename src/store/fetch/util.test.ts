import cuid from 'cuid'

import { resource, itemLoadFailed, itemLoading, itemLoaded } from '~/store/__data__'
import { getLoadableResource, createFetchReducer, IActionFetchRequest, IActionFetchFailure, IActionFetchSuccess } from '~/store/fetch/util'

describe('getLoadableResource', () => {
  it('returns a failed loadable instance when passed a failed stored status', () => {
    expect(getLoadableResource(resource, itemLoadFailed)).toMatchObject({
      data: null,
      isLoaded: false,
      isLoading: false,
      isFailed: true,
      isRequested: true,
    })
  })

  it('returns a loaded loadable instance when passed a loaded stored status', () => {
    expect(getLoadableResource(resource, itemLoaded)).toMatchObject({
      data: resource,
      isLoaded: true,
      isLoading: false,
      isFailed: false,
      isRequested: true,
    })
  })

  it('returns a failed loadable the resource is null or undefined even', () => {
    [null, undefined].forEach((value) =>
      expect(getLoadableResource(value, itemLoaded)).toMatchObject({
        data: null,
        isLoaded: false,
        isLoading: true,
        isFailed: false,
        isRequested: true,
      }),
    )
  })

  it('returns a loading loadable instance when passed a loading stored status', () => {
    expect(getLoadableResource(resource, itemLoading)).toMatchObject({
      data: null,
      isLoaded: false,
      isLoading: true,
      isFailed: false,
      isRequested: true,
    })
  })
})

describe('createFetchReducer', () => {
  const REQUEST = 'REQUEST'
  const SUCCESS = 'SUCCESS'
  const FAILURE = 'FAILURE'

  const createReducer = () => createFetchReducer({
    REQUEST,
    SUCCESS,
    FAILURE,
  })

  const id = cuid()
  const data = { id: cuid() }
  const meta = { mustard: cuid() }

  const requestAction: IActionFetchRequest<typeof REQUEST, typeof meta> = {
    id,
    type: REQUEST,
    meta,
  }

  const successAction: IActionFetchSuccess<typeof SUCCESS, typeof data> = {
    id,
    type: SUCCESS,
    data,
  }

  const failureAction: IActionFetchFailure<typeof FAILURE, {}> = {
    id,
    type: FAILURE,
    error: {},
  }

  it('initializes the status when passed a REQUEST action', () => {
    const reducer = createReducer()

    expect(reducer(undefined, requestAction)).toEqual({
      byId: {
        [id]: {
          id,
          isLoaded: false,
          isLoading: true,
          isFailed: false,
          isRequested: true,
          data: null,
          meta,
        },
      },
      allIds: [id],
    })
  })

  it('stores an the resource when passed a SUCCESS action', () => {
    const reducer = createReducer()

    expect(reducer(reducer(undefined, requestAction), successAction)).toEqual({
      byId: {
        [id]: {
          id,
          isLoaded: true,
          isLoading: false,
          isFailed: false,
          isRequested: true,
          data,
          meta,
        },
      },
      allIds: [id],
    })
  })

  it('updates a status with failure properties when passed a FAILURE action', () => {
    const reducer = createReducer()

    expect(reducer(reducer(undefined, requestAction), failureAction)).toEqual({
      byId: {
        [id]: {
          id,
          isLoaded: false,
          isLoading: false,
          isFailed: true,
          isRequested: true,
          data: null,
          meta,
        },
      },
      allIds: [id],
    })
  })
})
