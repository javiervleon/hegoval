const domain = import.meta.env.WP_DOMAIN || "http://localhost:8881";
const apiUrl = `${domain}/wp-json/wp/v2/`;

export const getPageInfo = async (slug: string) => {
  const res = await fetch(`${apiUrl}pages?slug=${slug}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch page info for slug: ${slug}`);
  }
  const data = await res.json();
  console.log(data);

  return data;
};
