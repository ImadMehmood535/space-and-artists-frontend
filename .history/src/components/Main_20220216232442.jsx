import React, { Component, Fragment } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Footer from './footer/Footer';
import Header from './header/Header';
import Home from './home/Home';
import ArtistProfile from './artistProfile/ArtistProfile';
import Blog from './blog/Blog';
import BlogDetail from './blog/blogDetails/BlogDetail';
import SingUp from './register/SingUp';
import Leads from './leads/Leads';
import UserProfile from './userProfile/UserProfile';
import Policy from './policy/Policy';
import Terms from './policy/Terms';
import NotFound from './NotFound';
import SignIn from './register/SignIn';
import FAQ from './policy/FAQ';
import ResetPassword from './register/ResetPassword';
import About from './about/About';
import { User } from './admin/users/User';
import UserGalleryTable from './admin/userGallery/UserGalleryTable';
import { EditUser } from './admin/users/EditUser';
import CategoryTable from './admin/category/CategoryTable';
import AddCategory from './admin/category/AddCategory';
import CountryTable from './admin/country/CountryTable';
import CityTable from './admin/city/CityTable';
import ReviewTable from './admin/review/ReviewTable';
import Subscription from './admin/Subscriptions/subscription';
import Login from './admin/login/Login';
import Sidebar from './admin/Sidebar';
import Contact from './policy/Contact';
import PaymentForm from './payment/PaymentForm';
import Payments from './payment/Payments';
import PaymentStepper1 from './payment/PaymentStepper1';
import PaymentScreen2 from './payment/PaymentScreen2';
import PaymentScreen3 from './payment/PaymentScreen3';
import ClientPayment1 from './payment/ClientPayment1';
import ClientPayment2 from './payment/ClientPayment2';
import PlanState from "./payment/PlanState";
import ConfirmSubsciriptionPage from './payment/ThanksMessage';
import DeclinePaymentMessage from './payment/DeclinedPayments';
import Subscriptions from './subscriptions/subscriptions';

// Blogs
import Blogs from './admin/blogs/Blogs';
import AddBlog from './admin/blogs/AddBlog';
import EditBlog from './admin/blogs/EditBlog';



class fvMain extends Component {
  render() {
    return (
      <Fragment>
        <BrowserRouter>
          {this.props.adminLogin ? (
            <div className='DBlock h-auto MainAdminWrapper'>
              <div className='row'>
                <Sidebar />
                <Fragment>
                  <div className='col-lg-10 col-sm-11 col-11 py-3 px-3'>
                    <Redirect push to='/admin/users' />
                    <Switch>
                      <Route path='/admin/users' exact component={User} />
                      <Route path='/admin/users-gallery' exact component={UserGalleryTable} />
                      <Route path='/admin/edit-user/:id' exact component={EditUser} />
                      <Route path='/admin/category' exact component={CategoryTable} />
                      <Route path='/admin/add-category' exact component={AddCategory} />
                      <Route path='/admin/edit-category/:id' exact component={AddCategory} />
                      <Route path='/admin/country' exact component={CountryTable} />
                      <Route path='/admin/city' exact component={CityTable} />
                      <Route path='/admin/reviews' exact component={ReviewTable} />
                      <Route path='/admin/blogs' exact component={Blogs} />
                      <Route path='/admin/add-blog' exact component={AddBlog} />
                      <Route path='/admin/edit-blog' exact component={EditBlog} />
                      <Route path='/admin/subscriptions' exact component={Subscription} />
                      <Route path='/admin*' component={User} />
                    </Switch>
                  </div>
                </Fragment>
              </div>
            </div>
          ) : (
            <Fragment>
              <PlanState>
              <Header />
              <Switch>
                <Route path='/admin/' exact component={Login} />
                <Route path='/admin/*' component={Login} />
                <Route path='/' exact component={Home} />
                <Route path='/about-us' exact component={About} />
                <Route path='/blogs' exact component={Blog} />
                <Route path='/blog-detail/:id' exact component={BlogDetail} />
                <Route path='/sign-up' exact component={SingUp} />
                <Route path='/privacy-policy' exact component={Policy} />
                <Route path='/terms-and-condition' exact component={Terms} />
                <Route path='/faqs' exact component={FAQ} />
                <Route path='/contact-us' exact component={Contact} />
                <Route path='/profile' exact component={UserProfile} />

                <Route path='/usersubscribe' exact component={Subscriptions} />

                <Route path='/verify-account/:match' exact component={SignIn} />
                <Route path='/reset-password/:match' exact component={ResetPassword} />
                <Route path='/leads' exact component={Leads} />
                <Route path='/artist-profile/:id' exact component={ArtistProfile} />
                <Route path='/leads/:id' exact component={Leads} />
                <Route path='/payment-gateway' exact component={PaymentForm}/>
                <Route path='/payment1' exact component={Payments}/>
                <Route path='/payment2' exact component={PaymentScreen2}/>
                <Route path='/payment3' exact component={PaymentScreen3}/>
                <Route path='/client-payment1' exact component={ClientPayment1}/>
                <Route path='/client-payment2' exact component={ClientPayment2}/>
                <Route path='/confirmsubscription' exact component={ConfirmSubsciriptionPage}/>
                <Route path='/declinePayment' exact component={DeclinePaymentMessage}/>
                <Route path='*' component={NotFound} />
              </Switch>
              <Footer />
              </PlanState>
            </Fragment>
          )}
        </BrowserRouter>
      </Fragment>
    );
  }
}

export default Main;
