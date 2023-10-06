import _ from 'lodash'
export const paginationRange = (totalPage, page, limit, siblings) => {
    let totalPageNoInArray = 7 + siblings
    if (totalPageNoInArray >= totalPage) {
        return _.range(1, totalPage + 1)
    }
    let leftSiblingIndex = Math.max(page - siblings, 1)
    let showLeftDots = leftSiblingIndex > 2

    let rightSiblingIndex = Math.min(page + siblings, totalPage)
    let showRightDots = rightSiblingIndex < totalPage - 2

    if (!showLeftDots && showRightDots) {
        let leftItemsCount = 3 + 2 * siblings;
        let leftRange = _.range(1, leftItemsCount + 1)
        return [...leftRange, '...', totalPage]
    }
    else if (!showRightDots && showLeftDots) {
        let rightItemsCount = 3 + 2 * siblings;
        let rightRange = _.range(totalPage - rightItemsCount + 1, totalPage+1)
        return [1, '...', ...rightRange]
    }
    else{
        let middleRange = _.range(leftSiblingIndex, rightSiblingIndex + 1)
        return [1, '...', ...middleRange, '...', totalPage]
    }
}