import { ReactNode } from 'react';

// ----------------


function Layout({ children }) {
  return (
    <div id="content" className="site-content">
      {children}
    </div>
  );
}

export default Layout;
