import Vue from 'vue'
import Router from 'vue-router'
import routers from './router'
Vue.use(Router)

var router = new Router()
routers.forEach((o)=>{
  o(router)
})

export default router
