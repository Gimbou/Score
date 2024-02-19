// REMOVE "_example" FROM THE FILE NAME AND ADD TAG
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
Promise.all([
    new Promise((resolve) => {
        var script = document.createElement('script');
        script.src = "https://www.googletagmanager.com/gtag/js?id=##TAG##";
        script.async = true;
        document.body.appendChild(script);
        resolve();
    }), 
    new Promise((resolve) => {
        gtag('js', new Date());
      
        gtag('config', '##TAG##');
        resolve();
    })
]);