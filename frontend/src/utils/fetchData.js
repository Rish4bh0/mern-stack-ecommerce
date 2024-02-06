export const exerciseOptions =  {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '40aa26a0a9msh920dc754ab1d748p1dcf0djsn32953f7797cf',
      'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
    }
  };
  
  export const youtubeOptions = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'b51b23820amshf9bcf39e47d7b4dp1732f4jsnc849a2cd8462',
      'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com',
    },
  };
  
  export const fetchData = async (url, options) => {
    const res = await fetch(url, options);
    const data = await res.json();
  
    return data;
  };
  