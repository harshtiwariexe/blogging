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
    return []; // Return an empty array in case of an error
  }
}

export const revalidate = 60; // Revalidate data every 60 seconds

export default async function Home() {
  const posts = await getPost();

  return (
    <div>
      <h1>Posts</h1>
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        <ul>
          {posts.map((post: any) => (
            <li key={post.slug.current}>
              <Link href={`/post/${post.slug.current}`}>
                <h2>{post.title}</h2>
                <p>{post.excerpt}</p>
              </Link>
              <div>
                {post?.tags?.map((tag: any) => (
                  <Link
                    key={tag?._id}
                    href={`/tags/${tag?.slug.current}`}
                    className="mr-2 p-1 rounded-sm text-sm lowercase dark:bg-gray-950 border dark:border-gray-900"
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
