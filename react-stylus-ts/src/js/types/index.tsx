interface IItemSourceObj {
  id: string,
  name: string
}

export interface IItemObject {
  author: string,
  description: string,
  priority: number,
  source: IItemSourceObj,
  title: string,
  urlToImage: string,
  content?: string,
  publishedAt?: string,
  url?: string
}

export interface IStoreState {
  remoteNews: IItemObject[],
  priorities: object,
  filteredPriorities: string[],
  updateFilters: boolean
}
