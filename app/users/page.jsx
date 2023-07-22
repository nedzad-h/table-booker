import { authOptions } from "@app/api/auth/[...nextauth]/route"
import DeleteUser from "@components/DeleteUser";
import { getServerSession } from "next-auth"

export default async function AllUsers() {
  const session = await getServerSession(authOptions);

  const getUsers = async () => {
    try {

      if (session?.user?.role !== "administrator") {
        throw new Error("You must be admin to do this!");
      }

      const res = await fetch(`${process.env.PROD_URL}/api/users`, {
        headers: {
          'Authorization': `Bearer ${session?.user?.accessToken}` 
        }
      });
  
      if (!res.ok) {
        throw new Error("Failed to fetch topics");
      }
  
      return res.json();
    } catch (error) {
      console.log("Error loading topics: ", error);
    }
  };

  const { allUsers } = await getUsers() || [];

  return (
    <div className="flex items-center justify-center pt-20">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ime i prezime</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">E-mail adresa</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uloga</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Opcije</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {
              allUsers.map((u) => {
                return (
                  <tr key={u._id}>
                    <td className="px-6 py-4 whitespace-nowrap">{u.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{u.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{u.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap flex space-x-2">
                      <DeleteUser userId={u._id} />
                    </td>
                  </tr>
                )
              })
            }

          </tbody>
        </table>
      </div>
    </div>

  )
}