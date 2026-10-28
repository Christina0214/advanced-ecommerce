import { useState, useEffect } from 'react';
import { db } from '../config/firebaseConfig';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import "./UserData.css";

interface User {
    id?: string; // id is optional, as it will only be available after data is fetched
    name: string;
    age: number;
}

const DisplayData = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [newAge, setNewAge] = useState<string>('');
    const [newName, setNewName] = useState<string>('');

    // updateUser Function
    const updateUser = async (userId: string, updatedData: { name?: string; age?: number }) => {
        try {
            const userDoc = doc(db, "users", userId);

            await updateDoc(userDoc, updatedData);

            setUsers((previousUsers) =>
                previousUsers.map((user) =>
                    user.id === userId
                    ? { ...user, ...updatedData }
                    : user
                )
            );
        }   catch (error) {
            console.error("Error updating user:", error);
        }
    };
    // deleteUser Function
    const deleteUser = async (userId: string) => {
        try {
            await deleteDoc(doc(db, 'users', userId));

            setUsers((previousUsers) =>
                previousUsers.filter((user) => user.id !== userId)
            );
        }   catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
        const querySnapshot = await getDocs(collection(db, 'users'));
        const dataArray = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as User[];
        setUsers(dataArray);
        };

        fetchData();
    }, []);

    return (
    <div className="user-data-page">
        <h2>Users List</h2>
        {users.map((user) => (
            <div
                className="person-card"
                key={user.id}
                style={{ border: '2px solid black', margin: '10px' }}
            >
                <div key={user.id}>
                    <p>Name: {user.name}</p>
                    <p>Age: {user.age}</p>
                </div>
                <input
                    onChange={(e) => setNewName(e.target.value)}
                    type="string"
                    placeholder="Enter new name:"
                />
                <button onClick={() => updateUser(user.id, { name: newName })}>
                    Update Name
                </button>
                <input
                    onChange={(e) => setNewAge(e.target.value)}
                    type="number"
                    placeholder="Enter new age:"
                />
                <button onClick={() => updateUser(user.id, { age: Number(newAge) })}>
                    Update Age
                </button>
                <button
                    className="delete-button"
                    style={{ backgroundColor: 'crimson' }}
                    onClick={() => deleteUser(user.id)}
                >
                    Delete User
                </button>
            </div>
        ))}
    </div>
  );
};

export default DisplayData;