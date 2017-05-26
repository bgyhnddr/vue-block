import Hello from '../sys/src/components/Hello'

export default (router) => {
  router.addRoutes([{
    path: '/',
    name: 'Hello',
    component: Hello,
    children: [{
      path: 'demo',
      component: Hello
    }]
  }])

  router.addRoutes([{
    path: '/',
    name: 'Hello',
    component: Hello,
    children: [{
      path: 'demo2',
      component: Hello
    }]
  }])
}
