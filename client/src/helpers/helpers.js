export const image = (user) =>
  user?.image
    ? user.image.replace("images", "http://localhost:3000")
    : "https://placehold.jp/150x150.png";

export const getQueryParam = (param) =>
  new URLSearchParams(document.location.search).get(param);
