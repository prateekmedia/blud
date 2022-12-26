import React from 'react';
import { Layout, Menu, theme, Card, ConfigProvider } from 'antd';
import { WarningOutlined, PhoneOutlined } from '@ant-design/icons';
import RightMenu from "./right";
import "./App.css";
import Navbar from './navbar';


const { Header, Content, Footer } = Layout;
const { Meta } = Card;

let rows = 10;

const App = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#d33f49',
        },
      }}
    >
      <Layout className="layout">
        <Navbar />
        <Content style={{ padding: '20px 20px', maxWidth: '900', display: 'flex', flexWrap: "wrap", justifyContent: 'space-evenly', gap: '20px 20px' }}>
          {[...Array(10)].map((x, i) =>
            <Card
              style={{ width: 300 }}
              cover={
                <img
                  alt="example"
                  src="https://miro.medium.com/max/1200/1*qYUvh-EtES8dtgKiBRiLsA.png"
                />
              }
              actions={[
                <PhoneOutlined key="phone" />,
                <WarningOutlined key="report" />,
              ]}
            >
              <Meta
                title="Blood Camp Nearby"
                description="17 March - 25 April, 08:00-17:00"
                extra={<a href="#">More</a>}
              />
            </Card>
          )}
        </Content>
        <Footer style={{ textAlign: 'center' }}>BLUD ©2022</Footer>
      </Layout>
    </ConfigProvider>
  );
};

export default App;