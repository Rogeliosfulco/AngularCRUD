namespace CRUD.DAL
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Usuario")]
    public partial class Usuario
    {
        public int UsuarioID { get; set; }

        [StringLength(150)]
        public string NombreCompleto { get; set; }

        [StringLength(50)]
        public string Cedula { get; set; }

        [Column(TypeName = "date")]
        public DateTime? FechaNacimiento { get; set; }

        [StringLength(50)]
        public string Telefono { get; set; }

        public int? OrganizacionID { get; set; }

        //public virtual Organizacion Organizacion { get; set; }
    }
}
