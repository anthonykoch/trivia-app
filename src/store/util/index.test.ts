import * as util from '~/store/util'
import { fetchState, itemLoadFailed, itemLoaded, itemLoading } from '~/store/__data__'

describe('findBy', () => {
  it('finds a fetch status by id', () => {
    expect(util.findBy((current) => current.id === itemLoaded.id, fetchState)).toEqual(itemLoaded)
    expect(util.findBy((current) => current.id === itemLoading.id, fetchState)).toEqual(itemLoading)
    expect(util.findBy((current) => current.id === itemLoadFailed.id, fetchState)).toEqual(itemLoadFailed)
  })
})
