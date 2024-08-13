import React from "react";
import { client } from "@/sanity/lib/client";
import Link from "next/link";

async function getAllTags() {
  const query = `
    *[_type == "tag"]{
      name,
      slug,
      _id
    }
  `;

  const tags = await client.fetch(query);
  return tags;
}

export const revalidate = 60;

export default async function TagsPage() {
  const tags: any = await getAllTags();

  return (
    <div>
      <p>Tags</p>
      <div>
        {tags?.length > 0 ? (
          tags.map((tag: any) => (
            <Link key={tag._id} href={`/tags/${tag.slug.current}`}>
              <div>#{tag.name}</div>
            </Link>
          ))
        ) : (
          <p>No tags available.</p>
        )}
      </div>
    </div>
  );
}
