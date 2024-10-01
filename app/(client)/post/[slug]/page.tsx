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
    <div className="flex flex-col mt-10 sm:mt-16 lg:mt-20 justify-center items-center px-4 sm:px-8">
      <h1 className="text-3xl sm:text-4xl font-semibold mb-4 text-center">
        {post[0]?.title}
      </h1>

      <span className="text-xs sm:text-sm mb-2 text-gray-600">
        Published on: {new Date(post[0]?.publishedAt).toLocaleDateString()}
      </span>

      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-4">
        <h3 className="text-base sm:text-lg">Tags:</h3>
        <ul className="flex flex-wrap gap-2">
          {post[0]?.tags.map((tag: any) => (
            <li
              className="p-1 rounded-sm text-xs sm:text-sm lowercase dark:bg-gray-950 border dark:border-gray-900"
              key={tag._id}
            >
              <a href={`/tags/${tag.slug.current}`}>{tag.name}</a>
            </li>
          ))}
        </ul>
      </div>

      <div className="w-full sm:w-[600px] md:w-[800px] lg:w-[900px]">
        <PortableText value={post[0]?.body} />
      </div>
    </div>
  );
}
