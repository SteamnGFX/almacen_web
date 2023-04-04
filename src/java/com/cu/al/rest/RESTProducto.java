package com.cu.al.rest;


import com.cu.al.core.ControladorProducto;
import com.cu.al.model.Producto;
import com.google.gson.Gson;
import com.google.gson.JsonParseException;
import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.FormParam;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.QueryParam;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

@Path("producto")
public class RESTProducto {
    

    @GET
    @Path("getAll")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAll(@QueryParam("filtro") @DefaultValue("") String filtro) {
        String out = null;
        ControladorProducto cp = null;
        List<Producto> producto = null;
        try {

            cp = new ControladorProducto();
            producto = cp.getAll(filtro);
            out = new Gson().toJson(producto);

        } catch (Exception e) {
            e.printStackTrace();
            out = "{\"exception\":\"Error Interno del servidor.\"}";
        }
        return Response.status(Response.Status.OK).entity(out).build();
    } 
    
    @Path("save")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    //El FormParam a diferencia del QueryParam, no hace una consulta si no que los extrae de un Formulario si asi se desea
    public Response save(@FormParam("datosProducto") @DefaultValue("") String datosProductos) throws Exception {
        String out = null;
        Gson gson = new Gson();
        Producto p = null;
        ControladorProducto cp = new ControladorProducto();
        try {
            //Convertimos los datos empleado a Json con ayuda de Gson
            p = gson.fromJson(datosProductos, Producto.class);
            
            //Si el id del empleado no existe lo añadimos, si ya existe lo actualizamos
            if (p.getIdProducto()== 0) {
                cp.insert(p);
            } else {
                cp.update(p);
            }
            out = gson.toJson(p);
        } catch (JsonParseException jpe) {
            jpe.printStackTrace();
            out = """
                    {"exception":"%s"}
                  """;
            out = String.format(out, jpe.toString());
        }
        catch(Exception e){
            e.printStackTrace();
            out = """
                  {"exception":"%s"}
                  """;
            out = String.format(out, e.toString());
        }
        
        return Response.status(Response.Status.OK).entity(out).build();
    }
    
    
    @Path("delete")
    @PUT
    @Produces(MediaType.APPLICATION_JSON)
    //El FormParam a diferencia del QueryParam, no hace una consulta si no que los extrae de un Formulario si asi se desea
    public Response delete(@FormParam("idProducto") @DefaultValue("0") int idProducto) throws Exception {
        
        String out = null;
        ControladorProducto cp = new ControladorProducto();

        try {
            //Convertimos los datos empleado a Json con ayuda de Gson
            //Si el id del empleado no existe lo añadimos, si ya existe lo actualizamos
            
            cp.delete(idProducto);
            out = """
                    {"success":"Producto eliminado correctamente"}
                  """;
            
        } catch (JsonParseException jpe) {
            jpe.printStackTrace();
            out = """
                    {"exception":"%s"}
                  """;
            out = String.format(out, jpe.toString());
        }
        catch(Exception e){
            e.printStackTrace();
            out = """
                  {"exception":"%s"}
                  """;
            out = String.format(out, e.toString());
        }
        
        return Response.status(Response.Status.OK).entity(out).build();
    }
}