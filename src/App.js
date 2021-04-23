import React, {useEffect, Suspense, lazy} from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from './components/Loading/Loading';
import Navbar from './components/nav/Navbar';
import Home from './pages/home/Home';
import Footer from './components/footer/Footer';
import {currentUser} from './functions/auth';
import { restoreBag } from './store/actions/cart';
import {auth} from './firebase';

const Logout = lazy(() => import('./pages/auth/logout/Logout'));
const Login = lazy(() => import('./pages/auth/login/Login'));
const Register = lazy(() => import('./pages/auth/register/Register'));
const Shop = lazy(() => import('./pages/shop/Shop'));
const SingleProduct = lazy(() => import('./pages/SingleProduct/SingleProduct'));
const OrderSuccess = lazy(() => import('./pages/OrderSuccess/OrderSucces'));
const UserRoute = lazy(() => import('./routes/UserRoute'));
const Account = lazy(() => import('./pages/Account/Account'));
const UserOrders = lazy(() => import('./pages/Account/UserOrders'));
const PasswordChange = lazy(() => import('./pages/Account/PasswordChange'));
const AdminRoute = lazy(() => import('./routes/AdminRoute'));
const Dashboard = lazy(() => import('./pages/Dashboard/Dashboard'));
const Products = lazy(() => import('./pages/Dashboard/Products'));
const CreateProduct = lazy(() => import('./pages/Dashboard/CreateProduct'));
const EditProduct = lazy(() => import('./pages/Dashboard/EditProduct'));
const AdminOrders = lazy(() => import('./pages/Dashboard/AdminOrders'));

const App = () => {
   let dispatch = useDispatch();
   let { auth: user } = useSelector(state => ({...state}));

   useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(async(user) => {
         if (user) {
            const {token} = await user.getIdTokenResult();
            currentUser(token)
            .then(({data}) => {
               dispatch({type: 'AUTH_SUCCESS', payload: {email: data.email, role: data.role, token}});
               dispatch(restoreBag(token));
            })
         } else {
            dispatch({type: 'AUTH_FALSE'});
            dispatch(restoreBag());
         }
      })
      return () => unsubscribe();
   }, [dispatch]);

   const setRoutes = () => {
      if (user === false) {
         return [
               <Route path="/login" component={Login} key="login"/>,
               <Route path="/register" component={Register} key="register"/>
         ]
      } else if (user.role === 'subscriber') {
         return [
               <Route path="/logout" component={Logout} key="logout"/>,
               <Route path="/order/success/:sessionId" component={OrderSuccess} key='orderSuccess'/>,
               <UserRoute path="/account/orders" user={user} component={UserOrders} key="orders"/>,
               <UserRoute path="/account/password" user={user} component={PasswordChange} key="passChange"/>,
               <UserRoute path="/account" user={user} component={Account} key="account"/>
         ]
      } else if (user.role === 'admin') {
         return [
               <Route path="/logout" component={Logout} key="logout"/>,
               <Route path="/order/success/:sessionId" component={OrderSuccess} key='orderSuccess'/>,
               <AdminRoute path="/dashboard/products" user={user} component={Products} key="products"/>,
               <AdminRoute path="/dashboard/create" user={user} component={CreateProduct} key="create"/>,
               <AdminRoute path="/dashboard/edit/:id" user={user} component={EditProduct} key="edit"/>,
               <AdminRoute path="/dashboard/orders" user={user} component={AdminOrders} key="orders"/>,
               <AdminRoute path="/dashboard" user={user} component={Dashboard} key="dash"/>,
         ]
      };
   };

  return <>
   {
      user === null 
      ? <Loading height="100vh"/>
      : <>
            <ToastContainer/>
            <Navbar isAuth={user} role={user.role}/>
               <Suspense fallback={<Loading height='100vh'/>}>
                  <Switch>
                     <Route exact path="/home" component={Home}/>
                     <Route path="/shop/:category" component={Shop}/>
                     <Route path="/shop" component={Shop}/>
                     <Route path="/product/:slug" component={SingleProduct}/>
                     {setRoutes()}
                     <Redirect to="/home"/>
                  </Switch>
               </Suspense>
            <Footer/>
         </>
   }
   </>
}

export default App;