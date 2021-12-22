
import { createRouter, createWebHashHistory } from 'vue-router'
import isAuthenticadedGuard from './auth-guard';


const routes = [
    {
        path: '/',
        redirect: '/pokemon'
    },
    {
        path: '/pokemon',
        name: 'pokemon',
        component: () => import(/* webpackChunkName: "Pokemon Layout" */'@/modules/pokemon/layouts/PokemonLayout.vue'),
        children: [
            { 
                path: 'home',
                name: 'pokemon-home',
                component: () => import(/* webpackChunkName: "ListPage" */'@/modules/pokemon/pages/ListPage.vue') 
            },
            { 
                path: 'about',
                name: 'pokemon-about',
                component: () => import(/* webpackChunkName: "AboutPage" */'@/modules/pokemon/pages/AboutPage.vue') 
            },
            { 
                path: 'pokemonid/:id',
                name: 'pokemon-id',
                component: () => import(/* webpackChunkName: "PokemonPage" */'@/modules/pokemon/pages/PokemonPage.vue'),
                props: (route) => {
                    
            
                    const id = Number(route.params.id);

                    return isNaN(id) ? {id:1} : { id: id}
                }
            },
            {
                path: '',
                redirect: { name: 'pokemon-about' }
            }
        ]

    },
    {
        path: '/dbz',
        name: 'dbz',
        beforeEnter: [ isAuthenticadedGuard ],
        component: () => import(/* webpackChunkName: "DBZ Layout" */'../modules/dbz/layouts/DbzLayout.vue'),
        children: [
            { 
                path: 'characters',
                name: 'dbz-characters',
                // beforeEnter: [ isAuthenticadedGuard ],
                component: () => import(/* webpackChunkName: "DBZ characters" */'../modules/dbz/pages/Characters.vue') 
            },
            { 
                path: 'about',
                name: 'dbz-about',
                component: () => import(/* webpackChunkName: "DBZ About" */'../modules/dbz/pages/About.vue') 
            },
            {
                path: '',
                redirect: { name: 'dbz-characters' }
            }
        ]
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

// Guard Global - Sincrono
// router.beforeEach((to, from, next) => {
//     console.log({to, from, next});

//     const random = Math.random() * 100

//     if(random > 50){
//         console.log('Autendicado');
//         next()
//     }else{
//         console.log(random, 'bloquedo por el beforeEach');
//         next({name: 'pokemon-home'})
//     }

    
// })

const canAccess = () => {
    return new Promise(resolve => {

        const random = Math.random() * 100

        if(random > 50){
            console.log('Autendicado -  canAccess');
            resolve(true)
        }else{
            console.log(random, 'bloquedo por el beforeEach - canAccess');
            resolve(false)
        }

    })
}

// Guard Asyncrono

// router.beforeEach( async(to,from,next) => {

//     const authorized = await canAccess()

//     authorized 
//         ? next()
//         : next({name: 'pokemon-home'})

// })


//

export default router;
  