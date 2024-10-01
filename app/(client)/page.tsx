import React from "react";
import { client } from "@/sanity/lib/client";
import Link from "next/link";

async function getPost() {
  const query = `
      *[_type=="post"]{
        title,
        slug,
        publishedAt,
        excerpt,
        body,
        tags[]->{
          _id,
          slug,
          name
        }
      }
    `;

  try {
    const data = await client.fetch(query);
    return data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export const revalidate = 60;

export default async function Home() {
  const posts = await getPost();

  return (
    <div className="flex flex-col justify-center items-center px-4 sm:px-8 lg:px-16 py-10">
      <h1 className="text-3xl font-bold mb-6 self-start">Posts</h1>

      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        <ul className="w-full max-w-3xl mt-6">
          {posts.map((post: any) => (
            <li className="mb-8" key={post.slug.current}>
              <Link href={`/post/${post.slug.current}`}>
                <h2 className="text-xl sm:text-2xl mt-3 mb-2 font-semibold hover:underline cursor-pointer">
                  {post.title}
                </h2>
                <p className="text-gray-700">{post.excerpt}</p>
              </Link>
              <div className="mt-2 flex flex-wrap gap-2">
                {post?.tags?.map((tag: any) => (
                  <Link
                    key={tag?._id}
                    href={`/tags/${tag?.slug.current}`}
                    className="p-1 rounded-sm text-xs sm:text-sm lowercase dark:bg-gray-950 border dark:border-gray-900"
                  >
                    #{tag?.name}
                  </Link>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
