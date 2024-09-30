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
    <div className="flex flex-col justify-center items-center m-10 ">
      <h1 className="text-2xl font-bold flex justify-start">Posts</h1>
      {posts.length === 0 ? (
        <p>No posts available.</p>
      ) : (
        <ul className="w-[900px] mt-8">
          {posts.map((post: any) => (
            <li className="m-5" key={post.slug.current}>
              <Link href={`/post/${post.slug.current}`}>
                <h2 className="text-xl mt-3 mb-3 font-semibold">
                  {post.title}
                </h2>
                <p>{post.excerpt}</p>
              </Link>
              <div>
                {post?.tags?.map((tag: any) => (
                  <Link
                    key={tag?._id}
                    href={`/tags/${tag?.slug.current}`}
                    className="mr-2 p-1 rounded-sm text-xs lowercase dark:bg-gray-950 border dark:border-gray-900"
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
