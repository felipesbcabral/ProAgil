// using System;
// using System.Collections.Generic;
// using System.IO;
// using System.Linq;
// using System.Net.Http.Headers;
// using System.Threading.Tasks;
// using Microsoft.AspNetCore.Http;
// using Microsoft.AspNetCore.Mvc;
// using ProAgil.Domain;
// using ProAgil.Repository;


// namespace ProAgil.WebAPI.Controllers
// {
//     public class PalestrantesController
//     {
//         private readonly IProAgilRepository _repo;

//         public PalestrantesController(IProAgilRepository repo)
//         {
//             _repo = repo;
//         }

//         [HttpGet]
//         public async Task<IActionResult> Get()
//         {
//             try
//             {
//                 var results = await _repo.GetAllPalestrantesAsyncByName(true);

//                 return Ok(results);     
//             }
//             catch (System.Exception)
//             {
                
//                 return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados falhou");
//             }
//         }

//         [HttpGet("{EventoId}")]
//         public async Task<IActionResult> Get(int EventoId)
//         {
//             try
//             {
//                 var results = await _repo.GetPalestranteAsync(EventoId, true);

//                 return Ok(results);     
//             }
//             catch (System.Exception)
//             {
                
//                 return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados falhou");
//             }
//         }

//         [HttpGet("getByTena/{tema}")]
//         public async Task<IActionResult> Get(string tema)
//         {
//             try
//             {
//                 var results = await _repo.GetAllEventoAsyncByTema(tema, true);

//                 return Ok(results);     
//             }
//             catch (System.Exception)
//             {
                
//                 return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados falhou");
//             }
//         }

//         [HttpPost]
//         public async Task<IActionResult> Post(Evento model)
//         {
//             try
//             {
//                 _repo.Add(model);

//                 if(await _repo.SaveChangesAsync())
//                 {
//                     return Created($"/api/evento/{model.Id}", model);
//                 } 
//             }
//             catch (System.Exception)
//             {
//                 return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados falhou");
//             }

//             return BadRequest();
//         }

//         [HttpPut]
//         public async Task<IActionResult> Put(int EventoId, Evento model)
//         {
//             try
//             {
//                 var evento = await _repo.GetEventoAsyncById(EventoId, false);
//                 if(evento == null) return NotFound();

//                 _repo.Update(model);

//                 if(await _repo.SaveChangesAsync())
//                 {
//                     return Created($"/api/evento/{model.Id}", model);
//                 } 
//             }
//             catch (System.Exception)
//             {
//                 return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados falhou");
//             }

//             return BadRequest();
//         }

//         [HttpDelete]
//         public async Task<IActionResult> Delete(int EventoId)
//         {
//             try
//             {
//                 var evento = await _repo.GetEventoAsyncById(EventoId, false);
//                 if(evento == null) return NotFound();

//                 _repo.Delete(evento);

//                 if(await _repo.SaveChangesAsync())
//                 {
//                     return Ok();
//                 } 
//             }
//             catch (System.Exception)
//             {
//                 return this.StatusCode(StatusCodes.Status500InternalServerError, "Banco de Dados falhou");
//             }

//             return BadRequest();
//         }
//     }
// }