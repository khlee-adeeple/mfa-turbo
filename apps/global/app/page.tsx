import Main from "./main/main";

export default function Page() {
  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      <p className="text-4xl">글로벌 페이지 (초기 화면)</p>
      <Main />
    </main>
  );
}
