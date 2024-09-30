import { client } from "@/sanity/lib/client";
import Link from "next/link";

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
    <div className="m-10">
      <h1 className="text-4xl font-bold mb-6">
        Posts Tagged with &quot;{params.slug}&quot;
      </h1>

      {posts.length === 0 ? (
        <p className="text-gray-600">No posts found for this tag.</p>
      ) : (
        <ul className="space-y-6">
          {posts.map((post: any) => (
            <li key={post.slug.current} className="border-b pb-4">
              <Link href={`/post/${post.slug.current}`}>
                <h2 className="text-xl font-semibold hover:underline cursor-pointer transition duration-200">
                  {post.title}
                </h2>
              </Link>
              <p className="text-gray-700 mt-2">{post.excerpt}</p>
              <span className="text-sm text-gray-500 mt-1 block">
                Published on: {new Date(post.publishedAt).toLocaleDateString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
