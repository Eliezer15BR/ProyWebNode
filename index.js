

const http=require('http');
const mysql=require('mysql2');

const db=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'proyweb'
});
const server = http.createServer((req, res) => {
    if (req.url === '/categorias'){
        db.query("SELECT * FROM Categoria", (err, rows) =>{
            if(err){
                res.writeHead(500);
                console.log(err);
                return res.end('Error en el query');
            }
            let html = bodyhtml()+`<h1>Listado de Categorias</h1>
            <table class="table table-dark">
            <tr>
                <td>Codigo de Categoria</td>
                <td>Nombre de la Categoria</td>
            </tr>`;
            rows.forEach( row => {
                html+=`<tr>
                <td>${row.codigo_categoria}</td>
                <td>${row.nombre_categoria}</td>
                </tr>`;
            });
            html+=`</table>`
            html+=finhtml()
            res.writeHead(200,{
                'Content-Type':'text/html'
            });
            res.end(html);
        });
    }
    else if(req.url=='/'){
        let html=bodyhtml()+`Bienvenidos a la página de el CRUD de categorías, subcategorías y productos`+finhtml();
        res.writeHead(200,{
            'Content-Type':'text/html'
        });
        res.end(html);
    }
    else if(req.url=='/subcategorias'){
        db.query("SELECT * FROM Subcategoria xs JOIN Categoria xc ON xs.codigo_categoria=xc.codigo_categoria", (err, rows) =>{
            if(err){
                res.writeHead(500);

                return res.end('Error en el query'+err);
            }
            let html=bodyhtml()+`<h1>Listado de Subcategorías</h1>
            <table class="table table-dark">
            <tr>
                <td>Codigo de Subcategoria</td>
                <td>Nombre de la Subcategoria</td>
                <td>Nombre de la Categoria</td>
            </tr>`;
            rows.forEach(row=>{
                html+=`<tr>
                <td>${row.codigo_subcategoria}</td>
                <td>${row.nombre_subcategoria}</td>
                <td>${row.nombre_categoria}</td>
                </tr>`;
            });
            html+=`</table>`
            html+=finhtml()
            res.writeHead(200,{
                'Content-Type':'text/html'
            });
            res.end(html);
        });
    }
    else if(req.url=='/articulos'){
        db.query("SELECT * FROM Articulo xa JOIN Subcategoria xs ON xa.codigo_subcategoria=xs.codigo_subcategoria JOIN Categoria xc ON xa.codigo_categoria=xc.codigo_categoria ", (err, rows) =>{
            if(err){
                res.writeHead(500);
                return res.end('Error en el query'+err);
            }
            let html=bodyhtml()+`<h1>Listado de Subcategorías</h1>
            <table class="table table-dark">
            <tr>
                <td>Codigo del Articulo</td>
                <td>Nombre del Articulo</td>
                <td>Nombre de la Subcategoria</td>
                <td>Nombre de la Categoria</td>
            </tr>`;
            rows.forEach(row=>{
                html+=`<tr>
                <td>${row.codigo_articulo}</td>
                <td>${row.nombre_articulo}</td>
                <td>${row.nombre_subcategoria}</td>
                <td>${row.nombre_categoria}</td>
                </tr>`;
            });
            html+=`</table>`
            html+=finhtml()
            res.writeHead(200,{
                'Content-Type':'text/html'
            });
            res.end(html);
        });
    }
    else{
        res.writeHead(404);
        res.end('Ruta no encontrada');
    }
});
server.listen(3000, ()=>{
    console.log('Servidor corriendo en http://localhost:3000/');
});

const css=function(){
    const css=`
    :root{
        --colorMenu:rgb(3, 33, 34);
        --colorContenido:rgb(1, 1, 85);
        --colorFooter:black;
        --colorMenuHover:rgb(212, 255, 255);
        --espacioMenu:250px;
    }

    body{
        display: grid;
        grid-template-columns: 2fr 8fr;
        grid-template-rows: 1fr 8fr auto;
        grid-template-areas: "header header"
                                "main main"
                                "footer footer";
        height: 100vh;
    }
    header{
        grid-area: header;
        margin-left: var(--espacioMenu);
    }
    footer{
        grid-area: footer;
        margin-left: var(--espacioMenu);
    }
    header,
    footer{
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        background-color: var(--colorFooter);
        min-height: 5em;
    }
    nav{
        position: fixed;
        height: 100vh;
        width: var(--espacioMenu);
        display: flex;
        flex-direction: column;
        background: var(--colorMenu);
    }
    nav a{
        display: flex;
        align-items: center;
        flex: 1;
        padding: 25px;
        background-color: var(--colorMenu);
        color:rgb(132, 255, 255);
        text-decoration: none;
        font-size: 20px;
    }
    nav a:hover{
        background-color: var(--colorMenuHover);
        transition: .5s;
    }
    main{
        margin-left: var(--espacioMenu);
        grid-area: main;
        background-color: var(--colorContenido);
        padding: 25px;
        color: #fff;
    }
    `;
    return css;
}
const bodyhtml=function(){
    let html=`<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Proyecto WebIII</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">
    <style>
      ${css()}  
    </style>
</head>
  <body>
    <header>
        <h1>Proyecto Final Web III</h1>
    </header>
    <nav>
        <a href="/">Inicio</a>
        <a href="/categorias">Categorias</a>
        <a href="/subcategorias">Subcategorias</a>
        <a href="/articulos">Articulos</a>
    </nav>
    <main>`;
    return html
};
const finhtml=function(){
    let finhtml=`</main>
 <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
    <footer>
        2025
    </footer>
</body>
</html>`;
    return finhtml;
};