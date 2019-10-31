interface ItemSourceObj {
  id: string,
  name: string
}

export interface ItemObject {
  author: string,
  description: string,
  priority: number,
  source: ItemSourceObj,
  title: string,
  urlToImage: string,
  content?: string,
  publishedAt?: string,
  url?: string
}

export interface StoreState {
  remoteNews: Array<ItemObject>,
  priorities: object,
  filteredPriorities: Array<string>,
  updateFilters: boolean
}
