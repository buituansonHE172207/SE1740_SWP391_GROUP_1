export interface Sort {
	empty: boolean;
	unsorted: boolean;
	sorted: boolean;
}

export interface Pageable {
	sort: Sort;
	offset: number;
	pageNumber: number;
	pageSize: number;
	paged: boolean;
	unpaged: boolean;
}

export interface Sort {
	empty: boolean;
	unsorted: boolean;
	sorted: boolean;
}

export interface WebResponse<T> {
	content: Array<T>;
	pageable: Pageable;
	last: boolean;
	totalPages: number;
	totalElements: number;
	first: boolean;
	size: number;
	number: number;
	sort: Sort;
	numberOfElements: number;
	empty: boolean;
}