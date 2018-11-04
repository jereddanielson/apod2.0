import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router} from 'react-router-dom';
import 'normalize.css';

import App from './components/App';

ReactDOM.render(<Router><App /></Router>, document.getElementById('app'));
