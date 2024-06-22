import { Button, Kbd, Label, Radio, Tabs, TextInput } from 'flowbite-react'
import { useEffect, useState } from 'react'
import {
  HiChatBubbleBottomCenterText,
  HiCog,
  HiMiniCommandLine,
  HiMiniNoSymbol,
} from 'react-icons/hi2'

import axios from 'axios'

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { nord } from 'react-syntax-highlighter/dist/esm/styles/hljs'

interface GitTag {
  name: string
}

async function fetchData<T>(url: string): Promise<T> {
  try {
    const response = await axios.get<T>(url)
    return response.data
  } catch (error) {
    console.error(`Error fetching data from ${url}`, error)
    throw error
  }
}

async function getAllVersions(url: string): Promise<string[]> {
  const data = await fetchData<GitTag[]>(url)
  return data.map((tag) => tag.name)
}

type Props = {
  item: any
  selectedList: any[]
  setSelectedList: any
}

export default function SelectedItem({
  item,
  selectedList,
  setSelectedList,
}: Props) {
  const [selectedOption, setSelectedOption] = useState(
    `any-version-option-${item.id}`,
  )
  const [exactVersion, setExactVersion] = useState('')
  const [minVersion, setMinVersion] = useState('')
  const [maxVersion, setMaxVersion] = useState('')
  const [versions, setVersions] = useState<string[]>([])
  const [installedMessage, setInstalledMessage] = useState(
    'Python is installed.',
  )
  const [notInstalledMessage, setNotInstalledMessage] = useState(
    'Python is not installed. Please download it from https://www.python.org/',
  )

  // const data = getAllVersions(item.versions)

  useEffect(() => {
    const getVersions = async () => {
      const data = await getAllVersions(item.versions)
      setVersions(data)
    }
    getVersions()
  }, [item.versions])

  const codeString = `check_python() {
  if command -v python3 &> /dev/null; then
    PYTHON_VERSION=$(python3 --version)
    REQUIRED_VERSION="3.6.0"
    if [[ "$(printf '%s\\n' "$REQUIRED_VERSION" "$PYTHON_VERSION" | sort -V | head -n1)" == "$REQUIRED_VERSION" ]]; then
      echo -e "Python está instalado. Versión: $PYTHON_VERSION"
    else
      echo -e "Python está instalado, pero la versión es X. Se requiere al menos la versión 3.6.0$}"
    fi
  else
    echo -e "Python no está instalado. Por favor, instálalo desde https://www.python.org/"
  fi
}
  `

  return (
    <div
      id="seleted-item"
      className="flex flex-col gap-y-2 bg-slate-800 p-2 rounded-md border-[1.5px] border-slate-700"
    >
      <div
        id="item-header"
        className="flex justify-between items-center bg-slate-800"
      >
        <span className="text-white pl-2 text-xl">{item.name}</span>
        <Button
          color="gray"
          size="sm"
          onClick={() =>
            setSelectedList(selectedList.filter((i: any) => i.id !== item.id))
          }
        >
          <HiMiniNoSymbol className="w-4 h-6 text-red-500" />
        </Button>
      </div>
      <p className="text-gray-400 pl-2">{item.description}</p>

      {/*  */}
      <Tabs aria-label="Config tabs" variant="underline">
        <Tabs.Item active title="Checks" icon={HiCog}>
          <div className="flex flex-col px-2">
            <fieldset className="flex max-w-md flex-col gap-4">
              <legend className="mb-6">Check if it's installed with:</legend>

              <div className="flex items-center gap-2 mb-2">
                <Radio
                  id={`any-version-option-${item.id}`}
                  name={`versions-${item.id}`}
                  value="Any version"
                  checked={selectedOption === `any-version-option-${item.id}`}
                  onChange={() => {
                    setSelectedOption(`any-version-option-${item.id}`)
                    setExactVersion('')
                    setMinVersion('')
                    setMaxVersion('')
                  }}
                />
                <Label htmlFor={`any-version-option-${item.id}`}>
                  Any version from <Kbd>{versions[0]}</Kbd> to{' '}
                  <Kbd>{versions[versions.length - 1]}</Kbd>
                </Label>
              </div>

              <div className="flex items-center gap-2">
                <Radio
                  id={`exact-version-option-${item.id}`}
                  name={`versions-${item.id}`}
                  value="Exact version"
                  checked={selectedOption === `exact-version-option-${item.id}`}
                  onChange={() => {
                    setSelectedOption(`exact-version-option-${item.id}`)
                    setMinVersion('')
                    setMaxVersion('')
                  }}
                />
                <Label htmlFor={`exact-version-option-${item.id}`}>
                  Exact version
                </Label>
                <TextInput
                  id={`exact-version-input-${item.id}`}
                  type="text"
                  sizing="sm"
                  placeholder="1.0.0"
                  className="w-24 ml-2"
                  value={exactVersion}
                  onChange={(e: any) => setExactVersion(e.target.value)}
                  onClick={() => {
                    setSelectedOption(`exact-version-option-${item.id}`)
                    setMinVersion('')
                    setMaxVersion('')
                  }}
                  list={`versions-for-${item.id}`}
                />
                <datalist id={`versions-for-${item.id}`}>
                  {versions.map((version) => (
                    <option key={version} value={version} />
                  ))}
                </datalist>
              </div>
              <div className="flex items-center gap-2">
                <Radio
                  id={`custom-version-option-${item.id}`}
                  name={`versions-${item.id}`}
                  value="Custom version"
                  checked={
                    selectedOption === `custom-version-option-${item.id}`
                  }
                  onChange={() => {
                    setSelectedOption(`custom-version-option-${item.id}`)
                  }}
                />
                <Label htmlFor={`custom-version-option-${item.id}`}>
                  Version range from
                </Label>
                <TextInput
                  id={`min-version-input-${item.id}`}
                  type="text"
                  sizing="sm"
                  placeholder="1.0.0"
                  className="w-24"
                  value={minVersion}
                  onChange={(e: any) => setMinVersion(e.target.value)}
                />
                <Label htmlFor={`custom-version-option-${item.id}`}>to</Label>
                <TextInput
                  id={`max-version-input-${item.id}`}
                  type="text"
                  sizing="sm"
                  placeholder="1.0.0"
                  className="w-24"
                  value={maxVersion}
                  onChange={(e: any) => setMaxVersion(e.target.value)}
                />
              </div>
            </fieldset>
          </div>
        </Tabs.Item>
        <Tabs.Item title="Messages" icon={HiChatBubbleBottomCenterText}>
          <div className="flex flex-col px-2">
            <div className="flex flex-col gap-4">
              <legend className="mb-2">
                You can change the messages here:
              </legend>

              <Label htmlFor="installed-message">Installed</Label>
              <TextInput
                type="text"
                id="installed-message"
                value={installedMessage}
                onChange={(e: any) => setInstalledMessage(e.target.value)}
                className="w-full"
              />
              <Label htmlFor="not-installed-message">Not installed</Label>
              <TextInput
                type="text"
                id="not-installed-message"
                value={notInstalledMessage}
                onChange={(e: any) => setNotInstalledMessage(e.target.value)}
              />
            </div>
          </div>
        </Tabs.Item>
        <Tabs.Item title="Code" icon={HiMiniCommandLine}>
          <SyntaxHighlighter
            language="bash"
            style={nord}
            customStyle={{ borderRadius: '0.5rem' }}
            showLineNumbers
          >
            {codeString}
          </SyntaxHighlighter>
          <Button
            onClick={() => navigator.clipboard.writeText(codeString)}
            color="light"
            className="w-full mt-6"
          >
            Copy code
          </Button>
        </Tabs.Item>
      </Tabs>
    </div>
  )
}
