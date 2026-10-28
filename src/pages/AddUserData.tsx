import { useState } from "react";
import type { SubmitEvent, ChangeEvent } from "react";
import { db } from '../config/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import "./UserData.css";

interface User {
  id?: string; // id is optional, as it will only be available after data is fetched
  name: string;
  age: number;
}

const AddDataForm = () => {
  const [data, setData] = useState<Omit<User, 'id'>>({ name: '', age: 0 });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: name === 'age' ? parseInt(value) : value });
  };

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'users'), data);
      alert('Data added!');
      setData({ name: '', age: 0 }); // reset form
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <form className="user-data-form" onSubmit={handleSubmit}>
      <input name="name" value={data.name} onChange={handleChange} placeholder="Name" />
      <input name="age" type="number" value={data.age || ""} onChange={handleChange} placeholder="Age" required/>
      <button type="submit">Add User</button>
    </form>
  );
};

export default AddDataForm;