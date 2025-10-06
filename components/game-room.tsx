import LionComponent from "./model/LionComponent";


import SnakeIcon from "@/icons/SnakeIcon";
import SpaceTypeIcon from "@/icons/SpaceTypeIcon";
import TicTacToeIcon from "@/icons/TicTacToeIcon";
import WacAMole from "@/icons/WacAMole";
import SudokuIcon from "@/icons/SudokuIcon";
import Game2048Icon from "@/icons/Game2048Icon";
import Link from "next/link";
import { Joystick, Rocket } from "lucide-react";

function GameRoom() {
  const games = [
    {
      name: "Space-Shooter",
      path: "/space",
      Icon: Rocket,
    },
    {
      name: "Metroidvania",
      path: "http://localhost:3005/",
      Icon: Joystick,
    },
    {
      name: "Whac-a-mole",
      path: "whac-a-mole",
      Icon: WacAMole,
    },
  ];

  return (
    <div className="m-6  bg-[hsl(var(--background))] txt transition-colors duration-300 overflow-x-hidden">
      <h1 className="text-2xl font-bold txt">Game Room</h1>
      <div className="relative w-[svw] h-[50vh] pb-5">
        <div className="absolute h-1/2 w-[calc(100vw-6rem)] right-0">
          <div className="relative bottom-[100%] left-[30%]">
            <LionComponent />
          </div>
        </div>
        <div className="flex flex-col justify-center h-full z-10 relative">
          <h1 className="text-[5vw] font-extrabold text-[var(--btn-hover)] py-3 md:px-28 select-none">
            Enough grinding,
          </h1>
          <h2 className="text-[4vw] font-semibold text-[var(--txt-disabled)] py-3 md:px-28 select-none">
            time to chill & relax!
          </h2>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 px-8">
        {games.map(({ name, path, Icon }) => (
          <Link
            key={name}
            href={path}
            className="txt-dim hover:border-[var(--bg-ter)] border border-transparent rounded-3xl transition duration-200 p-4"
          >
            {Icon && (
              <div className="p-12 opacity-90 flex items-center justify-center bg-sec rounded-3xl">
                <Icon size={40} className="w-24 h-24" />
              </div>
            )}
            <div className="flex flex-col flex-1 justify-center p-2 bg-te r">
              <h3 className="text-lg font-semibold txt pb-1">{name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default GameRoom;