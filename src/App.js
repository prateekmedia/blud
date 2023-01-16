import React, { useEffect, useState } from 'react';
import { Layout, Card, Button } from 'antd';
import { WarningOutlined, PhoneOutlined } from '@ant-design/icons';
import { BludContractAddress } from './config.js';
import BludAbi from './BludContract.json';
import { ethers } from 'ethers'

import "./App.css";
import Navbar from './navbar';

const { Content, Footer } = Layout;
const { Meta } = Card;

const App = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [currentAccount, setCurrentAccount] = useState('');

  const [blud, setBlud] = useState({
    name: '',
    startDate: new Date(),
    endDate: new Date(),
    phone: '',
    lat: 0,
    long: 0,
  });
  const [bluds, setBluds] = useState([]);

  const connectWallet = async () => {
    try {
      const { ethereum } = window
      if (!ethereum) {
        console.log('Metamask not detected')
      }

      let accounts = await ethereum.request({ method: 'eth_requestAccounts' })
      console.log('Found Account ', accounts[0])
      setIsUserLoggedIn(true)
      setCurrentAccount(accounts[0])
      getAllBluds()

    } catch (error) {
      console.log(error);
    }
  }

  const getAllBluds = async () => {
    try {
      const { ethereum } = window
      if (ethereum) {
        const provider = ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const BludContract = new ethers.Contract(
          BludContractAddress,
          BludAbi.abi,
          signer
        )
        let bluds = await BludContract.getBluds()
        setBluds(bluds)
      } else {
        console.log('Metamask not detected')
      }
    } catch (error) {
      console.log(error)
    }
  }
  const addBlud = async e => {
    e.preventDefault()

    try {
      const { ethereum } = window
      if (ethereum) {
        const provider = ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const BludContract = new ethers.Contract(
          BludContractAddress,
          BludAbi.abi,
          signer
        )
        BludContract.addBlud(blud.name, blud.startDate, blud.endDate, blud.phone, blud.lat, blud.long).then(res => {
          // setBluds([...tasks, task])
          console.log('Added Task')
        }).catch(err => { console.log(err) })
      } else {
        console.log('Metamask not detected')
      }
    } catch (error) {
      console.log(error)
    }
  }
  const reportBlud = key => async () => {
    try {
      const { ethereum } = window
      if (ethereum) {
        const provider = ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const BludContract = new ethers.Contract(
          BludContractAddress,
          BludAbi.abi,
          signer
        )
        const reportTx = await BludContract.reportBlud(key)
        console.log("Successfully Reported: ", reportTx);
        let bluds = await BludContract.getBluds()
        setBluds(bluds)
      } else {
        console.log('Metamask not detected')
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    connectWallet()
  }, [])

  return (
    isUserLoggedIn ?
      <Layout className="layout">
        <Navbar
          setBlud={setBlud}
          blud={blud}
          addBlud={addBlud}
        />
        <Content style={{ padding: '20px 20px', maxWidth: '900', display: 'flex', flexWrap: "wrap", justifyContent: 'space-evenly', gap: '20px 20px' }}>
          {[...Array(10)].map((x, i) => {
            let distance = Math.floor(Math.random() * 10)
            return <Card
              style={{ width: 300 }}
              cover={<div style={{ width: "100%" }}>
                <iframe title='Map' width="100%" height="200" frameborder="0" marginheight="0" marginwidth="0" src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=29.208514556408236,79.49372291564943+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed">
                </iframe></div>}
              actions={[
                <PhoneOutlined key="phone" onClick={function () {
                  navigator.clipboard.writeText("Hello");
                  alert("Phone number copied!");
                }} />,
                <WarningOutlined key="report" onClick={function () {
                  alert("Successfully Reported!");
                }} />,
              ]}
            >
              <Meta
                title={"Blood Camp - " + distance + "m away"}
                description="17 March - 25 April, 08:00-17:00" />
            </Card>;
          }
          )}
        </Content>
        <Footer style={{ textAlign: 'center' }}>BLUD ©2022</Footer>
      </Layout> : <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Button type="primary" onClick={connectWallet}>Connect Wallet</Button>
      </div>
  );
};

export default App;