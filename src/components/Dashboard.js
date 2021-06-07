import React from 'react';
 
function Dashboard(props) {
 
  // handle click event of logout button
  // const handleLogout = () => {    
  //   props.history.push('/login');
  // }
 
  return (
    <div className="search">
      <h1>Welcome User!</h1><br /><br />
      <input type="search"placeholder="Search"/>
    </div>
  );
}
 
export default Dashboard;