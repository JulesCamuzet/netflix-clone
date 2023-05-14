const makeSearch = (input) => {
  return new Promise(async (resolve, reject) => {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=4feb37d31bbaf5cf95e03f4fffe4c620&query=${input}`;
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

export default makeSearch;
