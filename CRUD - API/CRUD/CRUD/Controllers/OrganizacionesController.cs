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
    public class OrganizacionesController : ApiController
    {
        private ModeloCRUD db = new ModeloCRUD();

        // ------------------ Listar Organizaciones ------------------ //
        [HttpGet]
        [Route("ListarOrganizaciones")]
        public IQueryable<Organizacion> ListarOrganizaciones()
        {
            try
            {
                var Listado = db.Organizacion;
                return Listado;
            }
            catch (Exception)
            {
                return null;
            }
        }

        // ------------------ Obtener datos de una organizacion ------------------ //
        [HttpGet]
        [Route("DetallarOrganizacion/{id}")]
        [ResponseType(typeof(Organizacion))]
        public IHttpActionResult DetallarOrganizacion(int id)
        {
            try
            {
                Organizacion organizacion = db.Organizacion.Find(id);
                if (organizacion == null)
                {
                    return NotFound();
                }

                return Ok(organizacion);
            }
            catch (Exception ex)
            {
                return ResponseMessage(Request.CreateResponse(HttpStatusCode.OK, "Error - " + ex.Message));
            }
        }


        // ------------------ Editar datos de un usuario ------------------ //
        [HttpPut]
        [Route("EditarOrganizacion/{id}")]
        [ResponseType(typeof(void))]
        public IHttpActionResult EditarOrganizacion(int id, Organizacion organizacion)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                if (id != organizacion.OrganizacionID)
                {
                    return BadRequest();
                }

                db.Entry(organizacion).State = EntityState.Modified;

                try
                {
                    db.SaveChanges();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ExisteOrganizacion(organizacion.Nombre))
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
            catch (Exception ex)
            {
                return ResponseMessage(Request.CreateResponse(HttpStatusCode.OK, "Error - " + ex.Message));
            }
        }

        [HttpPost]
        [Route("InsertarOrganizacion")]
        [ResponseType(typeof(Organizacion))]
        public IHttpActionResult InsertarOrganizacion(Organizacion organizacion)
        {
            try
            {
                if (ExisteOrganizacion(organizacion.Nombre))
                {
                    return ResponseMessage(Request.CreateResponse(HttpStatusCode.OK, "Duplicado"));
                }

                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                db.Organizacion.Add(organizacion);
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
        [Route("EliminarOrganizacion/{id}")]
        [ResponseType(typeof(Organizacion))]
        public IHttpActionResult EliminarOrganizacion(int id)
        {
            try
            {
                Organizacion organizacion = db.Organizacion.Find(id);
                if (organizacion == null)
                {
                    return NotFound();
                }
                db.Organizacion.Remove(organizacion);
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
        private bool ExisteOrganizacion(string Nombre)
        {
            return db.Organizacion.Count(e => e.Nombre == Nombre) > 0;
        }
    }
}