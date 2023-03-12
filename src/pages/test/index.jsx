import { axios } from "../../configAxios";

export const Test = () => {
  const userInfo = {
    email: "althea.ward@example.net",
    password: "password",
  };

  const csrf = () => axios.get("sanctum/csrf-cookie");

  console.log(csrf());

  const login = async () => {
    await csrf();
    axios.post("login", userInfo).then((response) => console.log(response));
  };

  const logout = async () => {
    await csrf();
    axios.post("logout");
  };

  return (
    <>
      <div className="w-full h-screen bg-black flex flex-col items-center justify-center gap-10">
        <h1 className="text-white font-bold text-4xl">Hello World !</h1>
        <div className="flex flex-row gap-5">
          <button
            onClick={() => login()}
            className="bg-white text-blac px-5 py-2 uppercase font-bold"
          >
            Me Connecter
          </button>
          <button
            onClick={() => logout()}
            className="bg-white text-blac px-5 py-2 uppercase font-bold"
          >
            Me Déconnecter
          </button>
        </div>
      </div>
    </>
  );
};
