import React, {Component, useState} from 'react';

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = {error: null, errorInfo: null};
    }
    static getDerivedStateFromError(error) {
        // Mettez à jour l'état, de façon à montrer l'UI de repli au prochain rendu.
        return {hasError: true};
    };

    componentDidCatch(error, errorInfo) {
        // Catch errors in any components below and re-render with error message
        this.setState({
            error: error,
            errorInfo: errorInfo
        })
        // You can also log error messages to an error reporting service here
    };

    render() {
        if(this.state.hasError) {
            // Vous pouvez afficher n'importe quelle UI de repli.
            return <h1>Une erreur est survenue. {this.state.error?.message}</h1>;
        }

        return this.props.children;
    }
};
