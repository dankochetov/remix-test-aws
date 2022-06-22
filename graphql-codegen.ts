import { generate } from '@graphql-codegen/cli';
import 'dotenv/config';

async function main() {
	generate({
		schema: [
			{
				'https://apiv3.bookphysio.com/graphql': {
					method: 'GET',
					headers: {
						Authorization: `Bearer ${process.env.DIRECTUS_API_TOKEN}`,
					},
				},
			},
		],
		documents: ['app/**/*.{ts,tsx}', '!app/graphql/generated/**/*'],
		generates: {
			'app/graphql/generated': {
				preset: 'gql-tag-operations-preset',
				plugins: [],
			},
			'app/graphql/generated/schema.graphql': {
				plugins: ['schema-ast'],
			},
		},
	});
}

main().catch((error) => {
	console.error(error);
	process.exit(1);
});
