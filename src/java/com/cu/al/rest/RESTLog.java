package com.cu.al.rest;

import com.cu.al.core.ControladorEmpleado;
import com.cu.al.model.Empleado;
import com.cu.al.model.Usuario;
import com.google.gson.Gson;

import jakarta.ws.rs.DefaultValue;
import jakarta.ws.rs.FormParam;

import jakarta.ws.rs.POST;

import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;

import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.logging.Level;
import java.util.logging.Logger;

@Path("log")

public class RESTLog {

    @POST
    @Path("in")
    @Produces(MediaType.APPLICATION_JSON)
    public Response login(@FormParam("credenciales") @DefaultValue("") String credenciales) {
        
        
        
        String out = null;
        Usuario user = null;
        Empleado emp = null;

        Gson gson = new Gson();

        ControladorEmpleado ctrEm = new ControladorEmpleado();
        try {
            user = gson.fromJson(credenciales, Usuario.class);
            
            emp = ctrEm.login(user.getUsuario(), user.getContrasenia());

            if (emp != null) {
                
                out = new Gson().toJson(emp);
                
                
            } else {
                out = """
                      {"error":"Usuario/contraseña no son válidos!"}
                      """;
            }

        } catch (Exception ex) {
            Logger.getLogger(RESTLog.class.getName()).log(Level.SEVERE, null, ex);
            out = "{\"exception\":\"Error del servidor.\"}";
        }

        return Response.status(Response.Status.OK).entity(out).build();
    }
}
