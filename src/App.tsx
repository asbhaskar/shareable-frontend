import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Layout from './layout/Layout';
import routes from './routes';
import { AuthProvider } from '@context/AuthaContext';

const App = () => {
    return (
        <>
            <Router>
                <AuthProvider>
                    <Layout>
                        <Routes>
                            {routes.map(({ path, element }) => (
                                <Route key={path} path={path} element={element}></Route>
                            ))}
                        </Routes>
                    </Layout>
                </AuthProvider>
            </Router>
        </>
    );
};

export default App;
