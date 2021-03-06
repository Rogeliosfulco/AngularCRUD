using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using CRUD.DAL;

namespace CRUD.Controllers
{
    public class UsuariosController : ApiController
    {
        private ModeloCRUD db = new ModeloCRUD();
        // ------------------ Listar usuarios ------------------ //
        [HttpGet]
        [Route("ListarUsuarios")]
        public IQueryable<Usuario> ListarUsuarios()
        {
            try
            {
                var Listado = db.Usuario;
                return Listado;
            }
            catch (Exception)
            {
                return null;
            }
        }

        // ------------------ Obtener datos de un usuario ------------------ //
        [HttpGet]
        [Route("DetallarUsuario/{id}")]
        [ResponseType(typeof(Usuario))]
        public IHttpActionResult DetallarUsuario(int id)
        {
            try
            {
                Usuario usuario = db.Usuario.Find(id);
                if (usuario == null)
                {
                    return NotFound();
                }
                return Ok(usuario);
            }
            catch (Exception ex)
            {
                return ResponseMessage(Request.CreateResponse(HttpStatusCode.OK, "Error - " + ex.Message));
            }

        }

        // ------------------ Editar datos de un usuario ------------------ //
        [HttpPut]
        [Route("EditarUsuario/{id}")]
        [ResponseType(typeof(void))]
        public IHttpActionResult EditarUsuario(int id, Usuario usuario)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != usuario.UsuarioID)
            {
                return BadRequest();
            }

            db.Entry(usuario).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ExisteUsuario(usuario.Cedula))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // ------------------ Agregar un usuario ------------------ //
        [HttpPost]
        [Route("InsertarUsuario")]
        [ResponseType(typeof(Usuario))]
        public IHttpActionResult InsertarUsuario(Usuario usuario)
        {
            try
            {
                if (ExisteUsuario(usuario.Cedula))
                {
                    return ResponseMessage(Request.CreateResponse(HttpStatusCode.OK, "Duplicado"));
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                db.Usuario.Add(usuario);
                db.SaveChanges();
                return ResponseMessage(Request.CreateResponse(HttpStatusCode.OK, "Exito"));
            }
            catch (Exception ex)
            {
                return ResponseMessage(Request.CreateResponse(HttpStatusCode.OK, "Error - " + ex.Message));
            }
        }

        // ------------------ Eliminar un usuario ------------------ //
        [HttpDelete]
        [Route("EliminarUsuario/{id}")]
        [ResponseType(typeof(Usuario))]
        public IHttpActionResult EliminarUsuario(int id)
        {
            try
            {
                Usuario usuario = db.Usuario.Find(id);
                if (usuario == null)
                {
                    return NotFound();
                }
                db.Usuario.Remove(usuario);
                db.SaveChanges();

                return ResponseMessage(Request.CreateResponse(HttpStatusCode.OK, "Exito"));
            }
            catch (Exception ex)
            {
                return ResponseMessage(Request.CreateResponse(HttpStatusCode.OK, "Error - " + ex.Message));
            }

        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
        
        // ------------------ Validaciones ------------------ //
        private bool ExisteUsuario(string Cedula)
        {
            return db.Usuario.Count(e => e.Cedula == Cedula) > 0;
        }
    }
}