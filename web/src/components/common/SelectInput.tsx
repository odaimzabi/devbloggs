import { Listbox, Transition } from "@headlessui/react";
import { IconChevronDown } from "@tabler/icons";
import React, { useState } from "react";

const people = [
  { id: 1, name: "Free", unavailable: false },
  { id: 2, name: "Paid", unavailable: false },
];

type Props = {
  name?: string;
  type?: string;
  className?: string;
  placeholder?: string;
  defaultValue?: string;
};

function SelectInput(props: Props) {
  const [selectedPerson, setSelectedPerson] = useState(people[0]);

  return (
    <div className="flex w-full flex-col">
      <div className="w-full max-w-xs">
        <Listbox as="div" value={selectedPerson} onChange={setSelectedPerson}>
          {({ open }) => (
            <>
              <Listbox.Label className="mb-2 block text-base font-medium leading-5 text-gray-700">
                Post Price
              </Listbox.Label>
              <div className="relative">
                <span className="inline-block w-full rounded-md shadow-sm">
                  <Listbox.Button className="focus:shadow-outline-blue relative w-full cursor-default rounded-md border border-gray-300 bg-white py-3 pl-3 pr-10 text-left transition duration-150 ease-in-out focus:border-indigo-500 focus:outline-none sm:text-lg sm:leading-5">
                    <span className="block truncate">
                      {selectedPerson?.name}
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                      <IconChevronDown className="text-gray-700" />
                    </span>
                  </Listbox.Button>
                </span>

                <Transition
                  show={open}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                  className="absolute mt-1 w-full rounded-md bg-white shadow-lg"
                >
                  <Listbox.Options
                    {...props}
                    static
                    className="shadow-xs max-h-60 overflow-auto rounded-md py-1 text-base leading-6 focus:outline-none sm:text-sm sm:leading-5"
                  >
                    {people.map((person) => (
                      <Listbox.Option key={person.name} value={person}>
                        {({ selected, active }) => (
                          <div
                            className={`${
                              active
                                ? "bg-blue-600 text-white"
                                : "text-gray-900"
                            } relative cursor-default select-none py-2 pl-8 pr-4`}
                          >
                            <span
                              className={`${
                                selected ? "font-semibold" : "font-normal"
                              } block truncate`}
                            >
                              {person.name}
                            </span>
                            {selected && (
                              <span
                                className={`${
                                  active ? "text-white" : "text-blue-600"
                                } absolute inset-y-0 left-0 flex items-center pl-1.5`}
                              >
                                <svg
                                  className="h-5 w-5"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </span>
                            )}
                          </div>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </>
          )}
        </Listbox>
      </div>
    </div>
  );
}

export default SelectInput;
