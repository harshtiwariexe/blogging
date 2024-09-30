import React from "react";
import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";

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
      body,
      tags[]->{
        _id,
        slug,
        name
      },
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
    <div className="flex flex-col mt-20 justify-center items-center">
      <h1 className="text-4xl font-semibold mb-4">{post[0]?.title}</h1>

      <span className="text-xs mb-2">
        {" "}
        Published on: {new Date(post[0].publishedAt).toLocaleDateString()}
      </span>
      <div className="flex flex-row gap-2">
        <h3>Tags:</h3>
        <ul className="flex flex-row gap-3">
          {post[0]?.tags.map((tag: any) => (
            <li
              className="mr-2 mb-3 p-1 rounded-sm text-xs lowercase dark:bg-gray-950 border dark:border-gray-900"
              key={tag._id}
            >
              <a href={`/tags/${tag.slug.current}`}>{tag.name}</a>
            </li>
          ))}
        </ul>
      </div>

      <div className="w-[900px]">
        <PortableText value={post[0]?.body} />
      </div>
    </div>
  );
}
