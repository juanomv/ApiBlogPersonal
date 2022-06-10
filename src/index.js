import app from './app'
const puerto = process.env.PORT || 8080;
const main = async ()=>{
    try {
        await app.listen(puerto ,()=>{
            console.log(`sevidor corriendo en el puerto ${puerto}`);
        });
    } catch (error) {
        console.log('fallo al correr el servidor :',error)
    }
   
}

main();
