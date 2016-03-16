// SERVER.JS - Minimilistic Web server 
// v1.0.1
'use strict';

var http = require('http')
    , fs = require('fs')
    , path = require('path')
    , url = require('url')
    , mimeMap = require('./config/mimemap');
    
const STATIC_FOLDER = 'public';

var server = http.createServer(function(req, res){
    handleRoute(req, res)();
});
server.listen(process.env.PORT || '3000', '0.0.0.0', function(){
    var info = server.address();
    console.log('Server ready, listening on http://%s:%s', 
        info.address, info.port);
});

// create a function to handle the different paths
function handleRoute (req, resp){
    console.log(req.method, req.url);
    
    var parsedUrl = url.parse(req.url);
    var pathname = parsedUrl.pathname;
    
    if(req.method.toUpperCase() === 'GET'){
        // assume is a resource static file. ///////
        return function(done){
            done = done || function(){};
            var file = pathname === '/' ? 'index.html' : pathname;
            
            // test if we have a file to serve 
            if(!/\..+$/g.test(file)){
                resp.writeHead(404); 
                return resp.end(`resource ${file} not found.`);
            }
                        
            respWriteFile(file, resp, done);
        };
    }
    
    resp.writeHead(404); 
    resp.end(`invalid route ${pathname}`);
}

// UTILS /////////////
function readFile (file, done){
    file = path.join(__dirname, STATIC_FOLDER, file);
    fs.stat(file, function(err, stats){
        if(err) return done(err);
        
        try { 
            var rs = fs.createReadStream(file);
            setImmediate(function(){ 
                done(null, {size: stats.size, file: rs});
            });
        }
        catch(e) { 
            return done(new Error('failed while reading (%s). Details: %s', 
                file, e.stack));
        }
    });
}

function respWriteFile( file, resp, done){
    readFile(file, function(err, fi){
        if(err){
            console.error('failed while reading index.html file.  ' + 
                'Details: ' + err.stack);
            resp.writeHead(404); 
            return resp.end(`${file} not found.`, done);
        }
        
        var contentType = mimeMap[path.extname(file)] || 'text/html';
        resp.writeHead(200, {
            'content-type': contentType,
            'content-length': fi.size
        });
        
        fi.file.pipe(resp).once('finish', done);
    });
}

