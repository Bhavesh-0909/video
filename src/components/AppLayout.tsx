import Navbar from './Navbar';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col md:flex-row min-h-screen w-full">
      <Navbar />
      <div className="flex-1 h-full w-full sm:ml-14">{children}</div>
    </div>
  );
};

export default Layout;