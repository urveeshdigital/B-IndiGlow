import React from 'react';

const Tabs = ({ activeTab, setActiveTab }) => {
  const tabList = ['overview', 'edit', 'payment'];

  return (
    <div className="tabs">
      {tabList.map((tab) => (
        <div
          key={tab}
          className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
          onClick={() => setActiveTab(tab)}
        >
          {tab === 'overview' && 'Overview'}
          {tab === 'edit' && 'Edit Profile'}
          {tab === 'payment' && 'Payment'}
        </div>
      ))}
    </div>
  );
};

export default Tabs;
