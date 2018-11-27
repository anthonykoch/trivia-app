import { IResourceState, IHistoryState } from '~types'
import { IAppState } from '~/store'

export function findBy<TItem>(
  predicate: (current: TItem, accumulator: TItem | null) => boolean,
  state: IResourceState<TItem>,
): TItem | null {
  return state.allIds.reduce((accumulator: TItem | null, id) => {
    const current = state.byId[id]

    return predicate(current, accumulator) ? current : accumulator
  }, null)
}

export function getRouterState(state: IAppState): IHistoryState {
  return state.router.location.state || {} as IHistoryState
}
