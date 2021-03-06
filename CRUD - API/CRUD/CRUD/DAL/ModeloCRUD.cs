namespace CRUD.DAL
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class ModeloCRUD : DbContext
    {
        public ModeloCRUD()
            : base("name=ModeloCRUD")
        {
        }

        public virtual DbSet<Organizacion> Organizacion { get; set; }
        public virtual DbSet<Usuario> Usuario { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Organizacion>()
                .Property(e => e.Nombre)
                .IsUnicode(false);

            modelBuilder.Entity<Usuario>()
                .Property(e => e.NombreCompleto)
                .IsUnicode(false);

            modelBuilder.Entity<Usuario>()
                .Property(e => e.Cedula)
                .IsUnicode(false);

            modelBuilder.Entity<Usuario>()
                .Property(e => e.Telefono)
                .IsUnicode(false);
        }
    }
}
