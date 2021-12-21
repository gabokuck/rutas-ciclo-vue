
import { createRouter, createWebHashHistory } from 'vue-router'


const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    { 
        path: '/home',
        name: 'home',
        component: () => import(/* webpackChunkName: "ListPage" */'../modules/pokemon/pages/ListPage.vue') 
    },
    { 
        path: '/about',
        name: 'about',
        component: () => import(/* webpackChunkName: "AboutPage" */'../modules/pokemon/pages/AboutPage.vue') 
    },
    { 
        path: '/pokemonid/:id',
        name: 'pokemonid',
        component: () => import(/* webpackChunkName: "PokemonPage" */'../modules/pokemon/pages/PokemonPage.vue'),
        props: (route) => {
            
    
            const id = Number(route.params.id);

            return isNaN(id) ? {id:1} : { id: id}
        }
    },
    { 
        path: '/:pathMatch(.*)*',
        component: () => import(/* webpackChunkName: "NotPageFound" */'../modules/shared/components/NotPageFound.vue') 
    }
  ]


const router = createRouter({

    history: createWebHashHistory(),
    routes, 
})

export default router;
  