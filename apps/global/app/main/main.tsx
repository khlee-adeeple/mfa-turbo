"use client";

const links: { [key: string]: string } = {
  admin: "http://localhost:7001",
  marketer: "http://localhost:7002",
};

export default function Main() {
  const redirectPage = (path: string) => {
    window.location.href = links[path] || "";
  };

  return (
    <div className="flex gap-4">
      <a onClick={() => redirectPage("admin")} className="cursor-pointer">
        어드민 페이지로 이동
      </a>
      <a onClick={() => redirectPage("marketer")} className="cursor-pointer">
        마케터 페이지로 이동
      </a>
    </div>
  );
}
