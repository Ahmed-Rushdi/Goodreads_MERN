import { useState } from "react";

const AdminTabs = ({ data }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <div>
      <div className="flex space-x-3 border-b">
        {data.map((tab) => {
          return (
            <button
              key={tab.key}
              className={`p-2 border-b-4 transition-colors duration-300 ${
                tab.key === activeTabIndex
                  ? "border-buff text-buff"
                  : "border-transparent hover:border-gray-200"
              }`}
              // Change the active tab on click.
              onClick={() => setActiveTabIndex(tab.key)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div className="py-4">{data[activeTabIndex].children}</div>
    </div>
  );
};

export default AdminTabs;
