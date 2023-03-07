export interface IPage<T> {
    pageSize: number,
    pageCount: number,
    pagingState: string,
    content: T[]
}