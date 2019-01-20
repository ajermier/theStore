import React, { Component } from 'react';
import { Products } from './components/Products';

export default class App extends Component {
    displayName = App.name

    render() {
        return (
            <Products />
        );
    }
}
