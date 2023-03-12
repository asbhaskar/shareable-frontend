import { useState } from 'react'
import { Route, HashRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import Sidebar from './components/Sidebar/Sidebar'
import Layout from './layout/Layout'
import Dashboard from './pages/Dashboard'
import routes from './routes'

const App = () => {
    return (
        <>
            {/* TODO: get rid of hashrouter */}
            <Router>
                <Layout>
                    {/* <p>TEST</p> */}
                    <Routes>
                        {routes.map(({ path, element }) => (
                            <Route key={path} path={path} element={element}></Route>
                        ))}
                    </Routes>
                </Layout>
            </Router>
        </>
    )
}

export default App
