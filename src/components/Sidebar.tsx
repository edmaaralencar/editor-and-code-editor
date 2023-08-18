import { RxCircle } from "react-icons/rx";

export function Sidebar() {
  return (
    <aside className="hidden lg:block bg-[#191919] border-r border-r-zinc-700 p-4 fixed top-0 bottom-0 left-0 w-56">
      <div className="flex gap-2 group">
        <button className="w-3 h-3 rounded-full bg-zinc-300 group-hover:bg-red-400"></button>
        <button className="w-3 h-3 rounded-full bg-zinc-300 group-hover:bg-yellow-400"></button>
        <button className="w-3 h-3 rounded-full bg-zinc-300 group-hover:bg-green-400"></button>
      </div>

      <div className="flex flex-col gap-4 mt-8">
        <div className="flex flex-col gap-2">
          <h2 className="text-lg">Algoritmos</h2>

          <div className="flex items-center gap-2 p-3 w-full transition-colors cursor-pointer rounded hover:bg-zinc-700">
            <RxCircle />
            <span>Bubble Sort</span>
          </div>
          <div className="flex items-center gap-2 p-3 w-full transition-colors cursor-pointer rounded hover:bg-zinc-700">
            <RxCircle />
            <span>Bubble Sort</span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-lg">Estrutura de dados</h2>

          <div className="flex items-center gap-2 p-3 w-full transition-colors cursor-pointer rounded hover:bg-zinc-700">
            <RxCircle />
            <span>Bubble Sort</span>
          </div>
          <div className="flex items-center gap-2 p-3 w-full transition-colors cursor-pointer rounded hover:bg-zinc-700">
            <RxCircle />
            <span>Bubble Sort</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
