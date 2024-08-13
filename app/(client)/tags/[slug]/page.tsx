import { client } from "@/sanity/lib/client";

interface Params {
  params: {
    slug: string;
  };
}

async function getPostTag(tag: string) {
  const query = `*[_type == "post" && "${tag}" in tags[]->slug.current]{
    title,
    slug,
    excerpt,
    publishedAt
  }`;

  const posts = await client.fetch(query);
  return posts;
}

export default async function PostByTag({ params }: Params) {
  const posts: any = await getPostTag(params.slug);

  return (
    <div>
      <h1>Posts Tagged with {params.slug}</h1>
      {posts.length === 0 ? (
        <p>No posts found for this tag.</p>
      ) : (
        <ul>
          {posts.map((post: any) => (
            <li key={post.slug.current}>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
