
const getByID = (id) => {
  return new Promise(async (resolve, reject) => {
    const url =
      `https://api.themoviedb.org/3/movie/${id}?api_key=4feb37d31bbaf5cf95e03f4fffe4c620`;
    const options = {
      method: "GET",
      headers: {},
    };

    let data = null;

    try {
      const response = await fetch(url, options);
      const result = await response.text();
      data = await JSON.parse(result);
    } catch (error) {
      console.error(error);
    }
    resolve(data);
  });
};

export default getByID;