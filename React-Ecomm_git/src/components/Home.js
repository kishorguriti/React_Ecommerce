import Login from "./Login";

import SignUp from "./SignUp";
import { useState } from "react";

function Home() {
  const [user, setUser] = useState(true);

  function changeUserState() {
    setUser(!user);
  }

  let page = user ? <Login onCreate={changeUserState} /> : <SignUp onCreate={changeUserState} />;

  return <>{page}</>;
}

export default Home;
