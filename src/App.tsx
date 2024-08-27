import { useState } from "react"
import { requestUser } from "./api/users"
import { GitHubUser } from "./interface/gitHubUser";


function App() {
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState< GitHubUser | null>( null );

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
    setUserName(event.target.value);
  }

  const handleSerch = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = await requestUser(userName);
      setUser(data);
  }


  return (
    <div className="h-screen w-screen bg-[#0f1523] flex flex-col justify-center items-center">

      <form onSubmit={handleSerch} className="rounded-md md:w-2/4 w-5/6 justify-between my-5 flex p-2 bg-[#1F2A48]">
        <section className="md:w-[50%] w-2/3 flex">
          <img src="icons/search.svg" className="w-6 mx-2" alt="" />
          <input
            type="text"
            placeholder="Ingresa el usuario"
            value={userName}
            onChange={handleInputChange}
            className="bg-[#1F2A48] placeholder:text-zinc-400 w-[100%] text-white outline-none"
          ></input>
        </section>
        <button type="submit" className="bg-[#0079FE] w-20 h-8 text-white rounded-md">Buscar</button>
      </form>
      
      <>
        {
          user &&(
            <div className="bg-[#1F2A48] text-[#E3E2E6] rounded-md flex md:flex-row flex-col md:w-2/4 w-5/6">
              <div className="w-1/4 flex justify-center ml-3 self-center md:self-start mt-7">
                <img src={user.avatar_url} alt="" className="w-24 rounded-[50%] h-24" />
              </div>

              <div className="flex flex-col mt-7 mx-4 w-12/12">
                <p className="font-bold text-xl">{user.name}</p>
                <p className="my-4 text-[#bebdc0]">{user.bio}</p>

                <section className="bg-[#141C2F] w-5/6 flex my-3 self-center rounded-md justify-around text-[#E3E2E6]">
                  <div className="flex flex-col items-center">
                    <p>Repositorios</p>
                    <p className="font-bold">{user.public_repos}</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <p>Seguidos</p>
                    <p className="font-bold">{user.followers}</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <p>Seguidores</p>
                    <p className="font-bold">{user.following}</p>
                  </div>
                </section>

                <div className="my-4">
                  <div className="flex items-center">
                    <img src="icons/location.svg" className="mr-1 h-5"/>
                    <p className="my-2">{user.location}</p>
                  </div>
                  <div className="flex items-center">
                    <img src="icons/link.svg" className="mr-1 h-5"/>
                    <a href={user.html_url} className="underline text-[#045EE5]">{user.html_url} </a>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      </>
    </div>
  )
}

export default App
