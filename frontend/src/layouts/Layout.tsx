import Header from '../components/Header';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { TUser } from '../common/types';

const Layout = () => {
  const [user, setUser] = useState<TUser | null>(null);

  return (
    <>
      <Header user={user} updateUser={setUser}/>
      <main>
        <Outlet context={{ updateUser: setUser }}/>
      </main>
    </>
  );
};

export default Layout;
