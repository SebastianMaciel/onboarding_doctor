import { Card, Flowbite, Navbar, useThemeMode } from "flowbite-react";
import { useEffect } from "react";
import "./App.css";

function App() {
  const { setMode } = useThemeMode();

  useEffect(() => {
    setMode("dark");
  }, [setMode]);

  return (
    <Flowbite>
      <Navbar fluid rounded>
        <Navbar.Brand href="https://flowbite-react.com">
          <span className="self-center whitespace-nowrap text-xl font-semibold text-gray-100">
            OB Doc
          </span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link href="#" active>
            Config
          </Navbar.Link>
          <Navbar.Link href="#">List</Navbar.Link>
        </Navbar.Collapse>
      </Navbar>

      <section className="flex flex-col justify-center py-6">
        <Card className="max-w-full">
          <h5 className="text-2xl font-bold tracking-tight text-white">
            NodeJS
          </h5>
          <p className="font-normal text-gray-400">
            Let's configure the checking settings
          </p>
        </Card>
      </section>
    </Flowbite>
  );
}

export default App;
