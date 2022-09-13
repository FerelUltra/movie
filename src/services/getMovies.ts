export function getMovies(url: string, current: number, query: string, func:  React.Dispatch<React.SetStateAction<never[]>>){
  fetch(`${url}&language=en-US&page=${current}&include_adult=false&query=${query}`)
    .then((res) => {
      return res.json()
    })
    .then((body) => {
      console.log(body.results);
      func(body.results)
    })
}
