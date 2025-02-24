import React from 'react';
import { Redirect, Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import TasksPage from './pages/TasksPage';

const App: React.FC = () => {
    const isAuthenticated = !!localStorage.getItem('token');

    return (
        <Router>
            <Switch>
                <Route path="/login" component={LoginPage} />
                <Route path="/register" component={RegisterPage} />
                <Route path="/tasks">
                    {isAuthenticated ? <TasksPage /> : <Redirect to="/login" />}
                </Route>
                <Route path="/">
                    <Redirect to={isAuthenticated ? "/tasks" : "/login"} />
                </Route>
            </Switch>
        </Router>
    );
};

export default App;
