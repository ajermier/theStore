using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using theStore.Models;

namespace theStore.Controllers
{
    [Route("api/[controller]")]
    public class ProductController : Controller
    {
        private readonly TheStoreContext _context;

        public ProductController(TheStoreContext context)
        {
            _context = context;
        }

        [HttpGet("[action]")]
        public List<Product> GetAllProducts()
        {
            return _context.Product.ToList();
        }

        [HttpDelete("[action]/{id}")]
        public Product DeleteProduct(int id)
        {
            Product productToRemove = _context.Product.SingleOrDefault(x => x.Id == id);
            _context.Product.Remove(productToRemove);
            _context.SaveChanges();

            return productToRemove;
        }

        [HttpPost("UpdateProduct")]
        public Product UpdateProduct([FromBody] UpdateProductRequest request)
        {
            Product product = _context.Product.SingleOrDefault(x => x.Id == request.Id);
            product.Name = request.Name;
            product.Description = request.Description;
            product.Quantity = request.Quantity;

            _context.SaveChanges();

            return product;
        }

        [HttpPost("CreateProduct")]
        public Product CreateProduct([FromBody] CreateProductRequest request)
        {
            Product product = new Product
            {
                Name = request.Name,
                Description = request.Description,
                Quantity = request.Quantity,
                DateAdded = DateTime.Now
            };

            _context.Product.Add(product);
            _context.SaveChanges();

            return product;
        }
    }
}
