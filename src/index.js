import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {configureStore} from "./redux/store/configureStore";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './index.css';
import 'font-awesome/css/font-awesome.css';
import 'toastr/build/toastr.css';

export const store = configureStore();

const WithRouter = () => (
    <MuiThemeProvider>
        <BrowserRouter onUpdate={() => window.scrollTo(0, 0)}>
            <Provider store={store}>
                <App/>
            </Provider>
        </BrowserRouter>
    </MuiThemeProvider>
);

ReactDOM.render(<WithRouter />, document.getElementById('root'));
registerServiceWorker();
