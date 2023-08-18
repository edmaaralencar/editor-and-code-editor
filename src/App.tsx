import { Editor } from "./components/EdItor";
import { CodeEditor } from "./components/code-editor/CodeEditor";
import { Sidebar } from "./components/Sidebar";

function App() {
  return (
    <div className="text-zinc-50 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400">
      <div className="bg-zinc-800 shadow-sm border-black/20">
        <Sidebar />
        <main className="p-6 grid grid-cols-2 relative lg:ml-[224px] gap-4">
          <Editor />
          <CodeEditor />
        </main>
      </div>
    </div>
  );
}

export default App;
