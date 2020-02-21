import React from 'react';
import ReactDOM from 'react-dom';
import Page from './Component/Page';
import 'antd/dist/antd.css';
import { BrowserRouter } from 'react-router-dom';



ReactDOM.render(<BrowserRouter><Page /></BrowserRouter>, document.getElementById('app'));