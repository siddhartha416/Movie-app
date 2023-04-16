const ApiURL = 'https://imdb8.p.rapidapi.com/auto-complete?q=avengers'; 
 const formEle = document.getElementById('form'); 
 const serachEle = document.getElementById('search'); 
 const container = document.querySelector('.container'); 
  
 formEle.addEventListener('submit', (e) =>{ 
     e.preventDefault(); 
     const searchText = serachEle.value; 
     searchFeed(searchText); 
     serachEle.value = ''; 
 }) 
  
 const searchFeed = (search) => { 
     if (search === ''){ 
         serchMovies(ApiURL); 
     } 
     else{ 
         const url = `https://imdb8.p.rapidapi.com/auto-complete?q=${search}` 
         serchMovies(url); 
     } 
      
 } 
  
  
 const serchMovies = (url) =>{ 
     fetch(url, { 
         method: 'GET', 
         headers: { 
             'X-RapidAPI-Key': 'b601391174msheac1bc7f8df2c5fp1dffdejsn045112e2fab0', 
             'X-RapidAPI-Host': 'imdb8.p.rapidapi.com' 
         } 
     }) 
     .then(response => response.json())         
     .then(response => { 
         const main = document.querySelector('main'); 
         while(main.firstChild){ 
             main.removeChild(main.firstChild); 
         } 
         const movies = response.d; 
         movies.map((eachMovie)=>{ 
             const imgUrl = eachMovie.i.imageUrl; 
             const title = eachMovie.l; 
             const description = eachMovie.s; 
             const content = ` 
              <h1> ${serachEle.value}</h1> 
             <section class="each-movie"> 
                 <div class="container"> 
                    <img src="${imgUrl}" alt=""> 
                      <div class="content"> 
                     <h2>${title}</h2> 
                     <p>${description}</p> 
                     </div> 
                 </div> 
             </sectio>` 
             document.querySelector('main').innerHTML += content; 
         }) 
     }) 
    .catch(err => console.error(err)); 
 } 
  
 serchMovies(ApiURL);
