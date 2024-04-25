using Microsoft.EntityFrameworkCore;

namespace BE_CRUDMascotas.Models.Repository
{
    public class MascotaRepository : IMascotaRepository
    {
        private readonly ApplicationDBContext _context;

        public MascotaRepository(ApplicationDBContext context)
        {
            this._context = context;
        }

        public async Task<Mascota> AddMascota(Mascota mascota)
        {
            _context.Add(mascota);
            await _context.SaveChangesAsync();
            return mascota;
        }

        public async Task DeleteMascota(Mascota mascota)
        {
            _context.Mascotas.Remove(mascota);
            await _context.SaveChangesAsync();
        }

        public async Task<List<Mascota>> GetListMascotas()
        {
            return await _context.Mascotas.ToListAsync();
        }

        public async Task<Mascota> GetMascota(int id)
        {
            return await _context.Mascotas.FindAsync(id);
        }

        public async Task UpdateMascota(Mascota mascota)
        {
            Mascota mascotaItem = await GetMascota(mascota.Id);

            if (mascotaItem != null)
            {
                mascotaItem.Nombre = mascota.Nombre;
                mascotaItem.Raza = mascota.Raza;
                mascotaItem.Color = mascota.Color;
                mascotaItem.Edad = mascota.Edad;
                mascotaItem.Peso = mascota.Peso;

                await _context.SaveChangesAsync();
            }
        }
    }
}
