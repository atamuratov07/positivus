import { deleteAsync } from 'del'

export const reset = () => {
	return deleteAsync($.path.clean)
}
