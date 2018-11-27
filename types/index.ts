
export interface IHistoryState {
  quizMeta?: {
    quizId: string | null,
    fetchId: string | null,
  },
}

export interface IResourceState<TItem> {
  byId: {
    [id: string]: TItem,
  }
  allIds: string[]
}

export interface ILoadedResource<TData, TMeta> {
  id: string,
  isLoading: false
  isLoaded: true
  isFailed: false
  isRequested: true
  data: TData
  meta: TMeta
}

export interface ILoadingResource<TMeta> {
  id: string,
  isLoading: true
  isLoaded: false
  isFailed: false
  isRequested: true
  data: null
  meta: TMeta
}

export interface ILoadFailedResource<TMeta> {
  id: string,
  isLoading: false
  isLoaded: false
  isFailed: true
  isRequested: true
  data: null
  meta: TMeta
}

export interface INonRequestedResource<TMeta> {
  id: string | null,
  isLoading: false
  isLoaded: false
  isFailed: false
  isRequested: false
  data: null
  meta: TMeta | null
}

export type ILoadableResource<TData, TMeta> = ILoadedResource<TData, TMeta> | ILoadingResource<TMeta> | ILoadFailedResource<TMeta> | INonRequestedResource<TMeta>

export interface IQuizQuestion {
  category: string
  type: string
  difficulty: string
  question: string
  correct_answer: string
  incorrect_answers: string[]
}

export type IQuizAnswer = string

export interface IQuizQuestionResult {
  id: string
  question: IQuizQuestion
  answer?: IQuizAnswer
  isCorrect: boolean
}

export interface IQuizResults {
  items: IQuizQuestionResult[]
  correctAnswersAmount: number
}

export interface IQuizProgress {
  id: string
  answers: IQuizAnswer[]
  activeIndex: number
}
