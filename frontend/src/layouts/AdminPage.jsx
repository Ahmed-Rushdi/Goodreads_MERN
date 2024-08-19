// import React from 'react';
import { Tabs, ConfigProvider } from 'antd';
import AuthorsAdminPanel from '../components/Admin/AuthorsPanel';
const theme = {
  token: {
    colorPrimary: '#D4A373', // Primary color
    colorBgContainer: '#CCD5AE', // Background color for containers
    colorBgLayout: '#E9EDC9', // Background color for layouts
    colorBgElevated: '#FEFAE0', // Background color for elevated elements (like modals)
    colorBorder: '#FAEDCD', // Border color
    colorText: '#000000', // Text color (can also be customized for specific elements)
    colorLink: '#D4A373', // Link color
  },
};

const items = [
  {
    key: '1',
    label: <span className="mx-5">Books</span>,
    className: 'books-tab',
    // children: <BooksAdminPanel />,
  },
  {
    key: '2',
    label: <span className="mx-5">Authors</span>,
    children: <AuthorsAdminPanel />,
  },
  {
    key: '3',
    label: <span className="mx-5">Categories</span>,
    children: 'Content of Tab Pane 3',
  },
];

const AdminPage = () => {
  return (
    <ConfigProvider
      theme={theme}
    >
      <Tabs defaultActiveKey="1" items={items}/>
    </ConfigProvider>
  );
};

export default AdminPage;

