import { axios } from "../../configAxios";

export const Test = () => {
  const userLogin = {
    email: "materrazzi.pro@gmail.com",
    password: "1234567890",
  };

  const userRegister = {
    first_name: "mathéo",
    last_name: "guerrazzi",
    pseudo: "Toto",
    age: 22,
    email: "materrazzi.pro@gmail.com",
    password: "1234567890",
    password_confirmation: "1234567890",
  };

  const csrf = () => axios.get("sanctum/csrf-cookie");

  console.log(csrf());

  const login = async () => {
    await csrf();
    axios
      .post("login", userLogin)
      .then((response) => console.log(response))
      .catch((error) => console.log(error.response.data.error));
  };

  const logout = async () => {
    await csrf();
    axios.post("logout");
  };

  const register = async () => {
    await csrf();
    axios
      .post("register", userRegister)
      .then((response) => console.log(response))
      .catch((error) => console.log(error.response.data.message));
  };

  const collections = async () => {
    const user_id = 'a2316812-d397-4441-b927-4d8ecf739d5f';
    axios
      .get(`api/collections/${user_id}`)
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error.response.data.message));
  };

  const collection = async () => {
    const id = 'ba33bcea-96c6-44ba-8925-3806adf6ade1';
    axios
      .get(`api/collection/${id}`)
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error.response.data.message));
  };

  return (
    <>
      <div className="w-full h-screen bg-black flex flex-col items-center justify-center gap-10">
        <h1 className="text-white font-bold text-4xl">Hello World !</h1>
        <div className="flex flex-row gap-5">
          <button
            onClick={() => register()}
            className="bg-white text-blac px-5 py-2 uppercase font-bold"
          >
            M'inscrire
          </button>
          <button
            onClick={() => login()}
            className="bg-white text-blac px-5 py-2 uppercase font-bold"
          >
            Me Connecter
          </button>
          <button
            onClick={() => collections()}
            className="bg-white text-blac px-5 py-2 uppercase font-bold"
          >
            Mes Collections
          </button>
          <button
            onClick={() => collection()}
            className="bg-white text-blac px-5 py-2 uppercase font-bold"
          >
            Une Collection de mes collections
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
