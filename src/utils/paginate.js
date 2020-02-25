import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
	const startIndex = (pageNumber - 1) * pageSize;
	// _.slice(items, startIndex);
	// _(items) this will return a loadash object in order to change those methods
	return _(items).slice(startIndex).take(pageSize).value();
}