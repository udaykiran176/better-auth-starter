import { Logout } from "./logout";


export async function Header() {

  return (
    <header className="absolute top-0 right-0 flex justify-between items-center p-4 w-full">
      <div className="flex items-center gap-2">
        <Logout />
      </div>
    </header>
  );
}
