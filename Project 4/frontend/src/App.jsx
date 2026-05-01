import { useEffect } from "react";

function App() {

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      console.log("TOKEN:", token);
      localStorage.setItem("token", token);
    }
  }, []);

  return (
    <>
      <button onClick={() => {
        window.location.href = "http://localhost:3000/api/auth/google";
      }}>
        Continue with Google
      </button>

      <button onClick={() => {
        localStorage.removeItem("token");
        window.location.href = "/";
      }}>
        Logout
      </button>
    </>
  );
}

export default App;