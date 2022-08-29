import React from "react";

const Form = ({
  items,
  setItems,
  newItem,
  setNewItem,
  API_URL,
  fetchApi,
  isUpdate,
  setIsUpdate,
  putDataToApi,
}) => {
  const onSubmitHandler = (e) => {
    e.preventDefault();

    const { id, name, body } = newItem;

    if (isUpdate) {
      putDataToApi();
    } else {
      const fetchNewItem = async () => {
        try {
          const res = await fetch(API_URL, {
            method: "POST",
            body: JSON.stringify({
              id,
              name,
              body,
            }),
            headers: { "Content-Type": "application/json" },
          });
          const data = await res.json();
          console.log(data);
          setItems([...items, { ...data }]);
          fetchApi();
        } catch (error) {
          console.log(error.message);
        }
      };

      fetchNewItem();
      newItem.name = "";
      newItem.body = "";
    }
  };

  return (
    <form className="mx-auto max-w-[768px] px-4" onSubmit={onSubmitHandler}>
      <div className="relative z-0 mb-6 ">
        <input
          type="text"
          name="text"
          id="text"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-500 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
        />
        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
          Username
        </label>
      </div>

      <div className="relative z-0 mb-6">
        <input
          type="text"
          name="text"
          id="text"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-500 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
          value={newItem.body}
          onChange={(e) => setNewItem({ ...newItem, body: e.target.value })}
        />
        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
          Comment
        </label>
      </div>

      <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Submit
      </button>
    </form>
  );
};

export default Form;
