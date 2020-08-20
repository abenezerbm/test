'use strict';

const Hapi = require('@hapi/hapi');
const Joi = require('@hapi/joi');
const Boom = require('@hapi/boom');
const { bool } = require('@hapi/joi');

const init = async () => {

    const server = Hapi.server({
        port: 6000,
        host: '0.0.0.0'
    });

    
    const getDate= {
        name: 'getDate',
        version: '1.0.0',
        register: async function(server , options){
            const currentDate = function(){
                const date = new Date();
                console.log(date);
                return date;
            }
            server.decorate('toolkit', 'getDate' ,currentDate);
        }
    };

    await server.register({plugin:getDate });


    server.state('username', {
        ttl:null,
        isSecure: true,
        isHttpOnly: true
    });


    // server.ext('onRequest', function (request ,h){
    //     request.setUrl('/test');
    //     return h.continue;
    // });
    

    server.route(
        {
            method: 'POST',
            path : '/',
            handler: function(request , h ){
                try{
                    console.log(request);
                    return h.response(request.payload);
                }catch(error){
            console.log(error);
            
        }
                
                
            }
        }
    );

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection' , (err)=>{
    console.log(err);
    process.exit(1);
});

init();