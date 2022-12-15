import type { PageLoad } from '../$types';
import prisma from '../../../resources/prisma';

export const load: PageLoad = async ({ params }) => {
	const shortURL = await prisma.shortURL.findFirst({
		where: {
			shortCode: (params as unknown as { slug: string }).slug
		}
	});
	if (!shortURL) {
		return {
			url: '/404'
		};
	}
	return {
		url: shortURL.url
	};
};
