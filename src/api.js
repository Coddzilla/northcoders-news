import axios from "axios";

const BASE_URL = "https://nc-news-final.herokuapp.com/api";

export const getTopics = async () => {
  const { data } = await axios.get(`${BASE_URL}/topics`);

  return data.topics;
};
export const getArticles = async (sort_by, props, page) => {
  if (props.topic && sort_by === "") {
    const { data } = await axios.get(
      `${BASE_URL}/topics/${props.topic}/articles`,
      {
        params: {
          p: page
        }
      }
    );

    return data.articles;
  } else if (props.topic && sort_by !== "") {
    const { data } = await axios.get(
      `${BASE_URL}/topics/${props.topic}/articles`,
      {
        params: {
          p: page,
          sort_by: sort_by
        }
      }
    );

    return data.articles;
  } else if (props.view === "all" && sort_by === "") {
    const { data } = await axios.get(`${BASE_URL}/articles`, {
      params: {
        p: page
      }
    });

    return data.articles;
  } else if (props.view === "all" && sort_by !== "") {
    const { data } = await axios.get(`${BASE_URL}/articles`, {
      params: {
        p: page,
        sort_by: sort_by
      }
    });

    return data.articles;
  } else if (props.view === "home") {
    console.log("line 52");
    const { data } = await axios.get(`${BASE_URL}/articles`, {
      params: {
        p: 1,
        sort_by: "votes",
        order: "desc",
        limit: 3
      }
    });

    return data.articles;
  }
};

export const fetchUser = async username => {
  const { data } = await axios.get(`${BASE_URL}/users/${username}`);

  return data.user;
};

export const getArticle = async article_id => {
  const { data } = await axios.get(`${BASE_URL}/articles/${article_id}`);

  return data.article;
};

export const getUserArticles = async username => {
  const { data } = await axios.get(`${BASE_URL}/users/${username}/articles`);

  return data.articles;
};

export const vote = async (article_id, comment_id, direction, type) => {
  if (type === "article") {
    await axios.patch(`${BASE_URL}/articles/${article_id}`, {
      inc_votes: direction
    });
  } else if (type === "comment") {
    await axios.patch(
      `${BASE_URL}/articles/${article_id}/comments/${comment_id}`,
      {
        inc_votes: direction
      }
    );
  }
};

export const getViewComments = async article_id => {
  const url = `${BASE_URL}/articles/${article_id}/comments?order=desc`;

  const { data } = await axios.get(url);
  return data.comments;
};

export const patchComments = async (fullComment, article_id) => {
  await axios.patch(`${BASE_URL}/articles/${article_id}/comments`, {
    fullComment
  });
};

export const postArticle = async (title, body, username, topic) => {
  const { data } = await axios.post(`${BASE_URL}/topics/${topic}/articles`, {
    title,
    body,
    username
  });

  return data;
};

export const deleteCommentById = async (article_id, comment_id) => {
  await axios.delete(
    `${BASE_URL}/articles/${article_id}/comments/${comment_id}`
  );
};

export const deleteArticleById = async article_id => {
  return axios.delete(`${BASE_URL}/articles/${article_id}`);
};

export const addComment = async (article_id, commentData, username) => {
  const comment = { username, body: commentData };

  const { data } = await axios.post(
    `${BASE_URL}/articles/${article_id}/comments`,

    comment
  );
  console.log(data);
  return data.comment;
};

export const addTopic = async newTopic => {
  const { data } = await axios.post(`${BASE_URL}/topics`, {
    slug: newTopic,
    description: "This is a new Topic"
  });

  return data;
};

export const getUsers = async () => {
  const { data } = await axios.get(`${BASE_URL}/users`);
  return data.users;
};

export const addUser = async (username, avatar_url, name) => {
  const { data } = await axios.post(`${BASE_URL}/users`, {
    user: {
      username,
      name,
      avatar_url
    }
  });
  return data.user;
};
