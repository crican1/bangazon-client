import React, { useEffect, useState } from 'react';
import { getUsers } from '../../utils/data/userData';
import UserCard from '../../components/user/UserCard';

function Home() {
  const [users, setUsers] = useState([]);

  const displayUsers = () => {
    getUsers()
      .then((usersData) => {
        setUsers(usersData);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  };

  useEffect(() => {
    // Fetch all users from the API
    displayUsers();
  }, []);
  console.warn(users);
  return (
    <article className="text-center my-4" id="users">
      <h1 style={{ marginTop: '40px' }}>Users</h1>

      <div className="text-center my-4 d-flex">
        {users.map((user) => (
          <section
            key={`user--${user.id}`}
            className="user"
            style={{ margin: '40px' }}
            id="user-section"
          >
            <UserCard
              id={user.id}
              first_name={user.first_name}
              last_name={user.last_name}
              profile_image_url={user.profile_image_url}
              email={user.email}
              uid={user.uid}
            />
          </section>
        ))}
      </div>
    </article>
  );
}

export default Home;
