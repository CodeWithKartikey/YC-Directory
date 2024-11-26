import React from 'react';

import Link from 'next/link';
import Image from 'next/image';

import { Button } from './ui/button';
import { EyeIcon } from 'lucide-react';

import { formatDate } from '@/lib/utils';

const StartUpCard = ({ post }) => {
  return (
    <li className="startup-card group">
      <div className="flex-between">
        <p>{formatDate(post?._createdAt)}</p>
        <div className="gap-1.5 flex">
          <EyeIcon className="size-6 text-primary" />
          <span className="text-16-medium">{post?.views}</span>
        </div>
      </div>

      <div className="gap-5 flex-between mt-5">
        <div className="flex-1">
          <Link href={`/user/${post?.author?._id}`}>
            <p className="text-16-medium line-clamp-1">{post?.author?.name}</p>
          </Link>
          <Link href={`/startup/${post?.slug?.current}`}>
            <h3 className="text-26-semibold line-clamp-1">{post?.title}</h3>
          </Link>
        </div>
        <Link href={`/user/${post?.author?._id}`}>
          <Image 
            src={post?.author?.image}
            alt={`${post?.author?.image} image`}
            width={40} 
            height={40} 
            className="rounded-full"
            priority 
          />
        </Link>
      </div>

      <Link href={`/startup/${post?.slug?.current}`}>
        <p className="startup-card_desc">{post?.description}</p>
        <img
          src={post?.image}
          alt={`${post?.title} image`}
          className="startup-card_img"
        />
      </Link>

      <div className="gap-5 flex-between mt-5">
        <Link href={`?query=${post?.category?.toLowerCase()}`}>
          <p className="text-16-medium">{post?.category}</p>
        </Link>
        <Button className="startup-card_btn" asChild>
          <Link href={`/startup/${post?.slug?.current}`}>
            Details
          </Link>
        </Button>
      </div>
    </li>
  );
};

export default StartUpCard;