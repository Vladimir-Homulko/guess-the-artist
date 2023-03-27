import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Header from '../components/Header';
import { TUser } from '../common/types';

const Layout = () => {
  const [user, setUser] = useState<TUser | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);

  return (
    <>
      <Header user={user} updateUser={setUser} />
      <main>
        <Outlet context={{ updateUser: setUser, isGameOver, setIsGameOver }} />
      </main>
    </>
  );
};

export default Layout;
