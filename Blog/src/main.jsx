import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthLayout, Login,Signup } from './components/index.js'
import Home from './components/pages/Home'
import AllPosts from './components/pages/AllPosts'
import AddPost from './components/pages/AddPost'
import EditPost from './components/pages/EditPost'
import Post from './components/pages/Post'

const router=createBrowserRouter([
  {
   path:'/',
   element:<App/>,
   children:[
    {
      path:'/',
      element:<Home/>,
    },
    {
      path:'/login',
      element:(
        <AuthLayout authentication={false}>
<Login/>
        </AuthLayout>
      )
    },
     {
            path: "/signup",
            element: (
                <AuthLayout authentication={false}>
                    <Signup />
                </AuthLayout>
            ),
        },
        {
            path: "/all-posts",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AllPosts />
                </AuthLayout>
            ),
        },
        {
            path: "/add-post",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <AddPost />
                </AuthLayout>
            ),
        },
        {
            path: "/edit-post/:slug",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <EditPost />
                </AuthLayout>
            ),
        },
        {
            path: "/post/:slug",
            element: <Post />,
        },
   ]
}])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>
  </StrictMode>,
)
