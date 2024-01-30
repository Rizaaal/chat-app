import { useRef, useState } from 'react';
import Form from './Form';
import Message from './Message';
import Button from './Button';

export function App(){
  console.log('App() re-rendered.');
  

  const [user, setUser] = 
  useState<string | null>(localStorage.getItem("currentUser"));
  const [posts, setPosts] = useState(JSON.parse(localStorage.getItem("posts") || '[]'));
  
  if (user === null) {
    return <LoginPage setUser={setUser} user={user} />
  } else {
    return (
      <WelcomePage 
      currentUser={user} 
      setUser={setUser} 
      posts={posts}
      setPosts={setPosts}
      />
    )
  }
}

export function LoginPage( { setUser } : any){
  const [btn, setBtn] = useState(true);
  console.log('LoginPage() re-rendered.');

  const inputRef: any = useRef(null);
  const buttonRef: any = useRef();
  
  function logUser(){
    const currentUser = inputRef.current.value;

    const users = JSON.parse(localStorage.getItem("users") || "{}");

    localStorage.setItem("currentUser", currentUser);
    localStorage.setItem("users", JSON.stringify({
      ...users,
      [currentUser]: {
        lastLogin: new Date(), 
        visits: users[currentUser] ? ++users[currentUser].visits : 1
      }
    }));

    setUser(currentUser);
  }

  //questo tipo di funzioni possono anche stare fuori dal componente.
  //Ad esempio le funzioni che non eseguono operazioni sullo stato 
  //del componente.
  function validate(){
    const pattern = /[\w-]+@[\w-]+\.[\w]{2,}/;
    setBtn(!pattern.exec(inputRef.current.value));
  }

  return (
    // 1. utilizzare un form controllato
    //    ovvero mettere l'attributo value dentro il tag input
    //    il valore dell'attributo deve essere uguale a una variabile state
    //    la funzione validate deve chiamare la funzione che cambia lo stato del 
    //    value, in questo modo il form è controllato.
    //    (in realtà facciamo tutto questo per avere un modo per inserire
    //    il value dentro una variabile state. Questo si puo fare anche con il
    //    modo corrente, ovvero useRef().
    <section id="login">
      <h1>Login</h1>
      <input 
        ref={inputRef}
        onChange={validate} 
        type="text" 
        placeholder="type a valid e-mail" 
      />
      <button 
        onClick={logUser} 
        disabled={btn}
        ref={buttonRef}>
        enter
      </button>
    </section>
  );
}

export function WelcomePage({ currentUser, setUser, posts, setPosts }: any){
  
  //questo non è necessario, usiamo lo state!
  const user = JSON.parse(localStorage.getItem("users") || "{}")[currentUser];
  const isOldUser = user.visits > 1;

  const message = isOldUser ? 'Welcome back' : 'Welcome';
  //JSON porta indietro di 1 ora la data, quindi dobbiamo fare questo:
  const date = new Date(user.lastLogin).toLocaleString();

  function logOut(){
    setUser(null);
    localStorage.removeItem("currentUser");
  }

  //la condizione che utilizziamo per visualizzare un componente deve essere
  //un booleano, perché altrimenti si rischia di incorrere in bug
  //su mobile
  return (
    <section id="welcome">
      <nav>
        <ul>
          <li><button onClick={logOut}>Logout</button></li>
          {/* <li><Button>Enter</Button></li> */}
          { isOldUser ? ( 
            <>
              <li id='lastLogin'>last Login: {date}</li>
              <li id='visits'>{user.visits}</li>
            </> 
          ) : null}
        </ul>
      </nav>
      <h1>{message}, {currentUser}</h1>
      <hr />
      <h2>Messaggi</h2>
      {posts.map((post: any) => {
        if (post.author === currentUser) {
          return <Message post={post} setPosts={setPosts} $userPost/>
      } else {
          return <Message post={post}/>
      }
      })}
      <Form currentUser={currentUser} setPosts={setPosts}/>
    </section>
  );
}

export default App;
