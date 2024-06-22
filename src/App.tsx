import {
  Badge,
  Button,
  Flowbite,
  Label,
  Navbar,
  TextInput,
  Tooltip,
  useThemeMode,
} from "flowbite-react";
import { useEffect, useState } from "react";
import "./App.css";
import SelectedItem from "./SelectedItem";
import { LIST_MOCK, POPULAR_MOCK } from "./list";

function App() {
  const { setMode } = useThemeMode();

  useEffect(() => {
    setMode("dark");
  }, [setMode]);

  const [isShowingResults, setIsShowingResults] = useState(false);
  const [searchResults, setSearchResults] = useState(LIST_MOCK);
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchValue(value);

    if (value.length === 0) {
      setIsShowingResults(false);
      setSearchResults(LIST_MOCK);
      return;
    }

    const results = LIST_MOCK.filter((item) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    setSearchResults(results);
    setIsShowingResults(true);
  };

  const [selectedList, setSelectedList] = useState([] as any[]);

  const handleAddToList = (item: any) => {
    const isItemInList = selectedList.some((i) => i.id === item.id);
    if (isItemInList) return;

    setSelectedList([...selectedList, item]);
    setSearchValue("");
    setIsShowingResults(false);
  };

  return (
    <Flowbite>
      <section className="flex flex-col max-w-[760px] mx-auto">
        <Navbar fluid className="rounded-b-md">
          <Navbar.Brand href="https://flowbite-react.com">
            <span className="self-center whitespace-nowrap text-xl font-thin text-gray-100">
              OB Doc
            </span>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Navbar.Link className="font-thin" href="#" active>
              Create
            </Navbar.Link>
            <Navbar.Link className="font-thin" href="#">
              Explore
            </Navbar.Link>
          </Navbar.Collapse>
        </Navbar>

        <section
          id="configuration-content"
          className="flex flex-col justify-center py-6 gap-y-4"
        >
          <div
            id="configuration-card"
            className="max-w-full bg-slate-800 p-6 rounded-md border-slate-700 border-[1.5px]"
          >
            <h5 className="text-2xl font-thin tracking-tight text-white mb-2">
              Add you tools
            </h5>
            <p className="font-normal text-gray-400">
              Let's configure the checking list
            </p>

            <section
              id="search-input-labels"
              className="flex justify-between mt-4"
            >
              <div id="search-label" className="mb-2 block">
                <Label htmlFor="base" value="Look for" className="text-lg" />
              </div>
              <div
                id="popular-labels"
                className="flex flex-wrap gap-2 select-none"
              >
                {POPULAR_MOCK.map((item) => (
                  <Tooltip
                    key={item.id}
                    content={item.description}
                    style="light"
                    placement="bottom"
                  >
                    <Badge size="sm" color="dark" className="uppercase">
                      {item.name}
                    </Badge>
                  </Tooltip>
                ))}
              </div>
            </section>
            <TextInput
              id="search-input"
              type="text"
              sizing="md"
              placeholder="Python, Go, Yarn, etc"
              value={searchValue}
              onChange={handleSearch}
              autoComplete="off"
            />

            <section
              id="search-results"
              className={`flex flex-col gap-y-2 max-h-96 overflow-y-auto mt-4 ${
                isShowingResults ? "flex" : "hidden"
              }`}
            >
              {searchResults.map((item) => (
                <Button
                  key={item.id}
                  color="dark"
                  className="rounded-lg w-full text-left justify-start"
                  onClick={() => handleAddToList(item)}
                  disabled={selectedList.some((i) => i.id === item.id)}
                >
                  {item.name}
                </Button>
              ))}
            </section>

            {/* a card with the no matches message */}
            {searchResults.length === 0 && (
              <div className="bg-gray-800 p-0 m-o">
                <span className="text-gray-400 p-0">No matches found</span>
              </div>
            )}
          </div>

          {selectedList.length > 0 && (
            <section id="selected-list" className="flex flex-col gap-y-4">
              {selectedList.map((item) => (
                <SelectedItem
                  key={item.id}
                  item={item}
                  setSelectedList={setSelectedList}
                  selectedList={selectedList}
                />
              ))}
            </section>
          )}
        </section>
      </section>
    </Flowbite>
  );
}

export default App;
