import { useLoaderData } from '@remix-run/react';
import ReactMarkdown from 'react-markdown';
import { DataFunctionArgs } from '@remix-run/node';

import { gql } from '@app/gql';
import client from '~/graphql/client';
import { PromiseOf } from '~/types/helpers';

const query = gql(`#graphql
	query Article($slug: String!) {
		articles(filter: { slug: { _eq: $slug } }) {
			heading
			sub_heading
			content
			image {
				location
				filename_download
			}
		}
	}
`);

export const loader = async ({ params }: DataFunctionArgs) => {
	const { data } = await client
		.query(query, {
			slug: `/${params['*']}`,
		})
		.toPromise();

	const result = data?.articles?.[0];

	if (!result) {
		throw new Error('Article not found');
	}

	return result;
};

export default function Index() {
	const data = useLoaderData<PromiseOf<ReturnType<typeof loader>>>();

	return (
		<div>
			<h1>{data.heading}</h1>
			<h2>{data.sub_heading}</h2>
			<img
				src={data.image!.location!}
				alt={data.image!.filename_download}
			/>
			<ReactMarkdown>{data.content!}</ReactMarkdown>
		</div>
	);
}
