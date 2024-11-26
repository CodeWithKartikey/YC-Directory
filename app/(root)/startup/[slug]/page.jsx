import React, { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import View from '@/components/View';
import StartUpCard from '@/components/StartUpCard';
import { Skeleton } from '@/components/ui/skeleton';

import { formatDate } from '@/lib/utils';

import { client } from '@/sanity/lib/client';
import { PLAYLIST_QUERY_BY_SLUG, STARTUP_QUERY_BY_SLUG } from '@/sanity/lib/queries';

import MarkdownIt from 'markdown-it';
const markdown = MarkdownIt();

export const experimental_ppr = true;

const page = async ({ params }) => {

  const slug = (await params).slug;

  const [post, { select: editorPosts}] = await Promise.all([
    await client.fetch(STARTUP_QUERY_BY_SLUG, { slug }),
    await client.fetch(PLAYLIST_QUERY_BY_SLUG, { slug: "editor-pick"})
  ]);

  if(!post) return notFound();

  const parsedContent = markdown.render(post?.pitch || "");

  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <p className="tag">{formatDate(post?._createdAt)}</p>
        <h1 className="heading">{post?.title}</h1>
        <p className="sub-heading !max-w-5xl">{post?.description}</p>
      </section>

      <section className="section_container">
        <img 
          src={post?.image} 
          alt={`${post?.title} Picture`} 
          className="w-full h-auto rounded-xl" 
        />
        <div className=" space-y-5 max-w-4xl mx-auto mt-10">
          <div className="gap-5 flex-between">
            <Link 
              href={`/user/${post?.author?._id}`} 
              className="gap-2 flex items-center mb-3"
            >  
              <Image
                src={post?.author?.image}
                alt={`${post?.author?.image} Image`}
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg"
              />

              <div>
                <p className="text-20-medium">{post?.author?.name}</p>
                <p className="text-16-medium !text-black-300">@{post?.author?.username}</p>
              </div>
            </Link>

            <p className="category-tag">{post?.category}</p>
          </div>

          <h3 className="text-30-bold">Pitch Details</h3>
          {
            parsedContent
            ?
            <article 
              className="font-work-sans prose max-w-4xl break-all"
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
            :
            <p className="no-result">No details provided.</p>
          }
        </div>
        <hr className="divider" />

        <Suspense fallback={<p className="text-14-normal text-center text-black">Loading the startups ...</p>}>
          {
            editorPosts?.length > 0 && (
              <div className="max-w-4xl mx-auto">
                <p className="text-30-semibold">Editor's Pick</p>

                <ul className="card_grid-sm mt-7">
                  {
                    editorPosts.map((editorPost) => (
                      <StartUpCard key={editorPost?.category} post={editorPost} />
                    ))
                  }
                </ul>
              </div>
            )
          }
        </Suspense>

        <Suspense fallback={<Skeleton className="view_skeleton" />}>
          <View slug={slug} />
        </Suspense>
      </section>
    </>
  );
};

export default page;