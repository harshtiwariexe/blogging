import React from "react";
import { client } from "@/sanity/lib/client";

interface Params {
  params: { slug: string };
}

async function getPost(slug: string) {
  const query = `
      *[_type=="post" && slug.current == $slug]{
        title,
        slug,
        publishedAt,
        excerpt,
        tags[]->{
          _id,
          slug,
          name
        }
      }
    `;

  const data = await client.fetch(query, { slug });
  return data;
}

export default async function Post({ params }: Params) {
  const post: any = await getPost(params?.slug);

  if (!post || post.length === 0) {
    return <div>Post not found</div>;
  }

  return (
    <div>
      <h1>{post[0]?.title}</h1>

      {/* Render post details like excerpt or publishedAt here */}

      {/* Render tags */}
      <div>
        <h3>Tags:</h3>
        <ul>
          {post[0]?.tags.map((tag: any) => (
            <li key={tag._id}>
              <a href={`/tags/${tag.slug.current}`}>{tag.name}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
