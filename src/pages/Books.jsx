import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Books = () => {


    const [books,setBooks] = useState([])
    const bookLink = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhONH6ckVAbfXY5DRlQ2LER0kM-luEG8U1cw&usqp=CAU"
    

    useEffect(()=>{
    const fetchAllBooks = async ()=>{
        try{
            const res = await axios.get("http://localhost:8800/books")
            setBooks(res.data)
            // console.log(res);
        }
        catch(err){
            console.log(err);
        }
    }
    fetchAllBooks()
    },[])

    const handleDelete = async (id)=>{
        try{
            await axios.delete("http://localhost:8800/books/"+id)
            window.location.reload()
        }
        catch(err){
            console.log(err);
        }}

    
      
    return ( 
        <div>   
           <h1 className="heading">Book Shop</h1>
           <div className="books">
            {books && books.length>0 && books.map((book) => (
                <div className="book" key={book.id}>
                <img className="img" src={bookLink} alt=""/>
                <h4>Title: {book.title}</h4>
                <p>Genre: {book.description}</p>
                <span>Price: {book.price}</span>
                <button className="delete" onClick={()=>handleDelete(book.id)}>Delete</button>
                <button className="update"><Link to={`/update/${book.id}`}>Update</Link></button>
                </div>
            ))}
           </div>
           <button className="addNew"><Link to="/add">Add New Book</Link></button>
        </div>
     );
}
 
export default Books;