import { createClient } from 'contentful';

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID as string,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN as string,
});

export const getServices = async () => {
  const response = await client.getEntries({ content_type: 'services' });
  return response.items;
};
