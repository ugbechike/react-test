import React from 'react';
import Navbar from './components/Navbar';
import Body from './components/Body';
import Footer from './components/Footer';

export default class App extends React.Component {
    render() {
        return (
            <div>
                <Navbar />
                <div style={{backgroundColor: "#f3f2f2"}}>

                <br />
                <Body />
                </div>
                <Footer />
            </div>
        );
    }
}