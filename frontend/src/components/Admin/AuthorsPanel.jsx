import { Avatar, List, Button } from 'antd';
const data = [
  ...Array.from({length: 10}, (_, index) => ({
    title: `Author ${index + 1}`,
    avatar: '',
    description: `About Author ${index + 1}`,
  })),
];

const AuthorsAdminPanel = () => (
  <>
  <Button type="link" key="edit">Add new Author</Button>  
  <List
    itemLayout="horizontal"
    dataSource={data}
    renderItem={(item, index) => (
      <List.Item actions={[<Button type="link" key="edit">Edit</Button>]}>
        <List.Item.Meta
          avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
          title={<a href="https://ant.design">{item.title}</a>}
          description={item.description}
        />

      </List.Item>
    )}
  />
  </>
);
export default AuthorsAdminPanel;
