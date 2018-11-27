import { createLoadingResource, createLoadedResource, createLoadFailedResource } from '~/util'

test('createLoadedResource', () => {
  const status  = { id: '1', meta: { looney: 'tunes' } }
  const data = { daffy: 'duck' }

  expect(createLoadedResource(status, data)).toEqual({
    ...status,
    data,
    isLoading: false,
    isLoaded: true,
    isFailed: false,
    isRequested: true,
  })
})

test('createLoadingResource', () => {
  const status  = { id: '1', meta: { looney: 'tunes' } }

  expect(createLoadingResource(status)).toEqual({
    ...status,
    data: null,
    isLoading: true,
    isLoaded: false,
    isFailed: false,
    isRequested: true,
  })
})

test('createLoadFailedResource', () => {
  const status  = { id: '1', meta: { looney: 'tunes' } }

  expect(createLoadFailedResource(status)).toEqual({
    ...status,
    data: null,
    isLoading: false,
    isLoaded: false,
    isFailed: true,
    isRequested: true,
  })
})
