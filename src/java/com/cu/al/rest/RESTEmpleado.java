package com.cu.al.rest;

import com.cu.al.core.ControladorEmpleado;
import com.cu.al.model.Empleado;
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


@Path("empleado")
public class RESTEmpleado {
    @GET
    @Path("getAll")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAll(@QueryParam("filtro") @DefaultValue("") String filtro) {
        String out = null;
        ControladorEmpleado ce = null;
        List<Empleado> empleados = null;
        try {

            ce = new ControladorEmpleado();
            empleados = ce.getAll(filtro);
            out = new Gson().toJson(empleados);

        } catch (Exception e) {
            e.printStackTrace();
            out = "{\"exception\":\"Error Interno del servidor.\"}";
        }
        return Response.status(Response.Status.OK).entity(out).build();
    }

//    Cuando utilizo tipo POST se utiliza con @FORMPARAM
//    Cuando se usa GET se utiliza con @QUERYPARAM
    @Path("save")
    @POST
    @Produces(MediaType.APPLICATION_JSON)
    //El FormParam a diferencia del QueryParam, no hace una consulta si no que los extrae de un Formulario si asi se desea
    public Response save(@FormParam("datosEmpleado") @DefaultValue("") String datosEmpleado) throws Exception {
        String out = null;
        Gson gson = new Gson();
        Empleado emp = null;
        ControladorEmpleado ce = new ControladorEmpleado();

        try {
            //Convertimos los datos empleado a Json con ayuda de Gson
            emp = gson.fromJson(datosEmpleado, Empleado.class);
            //Si el id del empleado no existe lo añadimos, si ya existe lo actualizamos
            if (emp.getIdEmpleado() == 0) {
                ce.insert(emp);
            } else {
                ce.update(emp);
            }
            out = gson.toJson(emp);
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
    public Response delete(@FormParam("idEmpleado") @DefaultValue("0") int idEmpleado) throws Exception {
        System.out.println("Ejecutó delete");
        String out = null;
        ControladorEmpleado ce = new ControladorEmpleado();

        try {
            //Convertimos los datos empleado a Json con ayuda de Gson
            //Si el id del empleado no existe lo añadimos, si ya existe lo actualizamos
            System.out.println(idEmpleado);
            ce.delete(idEmpleado);
            out = """
                    {"success":"Empleado eliminado correctamente"}
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
