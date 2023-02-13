import DisplayModeSmall from "../components/DisplayModeSmall";
import DisplayMode from "../components/DisplayMode";
import { FooterMenu, Navbar } from "../components";
import db from "../../dbLeaderBoard.json";

const currentUser = {
  name: "Homer Simpson",
  points: 100,
};

const users = [
  { name: "Homer Simpson", points: 100 },
  { name: "Marge Simpson", points: 130 },
  { name: "Lisa Simpson", points: 190 },
  { name: "Bart Simpson", points: 115 },
  { name: "Barney Gumble", points: 78 },
];

function LeaderBoard() {
  // 1. filtrar las actividades de la ultima semana
  // 2. crear un array de usuarios con:
  //  nombre
  //  puntos
  //  nivel???
  // 3. ordenarlo
  console.log("db: ", db);
  return (
    <>
      <Navbar>Competición</Navbar>
      <div className="container pt-10 mx-auto flex flex-col">
        <DisplayMode user={currentUser} />
        <p className="text-lg font-semibold m-6 text-black">
          Clasificación semanal
        </p>
        {users
          // aqui filtrar solo los de la ultima semana
          .sort((a, b) => (a.points > b.points ? -1 : 0)) // ordenamos por puntuacion
          .map((user, index) => (
            <DisplayModeSmall
              key={user.name}
              user={user}
              position={index + 1}
              currentUser={currentUser}
              level={5}
            />
          ))}
      </div>
      <FooterMenu />
    </>
  );
}

export default LeaderBoard;
