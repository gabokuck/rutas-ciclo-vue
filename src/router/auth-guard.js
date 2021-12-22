

const isAuthenticadedGuard = async(to, from, next) => {

    return new Promise(() => {

        const ramdom = Math.random() * 100;

        if(ramdom > 50){
            console.log('esta autenticado')
            next()
        }else{
            console.log('Bloquedo por el isAuthenticadedGuard', ramdom)
            next({name: 'pokemon-home'})
        }

    })

    // console.log({to, from, next});

}

export default isAuthenticadedGuard;