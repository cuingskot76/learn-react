import React, { useEffect, useState } from "react";
import Form from "./Form";
import Items from "./Items";

const App = () => {
  const API_URL = "http://localhost:3004/comments/";
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  const getId = items.map((id) => id.id);

  const [newItem, setNewItem] = useState({
    id: getId.at(-1) + 1,
    name: "",
    body: "",
  });

  const fetchApi = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/?_sort=id&_order=desc`);
      if (!res.ok) throw Error("Error : at fetchApi");
      const data = await res.json();
      setItems(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const putDataToApi = async () => {
    const { id, name, body } = newItem;
    try {
      const res = await fetch(`${API_URL}${id}`, {
        method: "PUT",
        // body: JSON.stringify({
        //   ...id,
        //   ...name,
        //   ...body,
        // }),
        header: {
          "Content-Type": "application/json",
        },
      });
      const newData = await res.json();
      setItems([...items, { ...newData }]);
      fetchApi();
      console.log(newData);
      console.log(id, name, body);
    } catch (error) {
      console.log(error.message);
    }
  };

  const onEditItem = (data) => {
    setIsUpdate(true);
    setNewItem(data);
    // console.log(isUpdate);
    // console.log(data);
  };

  const onDeleteItem = async (id) => {
    try {
      const fetchItem = await fetch(`${API_URL}${id}`, {
        method: "DELETE",
      });
      if (!fetchItem.ok) throw Error(`Error : cannot fetching the data`);
      fetchApi();
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  return (
    <section className="bg-[#0F172A]  text-white">
      <div className="flex justify-center  py-4 px-8">
        {error && <p>{error}</p>}
      </div>
      <Form
        items={items}
        setItems={setItems}
        API_URL={API_URL}
        fetchApi={fetchApi}
        newItem={newItem}
        setNewItem={setNewItem}
        isUpdate={isUpdate}
        putDataToApi={putDataToApi}
        setIsUpdate={setIsUpdate}
      />
      <div className="flex justify-center ">
        {loading && <p>Loading ...</p>}
      </div>
      {items.length > 0 ? (
        <Items items={items} deleteItem={onDeleteItem} editItem={onEditItem} />
      ) : (
        <div className="flex justify-center ">
          <p className="mt-8">Item not found</p>
        </div>
      )}
    </section>
  );
};

export default App;
