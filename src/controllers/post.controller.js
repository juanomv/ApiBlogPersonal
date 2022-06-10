
import conexion from "../database/conexion";
import {uuid} from 'uuidv4'

export  function getPost(req, res) {
  
    conexion.query('select p.*,group_concat(i.url) as urls from Post as p left join Image as i on i.post=p.id group by p.id order by fecha desc',function(err,results,flieds) {
      if (err) {
        res.json({err})
      }
      var rows=[]
      results.map(post=>{
        var urls =[];
        if(post.urls!=null){
         urls = post.urls.split(',');
        }
        
        rows.push({
          id:post.id,
          titulo:post.titulo,
          contenido:post.contenido,
          fecha:post.fecha,
          urls
        })
      })
      res.json({
        rows
      })
    })
 
}



export  function get5Post(req, res) {
  const {offset} = req.params
  conexion.query(`select p.*,group_concat(i.url) as urls from Post as p left join Image as i on i.post=p.id group by p.id order by fecha desc limit 5 offset ${offset}`,function(err,results,flieds) {
    if (err) {
      res.json({err})
    }
    res.json({
      results
    })
  })

}

export  function createPost(req,res){
  let urls =[];
  const {titulo,contenido} = req.body;
  urls=req.body.urls;
  const date = new Date();
  const fecha = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
  const id =uuid(); 
  conexion.query(`INSERT INTO Post values('${id}','${titulo}','${contenido}','${fecha}');`,function(err,results,flieds){
    if(err){
      res.status(500).json({ok:false,err});
    }
  });
  urls.map(url=>{
    console.log(url);
    conexion.query(`INSERT INTO Image (url,post) values('${url}','${id}')`,function(err,results,flieds){
      if(err){
        console.log(err)
        res.status(500).json({ok:false,err});
      }
    });
  })
  res.json({
    ok:true,
    id
  })
 
  
}


export function deletePost(req,res){
  conexion.query(`DELETE FROM Post as posr where id = '${req.body.id}';`,function(err,results,flieds){
    if(err){
      res.status(500).json({ok:false,err});
    }
    res.json({
      ok:true,
      id:req.body.id,
      results
    })
  });

  
}