// @flow
import { observable, computed, action, runInAction, toJS } from 'mobx';

type LoadItemsFn<T, Filters> = ({|
  page: number,
  countPerPage: number,
  searchFilters?: Filters,
|}) => Promise<{|
  count: number,
  items: T[],
|}>;

type ViewFn<T, R> = (T) => R;

export class PaginatedList<T, View, Filters> {
  countPerPage: number;
  load: LoadItemsFn<T, Filters>;
  view: ViewFn<T, View>;

  @observable
  currentPageNumber: number = 1;

  @observable
  totalItemsCount: number = 0;

  @observable
  itemsByPage: Map<number, T[]> = new Map();

  @observable
  loadingPages: Map<number, boolean> = new Map();

  @computed
  get currentPageItems(): View[] {
    return (toJS(this.itemsByPage.get(this.currentPageNumber)) || []).map(
      this.view,
    );
  }

  @computed
  get totalPagesCount(): number {
    return Math.ceil(this.totalItemsCount / this.countPerPage) || 1;
  }

  @computed
  get isCurrentPageLoading(): boolean {
    return this.loadingPages.get(this.currentPageNumber) || false;
  }

  constructor(options: {|
    countPerPage: number,
    load: LoadItemsFn<T, Filters>,
    view: ViewFn<T, View>,
  |}) {
    this.countPerPage = options.countPerPage;
    this.load = options.load;
    this.view = options.view;
  }

  @action
  reset = () => {
    this.currentPageNumber = 1;
    this.totalItemsCount = 0;
    this.itemsByPage = new Map();
  };

  @action
  setPage = (pageNumber: number) => {
    this.currentPageNumber = pageNumber;
  };

  async loadPage(pageNumber: number, searchFilters?: Filters) {
    runInAction(() => {
      this.loadingPages.set(pageNumber, true);
    });

    const { count, items } = await this.load({
      page: pageNumber,
      countPerPage: this.countPerPage,
      searchFilters,
    });

    runInAction(() => {
      this.totalItemsCount = count;
      this.itemsByPage.set(pageNumber, items);
      this.loadingPages.delete(pageNumber);
    });
  }
}
