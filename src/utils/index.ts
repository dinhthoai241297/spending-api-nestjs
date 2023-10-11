export const paginationData = (page: number, size: number): { skip: number, take: number } => {
    return {
        skip: page * size,
        take: size,
    }
}