import React, {useState} from 'react';
import Axios from 'axios';


function renderPosts() {
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [author, setAuthor] = useState('');
    const [location, setLocation] = useState('');
    const [willDeliver, setWillDeliver] = useState('');


    const accessToken = localStorage.getItem('token');

    // Axios.interceptors.request.use(
    //     config => {
    //       config.headers.authorization = `Bearer ${accessToken}`;
    //       return config;
    //     },
    //     error => {
    //       return Promise.reject(error);
    //     }
    //   );

    const userPost = {
        title: title,
        description: description,
        price: price,
        author: author,
        location: location,
        willDeliver: willDeliver,
    }

    // console.log('Title: ', title)
    // console.log('Description: ', description)
    // console.log('Price: ', price)
    // console.log('Author: ', author)
    // console.log('Location: ', location)
    // console.log('willDeliver: ', willDeliver)

 
    // title, description, price, author.username, location, willDeliver

    // const addPost = async () => {
    //         localStorage.getItem('token');
    //         let response = await Axios.post("https://strangers-things.herokuapp.com/api/2104-uic-web-ft/posts", userPost, axiosConfig)
    //         console.log('Add Post Request: ', response);

    //         console.log('userPosts: ', userPost)
    // }

    const addPost = async () => {
        let response = await fetch("https://strangers-things.herokuapp.com/api/2104-uic-web-ft/posts", 
        {
         method: "POST",
         headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                post: userPost
            })
        })

        const data = await response.json()
        console.log('Data: ', data)
        return data
}

    const editPost = async () => {
        

        let res = await fetch(`https://strangers-things.herokuapp.com/api/2104-uic-web-ft/posts/`, 
        {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
    })
        const data = await res.json()
       // console.log('data1: ' , data)
        const nid = data.data.posts
       
        console.log('data2: ' , data.data.posts.location)
        let response = await fetch(`https://strangers-things.herokuapp.com/api/2104-uic-web-ft/posts/10`, 
        {
        method: "PATCH",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
            post: userPost
        })
        
        
    })
    
        // const data = await response.json()
        // console.log('Edit postData: ', data)

        // const id = data.data.posts._id
        // console.log('_id: ', id)
       
}

    const getPost = async () => {
            localStorage.getItem('token');
            let res = await Axios.get("https://strangers-things.herokuapp.com/api/2104-uic-web-ft/posts") 
            console.log('Response Object: ', res)

            const results = res.data.data.posts
            console.log('Posts: ', results)

            setPosts(results);
    
        }
    
    // const handleDelete = async () => {}
       
  
    return (
        <main>
            <div className= "Post Results"> 
                <form> 
                <label htmlFor="header-search">
                    <br></br>
                    <span className="visually-hidden">Create Posts: &nbsp; </span>
                </label>
                    <br></br>
                    <br></br>
                    <input
                        type="text"
                        id="header-search"
                        placeholder="Post Title"
                        name="title" 
                        onChange ={(e) => {
                            setTitle(e.target.value);
                        }}
                    />
                    <br></br>
                    <input
                        type="text"
                        id="header-search"
                        placeholder="Post Description"
                        name="description" 
                        onChange ={(e) => {
                            setDescription(e.target.value);
                        }}
                    />
                    <br></br>
                    <input
                        type="text"
                        id="header-search"
                        placeholder="Post Price"
                        name="price"
                        onChange ={(e) => {
                            setPrice(e.target.value);
                        }} 
                    />
                    <br></br>
                    <input
                        type="text"
                        id="header-search"
                        placeholder="Post Author"
                        name="author" 
                        onChange ={(e) => {
                            setAuthor(e.target.value);
                        }}
                    />
                    <br></br>
                    <input
                        type="text"
                        id="header-search"
                        placeholder="Post Location"
                        name="location" 
                        onChange ={(e) => {
                            setLocation(e.target.value);
                        }}
                    />
                    <br></br>
                    <input
                        type="text"
                        id="header-search"
                        placeholder="willDeliver: true or false"
                        name="willDeliver" 
                        onChange ={(e) => {
                            setWillDeliver(e.target.value);
                        }}
                    />
                    <br></br>
                    <br></br>
                    <input type="button" onClick={() => addPost()} value= "Add Posts"/>
                    <input type="button" onClick={() => editPost()} value= "Edit Posts"/>
                </form> 
                <br/><br/>
            </div>

            <div>
                {posts.map((post, idx) => (
                   <div key={idx}> 
                        <h3>Title: {post.title}</h3>
                        <h3>Description: {post.description}</h3>
                        <br></br>
                        <p> Price: {post.price}</p>
                        <p> Author: {post.author.username}</p>
                        <p> Location: {post.location}</p>
                        <p> WillDeliver: {post.willDeliver}</p>
                        <br></br>
                    </div>
                ))}
                <input type="button" onClick={() => getPost()} value= "Show Posts"/>
            </div> 
        </main>    
          );
    }


export default renderPosts;