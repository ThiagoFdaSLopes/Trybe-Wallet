import { Link } from 'react-router-dom';

export default function PageNotFound() {
  return (
    <main
      className="h-screen
    w-full flex flex-col justify-center items-center bg-[#1A2238]"
    >
      <h1 className="text-9xl font-extrabold text-white tracking-widest">404</h1>
      <div className="bg-[#FF6A3D] px-2 text-sm rounded rotate-12 absolute">
        <Link to="/">Page Not Found</Link>
      </div>

    </main>
  );
}
