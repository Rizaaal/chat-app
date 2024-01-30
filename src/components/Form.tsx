import styled from "styled-components"

export interface Post{
    id: number,
    author: string,
    message: string,
    date: Date
}

const Wrapper = styled.div.attrs((/* props */) => ({ tabIndex: 0 }))` 
    padding: 1em;
    background-color: #ccc;

    & > textarea {
        width: 100%;
        resize: none;
    }
`

const Form = ({ currentUser, setPosts }: any) => {
    function createMessage(){
        const prevPosts = JSON.parse(localStorage.getItem("posts") || '[]');
        
        const message = (window as any).messaggio.value;
        let lastId: number = prevPosts[prevPosts.length - 1]?.id || 0;

        const newPost: Post = {
            id: ++lastId,
            author: currentUser,
            message: message,
            date: new Date()
        }

        localStorage.setItem("posts", JSON.stringify([...prevPosts, newPost]))
        setPosts(JSON.parse(localStorage.posts));
    }

    return (
        <Wrapper>
           <textarea id="messaggio" />
           <br />
           <button 
           onClick={createMessage}
           >
            Invia messaggio
           </button>
        </Wrapper>
    )
}


export default Form