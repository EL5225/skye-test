import { TableModule } from "./modules/table";

function MainApp() {
  return (
    <main className="flex flex-col w-full min-h-screen items-center px-[8rem] py-[5rem] gap-10 bg-slate-50">
      <hgroup className="w-full flex flex-col gap-2">
        <h1 className="text-4xl font-semibold">Data Siswa</h1>
        <h2 className="text-xl">Selamat datang di manajemen data siswa!</h2>
      </hgroup>

      <TableModule />
    </main>
  );
}

export default MainApp;
