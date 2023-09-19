import { fetchPost, fetchGet, fetchPut } from "@/utils/apiHelpers";
import { FormEvent, useState } from "react";

type User = {
    username: string,
    email: string
}

const UserDemo = () => {
    const [ email, setEmail ] = useState("");
    const [ username, setUsername ] = useState("");
    const [ updatedUsername, setUpatedUsername ] = useState("");
    const [ users, setUsers ] = useState<User[]>([]);
    const tableHeaders = [
        "Username",
        "User Email",
    ]
    
    const createUser = async (event: FormEvent) => {
        event.preventDefault(); 
        await fetchPost(
            "/api/users", {
                username: username,
                email: email
            }
        ).then(res => {
            alert("Success! Added: " + res.data)
        }).catch(err => {
            alert(err)
        });
    }

    const refreshUsers = async (event: FormEvent) => {
        event.preventDefault(); 
        await fetchGet("/api/users").then(res => {
            console.log(res);
            if (res.data) setUsers(res.data);
        });
    }
    
    const updateUser = async (event: FormEvent) => {
        event.preventDefault();
        await fetchPut(
            "/api/users", {
                username: updatedUsername,
                email: email
            }
        ).then(res => {
            alert("Success! Updated: " + res.data)
        }).catch(err => {
            alert(err)
        });
    }

    return (
        <div>
            <form id="questionForm">          
                <label htmlFor="questionTitle">Enter User Email:</label>
                <input 
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={e => {setEmail(e.target.value)}}
                />
                <br /><br />
        
                <label htmlFor="questionCategory">Enter Username:</label>
                <input 
                    type="text" 
                    placeholder="Username"
                    value={username}
                    onChange={e => {setUsername(e.target.value)}}
                />
                <br /><br />

                <label htmlFor="updateUserName">Enter updated Username, used for Update user:</label>
                <input 
                    type="text"
                    placeholder="New user name"
                    value={updatedUsername}
                    onChange={e => {setUpatedUsername(e.target.value)}}
                />
                <br /><br />

                <button
                    onClick={createUser}
                    className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
                >Add User</button>
            </form>
            <button
                onClick={refreshUsers}
                className="mt-2 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow"
            >Refresh users from DB</button>
            <button
                onClick={updateUser}
                className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow ml-2"
            >Update User</button>
            <table id="questionTable" className="border-collapse w-full border-[3px] border-black mt-2 mb-20">
                <thead>
                    <tr>
                        {tableHeaders.map((value, index) => {
                            return <th key={index} className="bg-[#f2f2f2] left p-[12px] border border-black">{value}</th>
                        })}
                    </tr>
                </thead>
                <tbody id="questionTableBody">
                    {users.map((user, index) => {
                        return (
                            <tr key={user.email}>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default UserDemo;
