const ANILIST_API_URL = "https://graphql.anilist.co";

const GET_USER_MEDIA_LIST = `
query ($userName: String, $type: MediaType) {
  MediaListCollection(userName: $userName, type: $type) {
    lists {
      name
      entries {
        id
        status
        score
        progress
        media {
          id
          title {
            romaji
            english
            native
          }
          coverImage {
            large
            extraLarge
          }
          bannerImage
          siteUrl
          status
          averageScore
          genres
          episodes
          chapters
          description
          format
          season
          seasonYear
        }
      }
    }
    user {
      id
      name
      avatar {
        large
        medium
      }
      bannerImage
    }
  }
}
`;

export const fetchAnilistData = async (userName, type = "ANIME") => {
    try {
        const response = await fetch(ANILIST_API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify({
                query: GET_USER_MEDIA_LIST,
                variables: {
                    userName,
                    type,
                },
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.errors ? data.errors[0].message : "Network response was not ok");
        }

        return data.data.MediaListCollection;
    } catch (error) {
        console.error("Error fetching AniList data:", error);
        return null;
    }
};
