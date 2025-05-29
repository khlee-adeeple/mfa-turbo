"use client";

const links: { [key: string]: string } = {
  global: "http://localhost:7000",
  admin: "http://localhost:7001",
};

export default function Main() {
  const redirectPage = (path: string) => {
    window.location.href = links[path] || "";
  };

  return (
    <div className="flex gap-4">
      <a onClick={() => redirectPage("global")} className="cursor-pointer">
        글로벌 페이지로 이동
      </a>
      <a onClick={() => redirectPage("admin")} className="cursor-pointer">
        어드민 페이지로 이동
      </a>
    </div>
  );
}
