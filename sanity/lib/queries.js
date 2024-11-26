import { defineQuery } from "next-sanity";

export const STARTUP_QUERY = defineQuery(`*[ _type == "startup" && defined(slug.current) && !defined($search) || title match $search || category match $search || author -> name match $search ] | order(_createdAt desc){
  _id,
  title,
  slug,
  author -> {
    _id,
    name,
    username,
    email,
    image,
    bio
  },
  views,
  description,
  category,
  image,
  _createdAt
}`);

export const STARTUP_QUERY_BY_SLUG = defineQuery(`*[ _type == "startup" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  author -> {
    _id,
    name,
    username,
    email,
    image,
    bio
  },
  views,
  description,
  category,
  image,
  pitch,
  _createdAt
}`);

export const STARTUP_VIEW = defineQuery(`*[ _type == "startup" && slug.current == $slug][0]{
  _id,
  views
}`);

export const AUTHOR_QUERY_BY_GITHUB_ID = defineQuery(`*[ _type == "author" && id == $id][0]{
  _id,
  id,
  name,
  username,
  email,
  image,
  bio
}`);

export const AUTHOR_QUERY_BY_ID = defineQuery(`*[ _type == "author" && _id == $id][0]{
  _id,
  id,
  name,
  username,
  email,
  image,
  bio
}`);

export const STARTUP_BY_AUTHOR = defineQuery(`*[ _type == "startup" && author._ref == $id] | order(_createdAt desc){
  _id,
  title,
  slug,
  author -> {
    _id,
    name,
    username,
    email,
    image,
    bio
  },
  views,
  description,
  category,
  image,
  pitch,
  _createdAt
}`);

export const PLAYLIST_QUERY_BY_SLUG = defineQuery(`*[ _type == "playlist" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  select[] -> {
    author -> {
      _id,
      name,
      username,
      email,
      image,
      bio
    },
    views,
    description,
    category,
    image,
    pitch,
    _createdAt
  }
}`);