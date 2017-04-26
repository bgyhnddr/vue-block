import Hello from '../sys/src/components/Hello'

export default function(router) {
  router.addRoutes([{
    path: '/',
    name: 'Hello',
    component: Hello
  }])
}
