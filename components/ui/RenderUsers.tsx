"use client"
import useFetchUsers from "@/hooks/useFetchUsers";



const RenderUsers = () => {
    const { users, loading, error } = useFetchUsers();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="text-center text-rose-500">Error: {error}</div>;
    }

    return (
        <div>
            <ul className=' flex flex-col justify-center items-center gap-4'>
                {
                    users && users.map((user) => (
                        <li key={user.ID} className=" rounded bg-[#ededed] w-full max-w-xl p-4 ">
                            <p className="font-semibold"> Name : {user.Name}</p>
                            <p>Email :  {user.Email}</p>
                            <p>ID :  {user.ID}</p>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default RenderUsers;
