/**
 * Define the structure for the Sanity Studio using the Structure Builder.
 * For more information, visit: https://www.sanity.io/docs/structure-builder-cheat-sheet
 */

export const structure = (S) =>
  S.list()
    .title("Content") // Title of the content list in the Sanity Studio.
    .items([
      S.documentTypeListItem("author").title("Authors"),
      S.documentTypeListItem("startup").title("Startups"),
      S.documentTypeListItem("playlist").title("Playlists")
    ]);