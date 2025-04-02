import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import UserProfile from '@/components/User/UserProfile.vue'
import UserOrders from '@/components/User/UserOrders.vue'
import UserData from '@/components/User/UserData.vue'
import UserFavourite from '@/components/User/UserFavourite.vue'
import Catalog from '@/views/Catalog.vue'
import ItemDetail from '@/components/ItemDetail.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import SignUp from '@/components/User/SignUp.vue'
import SignIn from '@/components/User/SignIn.vue'
import EmailPwd from '@/components/User/Email-Pwd.vue'
import Checkout from '@/components/Checkout.vue'
import AboutView from '@/views/AboutView.vue'
import ContactView from '@/views/ContactView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: ContactView
    },
    {
      path: '/catalog',
      name: 'catalog',
      component: Catalog
    },
    {
      path: '/item/:id',
      name: 'item',
      component: ItemDetail
    },
    {
      path: '/sign-up/',
      name: 'sign-up',
      component: SignUp
    },
    {
      path: '/sign-in/',
      name: 'sign-in',
      component: SignIn
    },
    {
      path: '/email-confirmation/',
      name: 'email-confirmation',
      component: EmailPwd
    },
    {
      path: '/user',
      name:'user',
      component: UserProfile,
      children: [
        { path: 'data', name:'data', component: UserData },
        { path: 'orders', name:'orders', component: UserOrders },
        { path: 'favourite', name:'favourite', component: UserFavourite },
      ],
    },
    {
      path: '/checkout/:id',
      name: 'checkout',
      component: Checkout
    },
    { path: '/:pathMatch(.*)*', component: NotFoundView },
  ],
})

export default router
