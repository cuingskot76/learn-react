import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const Items = ({ items, deleteItem, editItem }) => {
  return (
    <>
      <section className="m-auto max-w-[768px] py-4 px-4 text-white">
        {items.map((item) => (
          <div
            key={item.id}
            className="border-dashed border-2 border-sky-500 mb-4 px-4 py-2"
          >
            <h3>{`Name : ${item.name}`}</h3>
            <p>{`Comment : ${item.body}`}</p>

            <div className="flex ">
              <button
                className="bg-red-500 flex hover:bg-red-600 py-1 px-2 rounded-md mt-4 mb-2 mr-4"
                onClick={() => deleteItem(item.id)}
              >
                <DeleteIcon />
                Delete
              </button>
              <button
                className="bg-green-400 flex hover:bg-green-500 py-1 px-2 rounded-md mt-4 mb-2"
                onClick={() => editItem(item)}
              >
                <EditIcon />
                Edit
              </button>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default Items;
