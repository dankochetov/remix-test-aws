import { createClient } from '@urql/core';

const client = createClient({
	url: 'https://apiv3.bookphysio.com/graphql',
	fetchOptions: {
		headers: {
			Authorization: `Bearer ${process.env.DIRECTUS_API_TOKEN}`,
		},
	},
});

export default client;
