import styled from "styled-components"
import { Post } from "./Form";


const StyledMessage = styled.div<{ $userPost?: boolean }>`
color: #333;
box-shadow: 2px 3px 4px;
border-radius: 10px;
max-width: 300px;
padding: 1em;
margin: 1em;
align-self: ${props => props.$userPost ? 'end' : 'start'};
background-color: ${props => props.$userPost ? 'lightGreen' : 'white'};
`

const Message = ({ post, setPosts, $userPost }: any) => {
    function removeMessage(){
        if (!setPosts) return;

        const prevPosts = JSON.parse(localStorage.getItem("posts") || '[]');
        const newPosts = prevPosts.filter(({ id }: Post) => post.id !== id)
        localStorage.setItem("posts", JSON.stringify([...newPosts]))
        setPosts(JSON.parse(localStorage.posts));
    }
    return (
    <StyledMessage 
    $userPost={!!$userPost} 
    onClick={removeMessage}
    >
        <h3>{post.author}</h3>
        {post.message}<br />
        {new Date(post.date).toLocaleString()}
    </StyledMessage>
    )
}


export default Message