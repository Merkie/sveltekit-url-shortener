// import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import prisma from '../../../resources/prisma';

export const POST: RequestHandler = async ({ request }) => {
	const { url } = await request.json();

	const existingShortURL = await prisma.shortURL.findFirst({
		where: {
			url
		}
	});
	if (existingShortURL) return new Response(JSON.stringify(existingShortURL));

	const shortURL = await prisma.shortURL.create({
		data: {
			url,
			shortCode: Math.random().toString(36).substr(2, 5)
		}
	});

	return new Response(JSON.stringify(shortURL));
};
