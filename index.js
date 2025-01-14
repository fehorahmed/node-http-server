import { createServer } from 'http';
import { deleteGuitar, getGuitars, saveGuitar } from './data.js';
import { createList, createListItem, getForm, getGuitarContent, view } from './content.js';
import { parse } from 'querystring';
import { readFile } from 'fs/promises';

const server = createServer(async (request, response) => {



    //delete/id
    const parts = request.url.split('/');
    const guitars =getGuitars();
    if (request.method == 'POST') {


        let body ='';

        request.on('readable',()=>{
            const data = request.read();
            if(data!= null){
                body +=data;
            }
        });
        request.on('end',()=>{
            const guitar = parse(body);
            saveGuitar({
                make: guitar.guitar_make,
                model: guitar.guitar_model,
            });

            redirect(response,'/');
        })


    } else {

        if (parts.includes('delete')) {
            handleDelete(parts[2]);
            redirect(response, '/');
        }else if(request.url == '/asset/css/style.css'){
            try{
                const cssFileName = './public/asset/css/style.css';
                const css = await readFile(cssFileName,{encoding: 'utf8'});
                response.end(css);
            }catch(err){
                response.statusCode = '404';
                response.end();
            }
        } else {


            response.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
            const url = new URL(request.url, 'http://localhost:3000');
            const id = url.searchParams.get('id');

            let content = '';

            if (parts.includes('add')) {
                content = getForm();
            } else if (id) {
                const guitar = guitars.find(g => g.id == id);
                content = getGuitarContent(guitar);
            } else {
                content = createList(guitars);
            }

            response.end(view(content));

        }

    }
});


function handleDelete(id) {
    deleteGuitar(id)
   
}

function redirect(response, to) {
    response.writeHead(302, { location: to, 'Content-Type': 'text/plain' });
    response.end(`Redirect to ${to}`);
}


server.listen(3000, () => {
    console.log(`Server is listening at http://localhost:${server.address().port}`);
});

