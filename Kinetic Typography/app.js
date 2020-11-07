class App{
    constructor(){
        WebFont.load({
            google: {
              families: ['Hind:700']
            },
            fontactive: () => {

            }
        });
    }
}

window.onload = () => {
    new App();
}