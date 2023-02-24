export interface IPage<T> {
    pageSize: number,
    pagingState: string,
    content: T[]
}