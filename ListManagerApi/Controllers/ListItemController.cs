using ListManagerApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace ListManagerApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    class ListItemController: ControllerBase
    {
        private static List<ListItem> items = new List<ListItem>{
            new ListItem { Id = 1, Name = "Item 1"},
            new ListItem { Id = 2, Name = "Item 2"}
        };

        [HttpGet]
        public ActionResult<IEnumerable<ListItem>> GetAllItems(){
            return items;
        }

        [HttpPost]
        public IActionResult AddItem(ListItem item){
            items.Add(item);
            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult UpdateItem(int id, ListItem item){
            var existingItem = items.FirstOrDefault(x => x.Id == id);
            if (existingItem == null)
                return NotFound();

            existingItem.Name = item.Name;

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteItem(int id){
            var item = items.FirstOrDefault(x => x.Id == id);
            if (item == null)
                return NotFound();

            items.Remove(item);

            return NoContent();
        }
    }
}