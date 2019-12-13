import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function UpdateForm(props) {
   const {id} = props.match.params;
   const defaultMovie = {
       id: "", 
       tittle:"", 
       director:"", 
       metascore:"",
       stars:[]
    }
   const [movie, setMovie] = useState(defaultMovie);
   useEffect( () => {
     axios.get(`http://localhost:5000/api/movies/${id}`)
          .then( (res) => {
             console.log(res.data)
             setMovie(res.data)
          })
   },[id])
   console.log(id)

   const handleChange = (e) => {
       setMovie({
           ...movie, 
           [e.target.name]:e.target.value
        })
   }

   const handleStars = (e) => {
       setMovie({
          ...movie,
           stars: [e.target.value]
       })
   }

   const handleSubmit = (e) => {
       e.preventDefault();
       axios.put(`http://localhost:5000/api/movies/${id}`, movie)
            .then(res => {
               console.log(res);
               setMovie(defaultMovie);
               props.history.push("/");

            })
            .catch(error => {
               console.log(error);
            })
   }

   return (
    <div>
      <h2 className='update-title'>Update Movie Details</h2>
      <form className='update-form' onSubmit={handleSubmit}> 
       <label className='update-content'>Title: </label>
        <input className='update-content'
               type="text" 
               name="title" 
               value={movie.title} 
               onChange={handleChange}
            />

        <label className='update-content'>Director: </label>
            <input className='update-content'
                type="text" 
                name="director"
                value={movie.director}
                onChange={handleChange}
            />

        <label className='update-content'>Meta-Score: </label>
            <input className='update-content'
                type="text" 
                name="metascore" 
                value={movie.metascore} 
                onChange={handleChange}
            />   
        
        <label className='update-content'>Stars: </label>           
            <input className='update-content'
                    type='text'
                    name='stars'
                    value={movie.stars}
                    onChange={handleStars}
            />
  

        <button>Update Movie</button>        
      </form>
    </div>
   )
} 