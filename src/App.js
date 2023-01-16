import React, { useEffect, useState } from 'react';
import { Layout, Card, Button } from 'antd';
import { WarningOutlined, PhoneOutlined } from '@ant-design/icons';
import { BludContractAddress } from './config.js';
import BludAbi from './BludContract.json';
import { ethers } from 'ethers'
import { getDistanceWithSuffix } from './helpers.js'

import "./App.css";
import Navbar from './navbar';

const { Content, Footer } = Layout;
const { Meta } = Card;

const App = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  // const [currentAccount, setCurrentAccount] = useState('');
  const [location, setLocation] = useState({});

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
      // setCurrentAccount(accounts[0])
      getAllBluds()
      navigator.geolocation.getCurrentPosition(position => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
      });

    } catch (error) {
      console.log(error);
    }
  }

  const getAllBluds = async () => {
    try {
      const { ethereum } = window
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
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
  const addBlud = async (selectedLocation, startDate, endDate, phoneNumber, onSuccess) => {
    console.log(startDate, endDate, phoneNumber);
    try {
      const { ethereum } = window
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const BludContract = new ethers.Contract(
          BludContractAddress,
          BludAbi.abi,
          signer
        )
        BludContract.addBlud("Blood Camp", startDate.toISOString(), endDate.toISOString(), phoneNumber, Math.floor((selectedLocation.lat * 100000000000000)), Math.floor((selectedLocation.lng * 100000000000000))).then(res => {
          // setBluds([...tasks, task])
          console.log('Added Blud')
          onSuccess();
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
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const BludContract = new ethers.Contract(
          BludContractAddress,
          BludAbi.abi,
          signer
        )
        const reportTx = await BludContract.reportBlud(key)
        console.log("Successfully Reported: ", reportTx);

        alert("Successfully Reported!");

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    isUserLoggedIn ?
      <Layout className="layout">
        <Navbar
          addBlud={addBlud}
        />
        <Content style={{ padding: '20px 20px', maxWidth: '900', display: 'flex', flexWrap: "wrap", justifyContent: 'space-evenly', gap: '20px 20px' }}>
          {bluds.map((blud, i) => {
            let lat = blud.lat / 100000000000000
            let long = blud.long / 100000000000000

            let url = "https://maps.google.com/maps?width=100%25&height=600&hl=en&q=" + lat + "," + long + "&t=&z=14&ie=UTF8&iwloc=B&output=embed"

            let startDate = blud.startDate === '' ? Date.now() : blud.startDate
            let endDate = blud.endDate === '' ? Date.now() : blud.endDate
            let formattedStartDate = new Date(startDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric"
            })
            let formattedEndDate = new Date(endDate).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric"
            })
            let formattedStartTime = new Date(startDate).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit"
            })
            let formattedEndTime = new Date(endDate).toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit"
            })

            return <Card
              style={{ width: 300 }}
              cover={<div style={{ width: "100%" }}>
                <iframe title='Map' width="100%" height="200" frameborder="0" marginheight="0" marginwidth="0" src={url}>
                </iframe></div>}
              actions={[
                <PhoneOutlined key="phone" onClick={function () {
                  navigator.clipboard.writeText(blud.phoneNumber);
                  alert("Phone number copied!");
                }} />,
                <WarningOutlined key="report" onClick={
                  reportBlud(blud.id)
                } />,
              ]}
            >
              <Meta
                title={blud.name + (Object.keys(location).length === 0 ? "" : " - " + getDistanceWithSuffix(lat, long, location.lat, location.lng))}
                description={formattedStartDate + " - " + formattedEndDate + ", " + formattedStartTime + "-" + formattedEndTime} />
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